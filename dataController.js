const { db } = require('../config/firebase');

// Lấy tất cả dữ liệu từ một collection
exports.getAllData = async (req, res) => {
  try {
    const { collectionName } = req.params;
    const snapshot = await db.collection(collectionName).get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm dữ liệu mới
exports.addData = async (req, res) => {
  try {
    const { collectionName } = req.params;
    const newData = req.body;
    const docRef = await db.collection(collectionName).add(newData);
    res.status(201).json({ id: docRef.id, message: 'Dữ liệu đã được thêm thành công' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
