const { db } = require('./src/config/firebase');
const postController = require('./src/controllers/postController');

// Giả lập đối tượng req, res của Express
const mockReq = {
  user: { uid: 'mTZfuVKte0doevRA1JoQNzPO6Wm2' }, // UID Admin của bạn
  body: {
    title: 'test lan 1',
    content: 'Đây là nội dung kiểm tra hệ thống kiểm duyệt 3 tầng lần thứ nhất.',
    media: [
      {
        url: 'https://example.com/test.jpg',
        type: 'image',
        key: 'tests/test-1.jpg'
      }
    ]
  }
};

const mockRes = {
  status: function(code) {
    this.statusCode = code;
    return this;
  },
  json: function(data) {
    console.log(`Response Code: ${this.statusCode}`);
    console.log('Response Data:', JSON.stringify(data, null, 2));
    
    if (this.statusCode === 201) {
        console.log('\n--- Đang chờ AI xử lý ngầm (khoảng 5-10 giây) ---');
        setTimeout(async () => {
            const post = await db.collection('posts').doc(data.postId).get();
            console.log('\n--- Trạng thái bài viết sau khi AI xử lý: ---');
            console.log(`ID: ${data.postId}`);
            console.log(`Trạng thái: ${post.data().status}`);
            
            const logs = await db.collection('moderation_histories').where('post_id', '==', data.postId).get();
            console.log(`Số lượng log kiểm duyệt: ${logs.size}`);
            
            process.exit(0);
        }, 8000);
    } else {
        process.exit(1);
    }
  }
};

console.log('--- Bắt đầu Test: Đăng bài "test lan 1" ---');
postController.createPost(mockReq, mockRes);
