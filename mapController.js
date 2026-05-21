const { db } = require('../config/firebase');

/**
 * Lấy danh sách các điểm ghim trên bản đồ (Công khai)
 */
exports.getMapPins = async (req, res) => {
  try {
    const { grade, category, period } = req.query;
    let query = db.collection('map_pins');

    // Các bộ lọc nếu có
    if (grade) query = query.where('grade', '==', grade);
    if (category) query = query.where('category', '==', category);
    if (period) query = query.where('period', '==', period);

    const snapshot = await query.get();
    const pins = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(pins);
  } catch (error) {
    console.error('Error fetching map pins:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Lấy danh sách các ký ức dạng list bên cạnh bản đồ (Công khai)
 * Thường là các bài viết đã xuất bản có tọa độ
 */
exports.getMapMemories = async (req, res) => {
  try {
    const snapshot = await db.collection('posts')
      .where('status', '==', 'PUBLISHED')
      .limit(20)
      .get();

    const memories = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        location: data.province || 'Việt Nam',
        variant: data.categoryTag || 'red',
        slug: data.slug
      };
    });

    res.status(200).json(memories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Thêm điểm ghim trực tiếp (Dành cho Admin/Editor - Bỏ qua kiểm duyệt)
 */
exports.addMapPin = async (req, res) => {
  try {
    const { title, location, lat, lng, variant, grade, category, slug } = req.body;

    if (!title || !lat || !lng) {
      return res.status(400).json({ message: 'Thiếu thông tin tiêu đề hoặc tọa độ (lat, lng).' });
    }

    const pinData = {
      title,
      location: location || 'Chưa xác định',
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      variant: variant || 'red',
      grade: grade || 'Chưa phân loại',
      category: category || 'Tư liệu',
      slug: slug || '',
      createdAt: new Date().toISOString(),
      addedBy: req.user.uid
    };

    const docRef = await db.collection('map_pins').add(pinData);

    res.status(201).json({ 
      id: docRef.id, 
      message: 'Đã thêm điểm ghim trực tiếp lên bản đồ (Bypass Moderation).' 
    });
  } catch (error) {
    console.error('Error adding map pin:', error);
    res.status(500).json({ error: error.message });
  }
};
