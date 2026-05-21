const { db } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');

/**
 * 1. Đăng bài viết mới (User)
 */
exports.createPost = async (req, res) => {
  try {
    const { title, content, media } = req.body; // media: [{url, type, key}, ...]
    const userId = req.user.uid;

    if (!title || !content) {
      return res.status(400).json({ message: 'Tiêu đề và nội dung không được để trống.' });
    }

    const postId = uuidv4();
    const postData = {
      user_id: userId,
      title,
      content,
      status: 'UNMODERATED', // Trạng thái 1: Hoàn toàn chưa kiểm duyệt
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Ghi vào bảng posts
    await db.collection('posts').doc(postId).set(postData);

    // Ghi vào bảng post_media nếu có
    if (media && Array.isArray(media)) {
      const mediaPromises = media.map(item => {
        return db.collection('post_media').add({
          post_id: postId,
          media_url: item.url,
          media_type: item.type,
          storage_key: item.key,
          created_at: new Date().toISOString()
        });
      });
      await Promise.all(mediaPromises);
    }

    // Ghi log khởi tạo
    await db.collection('moderation_histories').add({
      post_id: postId,
      reviewer_id: null,
      tier: 'TIER_1',
      action: 'ESCALATE',
      reason: 'Bài viết mới được tạo, chuyển AI kiểm tra tầng 1.',
      created_at: new Date().toISOString()
    });

    // Kích hoạt AI Check bất đồng bộ
    processTierModeration(postId);

    res.status(201).json({ 
      postId, 
      message: 'Bài viết đã được gửi và đang trong quá trình kiểm duyệt tự động.' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * 2. Logic kiểm duyệt tự động (AI)
 */
const processTierModeration = async (postId) => {
  try {
    const postRef = db.collection('posts').doc(postId);
    const postDoc = await postRef.get();
    if (!postDoc.exists) return;

    const postData = postDoc.data();
    
    // Gọi OpenRouter AI
    const prompt = `
      Kiểm duyệt nội dung lịch sử Việt Nam:
      Tiêu đề: ${postData.title}
      Nội dung: ${postData.content}
      
      Yêu cầu trả về JSON:
      {
        "isClean": boolean (Kiểm tra ngôn từ thô tục, xúc phạm),
        "score": number (Độ tin cậy lịch sử 0.0 - 1.0),
        "reason": string,
        "evidence": string[]
      }
    `;

    const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.5-flash-lite-preview-09-2025",
        "messages": [{ "role": "user", "content": prompt }]
      })
    });

    const aiResultRaw = await aiRes.json();
    console.log(`[AI Raw Debug] Full Response: ${JSON.stringify(aiResultRaw)}`);

    if (!aiResultRaw.choices || aiResultRaw.choices.length === 0) {
      throw new Error(`AI API Error: ${aiResultRaw.error?.message || 'Unknown error'}`);
    }

    const aiResponseText = aiResultRaw.choices[0].message.content;

    // Trích xuất JSON linh hoạt hơn
    const jsonMatch = aiResponseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("AI không trả về định dạng JSON hợp lệ.");
    }
    
    const aiResult = JSON.parse(jsonMatch[0]);

    // --- TẦNG 1: Kiểm tra ngôn từ ---
    if (!aiResult.isClean) {
      await postRef.update({ status: 'REJECTED_PROFANITY', updated_at: new Date().toISOString() });
      await db.collection('moderation_histories').add({
        post_id: postId,
        tier: 'TIER_1',
        action: 'REJECT',
        reason: 'AI từ chối do vi phạm ngôn từ: ' + aiResult.reason,
        created_at: new Date().toISOString()
      });
      return;
    }

    // --- TẦNG 2: Chấm điểm xác thực ---
    const modHistoryRef = await db.collection('moderation_histories').add({
      post_id: postId,
      tier: 'TIER_2',
      action: aiResult.score >= 0.6 ? 'APPROVE' : 'ESCALATE',
      reason: `AI chấm điểm xác thực: ${aiResult.score}. ${aiResult.reason}`,
      created_at: new Date().toISOString()
    });

    // Lưu chi tiết AI Assessment
    await db.collection('ai_assessments').add({
      post_id: postId,
      moderation_history_id: modHistoryRef.id,
      model_version: 'gemini-2.0-flash',
      score: aiResult.score,
      evidence: aiResult.evidence,
      created_at: new Date().toISOString()
    });

    if (aiResult.score >= 0.6) {
      // Đạt yêu cầu -> Publish (AI đã duyệt và cho phép xuất bản)
      await postRef.update({ status: 'PUBLISHED', updated_at: new Date().toISOString() });
    } else {
      // Điểm thấp -> Chuyển chuyên gia (AI_MODERATED - Đã qua AI, chờ con người)
      await postRef.update({ status: 'AI_MODERATED', updated_at: new Date().toISOString() });
    }

  } catch (error) {
    console.error(`[Moderation Error] ${error.message}`);
  }
};

/**
 * 3. Chuyên gia phê duyệt (Admin/Reviewer)
 */
exports.reviewPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { action, reason } = req.body; // action: APPROVE, REJECT, REQUEST_MODIFICATION

    const postRef = db.collection('posts').doc(postId);
    const postDoc = await postRef.get();

    if (!postDoc.exists) return res.status(404).json({ message: 'Không tìm thấy bài viết.' });

    let finalStatus;
    switch (action) {
      case 'APPROVE': finalStatus = 'PUBLISHED'; break;
      case 'REJECT': finalStatus = 'REJECTED_MISINFO'; break;
      case 'REQUEST_MODIFICATION': finalStatus = 'REQUIRES_MODIFICATION'; break;
      default: return res.status(400).json({ message: 'Hành động không hợp lệ.' });
    }

    await postRef.update({ status: finalStatus, updated_at: new Date().toISOString() });

    // Ghi log chuyên gia
    await db.collection('moderation_histories').add({
      post_id: postId,
      reviewer_id: req.user.uid,
      tier: 'TIER_3',
      action: action,
      reason: reason,
      created_at: new Date().toISOString()
    });

    res.status(200).json({ message: `Đã thực hiện: ${action}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * 4. Lấy danh sách bài viết (Công khai)
 */
exports.getPosts = async (req, res) => {
  try {
    const { category, grade, featured } = req.query;
    let query = db.collection('posts').where('status', '==', 'PUBLISHED');

    if (category) query = query.where('category', '==', category);
    if (grade) query = query.where('grades', 'array-contains', grade);
    if (featured === 'true') query = query.where('featured', '==', true);

    const snapshot = await query.get();
    let posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Sắp xếp in-memory để tránh yêu cầu Index của Firestore
    posts.sort((a, b) => {
      const dateA = new Date(a.created_at || 0);
      const dateB = new Date(b.created_at || 0);
      return dateB - dateA;
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * 5. Lấy chi tiết bài viết theo slug
 */
exports.getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const snapshot = await db.collection('posts')
      .where('slug', '==', slug)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết.' });
    }

    const postDoc = snapshot.docs[0];
    res.status(200).json({ id: postDoc.id, ...postDoc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
