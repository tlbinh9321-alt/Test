const { db } = require('../config/firebase');

exports.getStats = async (req, res) => {
  try {
    const postsSnapshot = await db.collection('posts').get();
    const publishedPosts = postsSnapshot.docs.filter(doc => doc.data().status === 'PUBLISHED').length;
    const pendingPosts = postsSnapshot.docs.filter(doc => doc.data().status !== 'PUBLISHED' && doc.data().status !== 'REJECTED').length;
    
    const usersSnapshot = await db.collection('users').get();
    const totalUsers = usersSnapshot.size;

    const stats = [
      { label: 'Tổng ký ức', value: publishedPosts.toString(), change: '+2 tháng này', positive: true, icon: '📚' },
      { label: 'Chờ duyệt', value: pendingPosts.toString(), change: 'Mới', positive: false, icon: '⏳' },
      { label: 'Người dùng', value: totalUsers.toString(), change: '+5 tháng này', positive: true, icon: '👥' },
      { label: 'Lượt xem', value: '1.2K', change: '+12%', positive: true, icon: '👁' }
    ];

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
