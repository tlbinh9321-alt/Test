const { db } = require('./src/config/firebase');

const POSTS = [
  {
    slug: 'ky-uc-thang-tu-sai-gon-1975',
    title: 'Ký Ức Những Ngày Tháng Tư — Nhân Chứng Sài Gòn 1975',
    excerpt: 'Câu chuyện của bà Nguyễn Thị Hoa — nhân chứng sống những ngày lịch sử tại Sài Gòn năm 1975. Tư liệu phỏng vấn, ảnh gốc và bản đồ di chuyển trong những ngày cuối của chiến tranh.',
    category: 'Ký Ức Nhân Chứng',
    categoryTag: 'red',
    grades: ['Lớp 9', 'Lớp 10'],
    author: 'Lê Thanh Bình',
    authorInitials: 'LB',
    date: '15 tháng 3, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1528702748617-c64d49f918af?w=900&q=80',
    featured: true,
    status: 'PUBLISHED',
    attachments: [
      { type: 'pdf', name: 'Hướng dẫn giáo viên', size: 'PDF · 1.8 MB', action: 'Tải' },
      { type: 'video', name: 'Phỏng vấn bà Hoa (Phần 1)', size: 'MP4 · 12 phút', action: 'Xem' },
      { type: 'video', name: 'Phỏng vấn bà Hoa (Phần 2)', size: 'MP4 · 9 phút', action: 'Xem' },
      { type: 'image', name: 'Bộ ảnh tư liệu (8 ảnh)', size: 'ZIP · 24 MB', action: 'Tải' },
    ],
  },
  {
    slug: 'cho-ben-thanh-anh-phap-1920',
    title: 'Chợ Bến Thành Qua Ống Kính Người Pháp 1920–1940',
    excerpt: 'Bộ sưu tập ảnh tư liệu thực dân Pháp ghi lại cảnh sinh hoạt đô thị Sài Gòn — Chợ Lớn thế kỷ 20.',
    category: 'Tư Liệu Ảnh',
    categoryTag: 'gold',
    grades: ['Lớp 8'],
    author: 'Lê Chí Bảo',
    authorInitials: 'LB',
    date: '10 tháng 3, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    status: 'PUBLISHED',
    attachments: [{ type: 'image', name: 'Bộ ảnh tư liệu (12 ảnh)', size: '12 ảnh', action: 'Xem' }],
  },
  {
    slug: 'lang-que-mien-nam-truoc-1975',
    title: 'Cuộc Sống Làng Quê Miền Nam Trước 1975',
    excerpt: 'Hồi ký ông Trần Văn Nam về cuộc sống nông thôn — ruộng đồng, chợ phiên và cộng đồng làng xã thời chiến.',
    category: 'Ký Ức Nhân Chứng',
    categoryTag: 'red',
    grades: ['Lớp 9'],
    author: 'Lê Thanh Bình',
    authorInitials: 'LB',
    date: '5 tháng 3, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1600784444194-1c9b9e6a8c1c?w=600&q=80',
    status: 'PUBLISHED',
    attachments: [
      { type: 'pdf', name: 'Hướng dẫn giáo viên', size: 'PDF · 1.2 MB', action: 'Tải' },
      { type: 'video', name: 'Video phỏng vấn', size: 'MP4 · 8 phút', action: 'Xem' },
    ],
  },
  {
    slug: 'phong-van-nhan-chung-30-4',
    title: 'Phỏng Vấn Nhân Chứng: Ngày Đất Nước Thống Nhất',
    excerpt: 'Video phỏng vấn 3 nhân chứng kể lại cảm xúc ngày 30/4/1975 từ nhiều góc nhìn khác nhau.',
    category: 'Video Lịch Sử',
    categoryTag: 'blue',
    grades: ['Lớp 10'],
    author: 'Lê Chí Bảo',
    authorInitials: 'LB',
    date: '28 tháng 2, 2026',
    imageEmoji: '🎬',
    imageGradient: 'linear-gradient(135deg,#1a2744,#0a1628)',
    status: 'PUBLISHED',
    attachments: [
      { type: 'video', name: 'Video phỏng vấn 1', size: 'MP4 · 15 phút', action: 'Xem' },
      { type: 'video', name: 'Video phỏng vấn 2', size: 'MP4 · 12 phút', action: 'Xem' },
    ],
  },
  {
    slug: 'dinh-lang-binh-duong',
    title: 'Đình Làng Bình Dương — Kiến Trúc & Tín Ngưỡng Nam Bộ',
    excerpt: 'Khảo sát chi tiết kiến trúc đình làng truyền thống Nam Bộ và vai trò trung tâm cộng đồng trong lịch sử.',
    category: 'Tư Liệu',
    categoryTag: 'gold',
    grades: ['Lớp 8', 'Lớp 9'],
    author: 'Lê Thanh Bình',
    authorInitials: 'LB',
    date: '20 tháng 2, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&q=80',
    status: 'PUBLISHED',
    attachments: [
      { type: 'pdf', name: 'Tư liệu khảo sát', size: 'PDF · 3.1 MB', action: 'Tải' },
      { type: 'image', name: 'Ảnh kiến trúc (20 ảnh)', size: 'ZIP · 45 MB', action: 'Tải' },
      { type: 'pdf', name: 'Hướng dẫn giáo viên', size: 'PDF · 1.4 MB', action: 'Tải' },
      { type: 'video', name: 'Video tham quan 3D', size: 'MP4 · 6 phút', action: 'Xem' },
      { type: 'pdf', name: 'Phiếu học tập', size: 'PDF · 0.8 MB', action: 'Tải' },
    ],
  },
];

const MAP_PINS = [
  {
    title: 'Nhân Chứng Sài Gòn 1975',
    location: 'TP. Hồ Chí Minh',
    lat: 10.77,
    lng: 106.69,
    variant: 'gold',
    grade: 'Lớp 9',
    category: 'Ký ức nhân chứng',
    slug: 'ky-uc-thang-tu-sai-gon-1975',
  },
  {
    title: 'Chợ Bến Thành 1920–1940',
    location: 'Quận 1, TP.HCM',
    lat: 10.772,
    lng: 106.698,
    variant: 'red',
    grade: 'Lớp 8',
    category: 'Tư liệu ảnh',
    slug: 'cho-ben-thanh-anh-phap-1920',
  },
  {
    title: 'Đình Làng Bình Dương',
    location: 'Bình Dương',
    lat: 10.98,
    lng: 106.65,
    variant: 'red',
    grade: 'Lớp 8, 9',
    category: 'Tư liệu',
    slug: 'dinh-lang-binh-duong',
  },
];

async function seed() {
  console.log('--- SEEDING DATA ---');

  // Seed Posts
  for (const post of POSTS) {
    const docRef = db.collection('posts').doc();
    await docRef.set({
      ...post,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    console.log(`Added post: ${post.title}`);
  }

  // Seed Map Pins
  for (const pin of MAP_PINS) {
    const docRef = db.collection('map_pins').doc();
    await docRef.set({
      ...pin,
      created_at: new Date().toISOString(),
    });
    console.log(`Added map pin: ${pin.title}`);
  }

  console.log('--- SEEDING COMPLETED ---');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
