const { db, bucket } = require('../config/firebase');
const { ROLES } = require('../config/roles');

// Helper function to upload file to Firebase Storage
const uploadToStorage = (file) => {
  return new Promise((resolve, reject) => {
    const fileName = `contributions/${Date.now()}_${file.originalname}`;
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream({
      metadata: { contentType: file.mimetype }
    });

    blobStream.on('error', (err) => reject(err));
    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve({
        name: file.originalname,
        url: publicUrl,
        type: file.mimetype.split('/')[0] === 'image' ? 'image' : (file.mimetype.split('/')[0] === 'video' ? 'video' : 'pdf'),
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        action: file.mimetype.split('/')[0] === 'image' || file.mimetype.split('/')[0] === 'video' ? 'Xem' : 'Tải'
      });
    });
    blobStream.end(file.buffer);
  });
};

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/([^a-z0-9\s])/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// 1. Gửi bài đóng góp công khai (Public)
exports.submitPublicContribution = async (req, res) => {
  try {
    console.log('[Submission] New public contribution request received');
    const { name, email, role, province, memoryTitle, period, content } = req.body;
    const files = req.files || [];

    console.log(`[Submission] From: ${name} (${email}), Title: ${memoryTitle}`);
    console.log(`[Submission] Number of files: ${files.length}`);

    if (!name || !email || !memoryTitle || !content) {
      console.warn('[Submission] Missing required fields');
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ các thông tin bắt buộc (*).' });
    }

    // Upload files to storage
    console.log('[Submission] Processing file uploads...');
    const uploadedFilesRaw = await Promise.all(files.map(file => uploadToStorage(file)));
    const uploadedFiles = uploadedFilesRaw.filter(f => f !== null);

    const submissionData = {
      name,
      email,
      role,
      province,
      memoryTitle,
      period,
      content,
      attachments: uploadedFiles,
      status: 'pending_ai',
      type: 'PUBLIC_CONTRIBUTION',
      createdAt: new Date().toISOString()
    };

    console.log('[Submission] Adding to Firestore...');
    const docRef = await db.collection('submissions').add(submissionData);
    console.log(`[Submission] Successfully added! ID: ${docRef.id}`);

    // Kích hoạt AI Check
    console.log('[Submission] Triggering AI Check...');
    processAiCheck(docRef.id);

    res.status(201).json({
      id: docRef.id,
      message: 'Cảm ơn bạn! Đóng góp của bạn đã được gửi và đang được kiểm duyệt.'
    });
  } catch (error) {
    console.error('[Submission Error]', error);
    res.status(500).json({ error: error.message });
  }
};

// 2. Gửi dữ liệu lên hàng đợi kiểm duyệt (Auth Required)
exports.submitForReview = async (req, res) => {
  try {
    const { targetCollection, data } = req.body;
    const userId = req.user.uid;

    if (!targetCollection || !data) {
      return res.status(400).json({ message: 'Thiếu thông tin targetCollection hoặc dữ liệu.' });
    }

    const submission = {
      targetCollection,
      data,
      submittedBy: userId,
      status: 'pending_ai', // Trạng thái đầu tiên: Chờ AI check
      aiResult: null,
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection('submissions').add(submission);

    // Kích hoạt AI Check
    processAiCheck(docRef.id);

    res.status(201).json({ 
      id: docRef.id, 
      message: 'Dữ liệu đã được gửi vào hàng đợi và đang được AI kiểm tra.' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Hàm gọi OpenRouter AI để kiểm duyệt nội dung
const processAiCheck = async (submissionId) => {
  try {
    console.log(`[AI Check] Đang bắt đầu kiểm tra bài đăng: ${submissionId}`);
    
    const docRef = db.collection('submissions').doc(submissionId);
    const doc = await docRef.get();
    if (!doc.exists) return;

    const submissionData = doc.data();
    
    // Lấy nội dung cần check
    let contentToCheck = '';
    if (submissionData.type === 'PUBLIC_CONTRIBUTION') {
      contentToCheck = `Tiêu đề: ${submissionData.memoryTitle}\nNội dung: ${submissionData.content}`;
    } else {
      contentToCheck = JSON.stringify(submissionData.data);
    }

    const prompt = `
      Bạn là một chuyên gia kiểm duyệt nội dung lịch sử cho dự án "Việt Sử Số".
      Nhiệm vụ của bạn là kiểm tra nội dung sau đây dựa trên 2 tiêu chí:
      1. Ngôn từ: Có sạch sẽ, không vi phạm thuần phong mỹ tục, không xúc phạm, không chứa từ cấm không?
      2. Độ xác thực/Tin cậy: Nội dung có vẻ chính xác về mặt lịch sử không? (Chấm điểm từ 0.0 đến 1.0).

      Nội dung cần kiểm tra:
      ${contentToCheck}

      Hãy trả về kết quả dưới định dạng JSON duy nhất như sau:
      {
        "isClean": true/false,
        "score": 0.95,
        "reason": "Giải thích ngắn gọn lý do",
        "suggestion": "Gợi ý sửa đổi nếu có"
      }
    `;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.5-flash-lite-preview-09-2025",
        "messages": [
          { "role": "user", "content": prompt }
        ]
      })
    });

    const result = await response.json();
    
    if (!result.choices || result.choices.length === 0) {
      console.error('[AI Check Error] API không trả về kết quả (choices empty). Full Response:', JSON.stringify(result));
      throw new Error(`AI API Error: ${result.error?.message || 'No choices returned'}`);
    }

    const aiResponseText = result.choices[0].message.content;
    
    const jsonMatch = aiResponseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('[AI Check Error] AI không trả về JSON hợp lệ. Content:', aiResponseText);
      throw new Error("AI không trả về định dạng JSON hợp lệ.");
    }
    const aiResult = JSON.parse(jsonMatch[0]);

    let finalStatus = 'pending_review';
    let updateData = {
      aiResult: aiResult,
      updatedAt: new Date().toISOString()
    };

    if (!aiResult.isClean) {
      finalStatus = 'rejected';
      updateData.rejectionReason = 'Vi phạm ngôn từ: ' + aiResult.reason;
    } 
    else if (aiResult.score >= 0.6) {
      finalStatus = 'approved';
      
      const targetColl = submissionData.targetCollection || 'posts';
      let finalData = {};

      if (submissionData.type === 'PUBLIC_CONTRIBUTION') {
        const title = submissionData.memoryTitle;
        const slug = `${slugify(title)}-${Date.now().toString().slice(-4)}`;
        
        finalData = {
          slug,
          title,
          excerpt: submissionData.content.substring(0, 160) + '...',
          content: submissionData.content,
          author: submissionData.name,
          authorInitials: submissionData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(-2),
          category: 'Ký Ức Nhân Chứng',
          categoryTag: 'red',
          grades: ['Chưa phân loại'],
          date: new Date().toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' }),
          province: submissionData.province,
          period: submissionData.period,
          attachments: submissionData.attachments,
          status: 'PUBLISHED',
          featured: false
        };
      } else {
        finalData = {
          ...submissionData.data,
          status: 'PUBLISHED'
        };
        if (!finalData.slug && finalData.title) {
          finalData.slug = `${slugify(finalData.title)}-${Date.now().toString().slice(-4)}`;
        }
      }

      await db.collection(targetColl).add({
        ...finalData,
        approvedBy: 'AI_SYSTEM',
        approvedAt: new Date().toISOString()
      });
    } else {
      finalStatus = 'pending_review';
    }

    updateData.status = finalStatus;
    await docRef.update(updateData);

  } catch (error) {
    console.error(`[AI Check Error] ${error.message}`);
    await db.collection('submissions').doc(submissionId).update({
      status: 'pending_review',
      aiError: error.message,
      updatedAt: new Date().toISOString()
    });
  }
};

// 3. Lấy danh sách hàng đợi (Dành cho Admin/Editor)
exports.getPendingSubmissions = async (req, res) => {
  try {
    // Lấy tất cả submissions
    const snapshot = await db.collection('submissions').get();

    let submissions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // CHỈ LẤY các bài chưa được Duyệt/Từ chối VÀ không bị AI đánh giá 0 điểm
    submissions = submissions.filter(s => {
      const isPending = s.status !== 'approved' && s.status !== 'rejected';
      const isNotZero = !(s.aiResult && s.aiResult.score === 0);
      return isPending && isNotZero;
    });

    // Sắp xếp theo thời gian mới nhất
    submissions.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return dateB - dateA;
    });

    res.status(200).json(submissions);
  } catch (error) {
    console.error('[Get Submissions Error]', error);
    res.status(500).json({ error: error.message });
  }
};

// 4. Phê duyệt hoặc từ chối (Dành cho Admin/Editor)
exports.reviewSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { action } = req.body; // 'approve' hoặc 'reject'

    const docRef = db.collection('submissions').doc(submissionId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Không tìm thấy bản ghi kiểm duyệt.' });
    }

    const submission = doc.data();

    if (action === 'approve') {
      const targetColl = submission.targetCollection || 'posts';
      let finalData = {};

      if (submission.type === 'PUBLIC_CONTRIBUTION') {
        const title = submission.memoryTitle;
        const slug = `${slugify(title)}-${Date.now().toString().slice(-4)}`;

        finalData = {
          slug,
          title,
          excerpt: submission.content.substring(0, 160) + '...',
          content: submission.content,
          author: submission.name,
          authorInitials: submission.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(-2),
          category: 'Ký Ức Nhân Chứng',
          categoryTag: 'red',
          grades: ['Chưa phân loại'],
          date: new Date().toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' }),
          province: submission.province,
          period: submission.period,
          attachments: submission.attachments || [],
          status: 'PUBLISHED',
          featured: false
        };
      } else {
        finalData = {
          ...submission.data,
          status: 'PUBLISHED'
        };
        if (!finalData.slug && finalData.title) {
          finalData.slug = `${slugify(finalData.title)}-${Date.now().toString().slice(-4)}`;
        }
      }

      // Chuyển dữ liệu vào collection chính thức
      await db.collection(targetColl).add({
        ...finalData,
        approvedBy: req.user.uid,
        approvedAt: new Date().toISOString()
      });

      await docRef.update({ 
        status: 'approved', 
        reviewedBy: req.user.uid,
        reviewedAt: new Date().toISOString() 
      });

      res.status(200).json({ message: 'Đã phê duyệt và chuyển dữ liệu vào hệ thống.' });
    }
 else if (action === 'reject') {
      await docRef.update({ 
        status: 'rejected', 
        reviewedBy: req.user.uid,
        reviewedAt: new Date().toISOString() 
      });
      res.status(200).json({ message: 'Đã từ chối bản ghi này.' });
    } else {
      res.status(400).json({ message: 'Hành động không hợp lệ.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
