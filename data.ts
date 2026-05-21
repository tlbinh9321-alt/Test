import type {
  Post,
  MapPin,
  MapMemory,
  InfoCard,
  RoadmapItem,
  VerifyStep,
  Benefit,
  Stat,
} from '@/types'

// ─── Hero Stats ───────────────────────────────────────────────────
export const HERO_STATS: Stat[] = [
  { num: '10+', label: 'Ký ức được số hoá' },
  { num: '5', label: 'Chủ đề lịch sử' },
  { num: '2', label: 'Trường thí điểm' },
]

// ─── Benefits ─────────────────────────────────────────────────────
export const BENEFITS: Benefit[] = [
  {
    icon: '📚',
    color: 'red',
    title: 'Dành cho Giáo Viên',
    description: 'Học liệu lịch sử địa phương có cấu trúc sư phạm rõ ràng, bám sát chương trình.',
  },
  {
    icon: '🎓',
    color: 'gold',
    title: 'Dành cho Học Sinh',
    description: 'Tiếp cận lịch sử qua câu chuyện thật, nhân vật thật và bối cảnh địa phương quen thuộc.',
  },
  {
    icon: '🌐',
    color: 'navy',
    title: 'Dành cho Cộng Đồng',
    description: 'Ký ức lịch sử được ghi nhận, lưu giữ và số hoá có hệ thống cho thế hệ tương lai.',
  },
]

// ─── Project Info Cards ───────────────────────────────────────────
export const INFO_CARDS: InfoCard[] = [
  {
    icon: '🗓',
    title: 'Thời Gian',
    description: 'Khởi động T2/2026 · Pilot 3–6 tháng · Mở rộng 6–18 tháng',
  },
  {
    icon: '🏛',
    title: 'Đối Tác',
    description: 'Trường THCS/THPT · Bảo tàng địa phương · Phòng Giáo Dục',
  },
  {
    icon: '⚙️',
    title: 'Giai Đoạn',
    description: 'Demo website tương tác — đang hoàn thiện sản phẩm chính thức',
  },
  {
    icon: '🎯',
    title: 'Mục Tiêu',
    description: 'Chuẩn hoá ký ức cộng đồng thành kho học liệu số bền vững',
  },
]

// ─── Roadmap ──────────────────────────────────────────────────────
export const ROADMAP: RoadmapItem[] = [
  {
    phase: 'Giai đoạn khởi động · T2/2026',
    title: 'Hoàn thiện ký ức mẫu',
    description: 'Video 8–12 phút + bài hướng dẫn GV + 1 hoạt động lớp học',
  },
  {
    phase: 'Giai đoạn 1 · 3–6 tháng',
    title: 'Pilot tại 1 trường thí điểm',
    description: '1 chủ đề · Thu phản hồi 3 tháng · Chỉnh sửa và cải tiến',
  },
  {
    phase: 'Giai đoạn 2 · 6–18 tháng',
    title: 'Mở rộng 5–10 trường',
    description: 'Hoàn thiện nền tảng · Tích luỹ kho dữ liệu ký ức văn hoá số',
  },
  {
    phase: 'Dài hạn · 5–10 năm',
    title: 'Hạ tầng ký ức số quốc gia',
    description: 'Kho dữ liệu văn hoá số Việt Nam có cấu trúc bền vững',
    faded: true,
  },
]

// ─── Verify Steps ────────────────────────────────────────────────
export const VERIFY_STEPS: VerifyStep[] = [
  {
    num: '01',
    icon: '📥',
    title: 'Thu Thập',
    description: 'Cộng đồng đóng góp ký ức, câu chuyện và tư liệu ảnh qua nền tảng',
  },
  {
    num: '02',
    icon: '✏️',
    title: 'Biên Tập',
    description: 'Nhóm biên tập chuẩn hoá nội dung theo cấu trúc sư phạm',
  },
  {
    num: '03',
    icon: '✅',
    title: 'Kiểm Chứng',
    description: 'Giáo viên & cố vấn lịch sử xác thực tính chính xác trước xuất bản',
  },
]

// ─── Posts ────────────────────────────────────────────────────────
export const POSTS: Post[] = [
  {
    id: '1',
    slug: 'ky-uc-thang-tu-sai-gon-1975',
    title: 'Ký Ức Những Ngày Tháng Tư — Nhân Chứng Sài Gòn 1975',
    excerpt:
      'Câu chuyện của bà Nguyễn Thị Hoa — nhân chứng sống những ngày lịch sử tại Sài Gòn năm 1975. Tư liệu phỏng vấn, ảnh gốc và bản đồ di chuyển trong những ngày cuối của chiến tranh.',
    category: 'Ký Ức Nhân Chứng',
    categoryTag: 'red',
    grades: ['Lớp 9', 'Lớp 10'],
    author: 'Lê Thanh Bình',
    authorInitials: 'LB',
    date: '15 tháng 3, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1528702748617-c64d49f918af?w=900&q=80',
    featured: true,
    attachments: [
      { type: 'pdf', name: 'Hướng dẫn giáo viên', size: 'PDF · 1.8 MB', action: 'Tải' },
      { type: 'video', name: 'Phỏng vấn bà Hoa (Phần 1)', size: 'MP4 · 12 phút', action: 'Xem' },
      { type: 'video', name: 'Phỏng vấn bà Hoa (Phần 2)', size: 'MP4 · 9 phút', action: 'Xem' },
      { type: 'image', name: 'Bộ ảnh tư liệu (8 ảnh)', size: 'ZIP · 24 MB', action: 'Tải' },
    ],
  },
  {
    id: '2',
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
    attachments: [{ type: 'image', name: 'Bộ ảnh tư liệu (12 ảnh)', size: '12 ảnh', action: 'Xem' }],
  },
  {
    id: '3',
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
    attachments: [
      { type: 'pdf', name: 'Hướng dẫn giáo viên', size: 'PDF · 1.2 MB', action: 'Tải' },
      { type: 'video', name: 'Video phỏng vấn', size: 'MP4 · 8 phút', action: 'Xem' },
    ],
  },
  {
    id: '4',
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
    attachments: [
      { type: 'video', name: 'Video phỏng vấn 1', size: 'MP4 · 15 phút', action: 'Xem' },
      { type: 'video', name: 'Video phỏng vấn 2', size: 'MP4 · 12 phút', action: 'Xem' },
    ],
  },
  {
    id: '5',
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
    attachments: [
      { type: 'pdf', name: 'Tư liệu khảo sát', size: 'PDF · 3.1 MB', action: 'Tải' },
      { type: 'image', name: 'Ảnh kiến trúc (20 ảnh)', size: 'ZIP · 45 MB', action: 'Tải' },
      { type: 'pdf', name: 'Hướng dẫn giáo viên', size: 'PDF · 1.4 MB', action: 'Tải' },
      { type: 'video', name: 'Video tham quan 3D', size: 'MP4 · 6 phút', action: 'Xem' },
      { type: 'pdf', name: 'Phiếu học tập', size: 'PDF · 0.8 MB', action: 'Tải' },
    ],
  },
  {
    id: '6',
    slug: 'me-viet-nam-anh-hung-tan-lap',
    title: 'Mẹ Việt Nam Anh Hùng Xã Tân Lập — Câu Chuyện Hy Sinh',
    excerpt: 'Ký ức của con cháu các Mẹ Việt Nam Anh Hùng về những ngày tháng đau thương và anh dũng của gia đình.',
    category: 'Ký Ức Nhân Chứng',
    categoryTag: 'red',
    grades: ['Lớp 11'],
    author: 'Lê Chí Bảo',
    authorInitials: 'LB',
    date: '15 tháng 2, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1528702748617-c64d49f918af?w=600&q=80',
    attachments: [
      { type: 'pdf', name: 'Hồ sơ tư liệu', size: 'PDF · 2.3 MB', action: 'Tải' },
      { type: 'video', name: 'Phỏng vấn gia đình', size: 'MP4 · 18 phút', action: 'Xem' },
      { type: 'image', name: 'Ảnh lưu niệm (6 ảnh)', size: 'ZIP · 12 MB', action: 'Tải' },
      { type: 'pdf', name: 'Hướng dẫn giáo viên', size: 'PDF · 1.1 MB', action: 'Tải' },
    ],
  },
  {
    id: '7',
    slug: 'dia-danh-gia-dinh-sai-gon',
    title: 'Địa Danh Lịch Sử TP.HCM — Từ Gia Định Đến Sài Gòn',
    excerpt: 'Bản đồ so sánh địa danh Gia Định xưa và TP.HCM ngày nay cùng tư liệu giải thích lịch sử hình thành.',
    category: 'Tư Liệu Bản Đồ',
    categoryTag: 'gold',
    grades: ['Lớp 8'],
    author: 'Lê Thanh Bình',
    authorInitials: 'LB',
    date: '10 tháng 2, 2026',
    imageEmoji: '🗺️',
    imageGradient: 'linear-gradient(135deg,#2d1a00,#4a2d00)',
    attachments: [
      { type: 'pdf', name: 'Bản đồ lịch sử', size: 'PDF · 4.2 MB', action: 'Tải' },
      { type: 'image', name: 'So sánh bản đồ (8 ảnh)', size: 'ZIP · 18 MB', action: 'Tải' },
      { type: 'pdf', name: 'Hướng dẫn giáo viên', size: 'PDF · 1.6 MB', action: 'Tải' },
    ],
  },
]

// ─── Map Pins ─────────────────────────────────────────────────────
export const MAP_PINS: MapPin[] = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
    title: 'Đình Làng Bình Dương',
    location: 'Bình Dương',
    lat: 10.98,
    lng: 106.65,
    variant: 'red',
    grade: 'Lớp 8, 9',
    category: 'Tư liệu',
    slug: 'dinh-lang-binh-duong',
  },
  {
    id: '4',
    title: 'Kháng chiến miền Trung',
    location: 'Đà Nẵng',
    lat: 16.07,
    lng: 108.22,
    variant: 'red',
    grade: 'Lớp 10',
    category: 'Ký ức nhân chứng',
  },
  {
    id: '5',
    title: 'Cố đô Huế — Di sản triều Nguyễn',
    location: 'Huế',
    lat: 16.47,
    lng: 107.59,
    variant: 'red',
    grade: 'Lớp 10',
    category: 'Tư liệu ảnh',
  },
]

export const MAP_MEMORIES: MapMemory[] = [
  { id: '1', title: 'Ký ức Tháng Tư — Nhân chứng Sài Gòn 1975', location: 'TP. Hồ Chí Minh', variant: 'gold', slug: 'ky-uc-thang-tu-sai-gon-1975' },
  { id: '2', title: 'Chợ Bến Thành — Tư liệu ảnh 1920', location: 'Quận 1, TP.HCM', variant: 'red', slug: 'cho-ben-thanh-anh-phap-1920' },
  { id: '3', title: 'Làng quê miền Nam trước 1975', location: 'Bình Dương', variant: 'red', slug: 'lang-que-mien-nam-truoc-1975' },
  { id: '4', title: 'Đình Làng Bình Dương — Kiến trúc Nam Bộ', location: 'Bình Dương', variant: 'red', slug: 'dinh-lang-binh-duong' },
  { id: '5', title: 'Địa danh Gia Định xưa', location: 'TP. Hồ Chí Minh', variant: 'red', slug: 'dia-danh-gia-dinh-sai-gon' },
]

export const PROVINCES = [
  'TP. Hồ Chí Minh',
  'Bình Dương',
  'Đồng Nai',
  'Hà Nội',
  'Đà Nẵng',
  'Huế',
  'Tỉnh/TP khác',
]

export const HISTORY_PERIODS = [
  'Tiền sử / Dựng nước',
  'Phong kiến',
  'Thực dân Pháp',
  'Kháng chiến chống Mỹ',
  'Thống nhất & Đổi mới',
  'Hiện đại (sau 1986)',
]

export const GRADE_FILTERS = ['Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11']
export const TYPE_FILTERS = ['Ký ức nhân chứng', 'Tư liệu ảnh', 'Video lịch sử']
export const MAP_PERIOD_FILTERS = ['Tất cả', 'Phong kiến', 'Cận đại', 'Kháng chiến', 'Đổi mới']
export const MAP_GRADE_FILTERS = ['Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11']
