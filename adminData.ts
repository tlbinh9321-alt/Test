export type PostStatus = 'pending' | 'approved' | 'rejected'

export interface AdminPost {
  id: string
  title: string
  author: string
  authorEmail: string
  category: string
  grade: string
  submittedAt: string
  status: PostStatus
  excerpt: string
  attachments: number
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  joinDate: string
  contributions: number
  status: 'active' | 'suspended'
  province: string
}

export interface StatCard {
  label: string
  value: string
  change: string
  positive: boolean
  icon: string
}

// ── Mock posts ────────────────────────────────────────────
export const ADMIN_POSTS: AdminPost[] = [
  {
    id: 'p1',
    title: 'Ký Ức Chợ Lớn Những Năm 1960',
    author: 'Trần Thị Mai',
    authorEmail: 'mai.tran@gmail.com',
    category: 'Ký Ức Nhân Chứng',
    grade: 'Lớp 9',
    submittedAt: '18/05/2026',
    status: 'pending',
    excerpt: 'Hồi ký về cuộc sống thương mại tại khu Chợ Lớn những năm 1960 qua lời kể của bà Trần Thị Mai.',
    attachments: 3,
  },
  {
    id: 'p2',
    title: 'Đình Làng Tân Phước — Kiến Trúc Độc Đáo',
    author: 'Nguyễn Minh Khoa',
    authorEmail: 'khoa.nguyen@edu.vn',
    category: 'Tư Liệu Ảnh',
    grade: 'Lớp 8',
    submittedAt: '17/05/2026',
    status: 'pending',
    excerpt: 'Bộ ảnh khảo sát kiến trúc đình làng Tân Phước với hơn 20 ảnh tư liệu độc quyền.',
    attachments: 22,
  },
  {
    id: 'p3',
    title: 'Phỏng Vấn Cựu Chiến Binh Quận 8',
    author: 'Lê Văn Hùng',
    authorEmail: 'hung.le@gmail.com',
    category: 'Video Lịch Sử',
    grade: 'Lớp 10',
    submittedAt: '16/05/2026',
    status: 'approved',
    excerpt: 'Video phỏng vấn 2 cựu chiến binh kể về những ngày tháng chiến đấu tại mặt trận miền Đông.',
    attachments: 2,
  },
  {
    id: 'p4',
    title: 'Bản Đồ Gia Định 1890 — Phục Dựng Kỹ Thuật Số',
    author: 'Phạm Thu Hà',
    authorEmail: 'ha.pham@research.vn',
    category: 'Tư Liệu Bản Đồ',
    grade: 'Lớp 8',
    submittedAt: '15/05/2026',
    status: 'rejected',
    excerpt: 'Phục dựng bản đồ Gia Định năm 1890 từ tài liệu lưu trữ của Pháp, so sánh với hiện tại.',
    attachments: 5,
  },
  {
    id: 'p5',
    title: 'Làng Nghề Gốm Lái Thiêu — 100 Năm Lịch Sử',
    author: 'Võ Thanh Tùng',
    authorEmail: 'tung.vo@gmail.com',
    category: 'Tư Liệu',
    grade: 'Lớp 9',
    submittedAt: '14/05/2026',
    status: 'pending',
    excerpt: 'Lịch sử 100 năm làng nghề gốm Lái Thiêu qua tư liệu ảnh và phỏng vấn nghệ nhân.',
    attachments: 8,
  },
]

// ── Mock users ────────────────────────────────────────────
export const ADMIN_USERS: AdminUser[] = [
  {
    id: 'u1', name: 'Trần Thị Mai', email: 'mai.tran@gmail.com',
    role: 'user', joinDate: '01/03/2026', contributions: 5,
    status: 'active', province: 'TP. HCM',
  },
  {
    id: 'u2', name: 'Nguyễn Minh Khoa', email: 'khoa.nguyen@edu.vn',
    role: 'user', joinDate: '15/02/2026', contributions: 8,
    status: 'active', province: 'Bình Dương',
  },
  {
    id: 'u3', name: 'Lê Văn Hùng', email: 'hung.le@gmail.com',
    role: 'user', joinDate: '10/01/2026', contributions: 2,
    status: 'active', province: 'Đồng Nai',
  },
  {
    id: 'u4', name: 'Phạm Thu Hà', email: 'ha.pham@research.vn',
    role: 'user', joinDate: '20/02/2026', contributions: 1,
    status: 'suspended', province: 'Hà Nội',
  },
  {
    id: 'u5', name: 'Võ Thanh Tùng', email: 'tung.vo@gmail.com',
    role: 'user', joinDate: '05/04/2026', contributions: 3,
    status: 'active', province: 'Bình Dương',
  },
]

// ── Stats ─────────────────────────────────────────────────
export const ADMIN_STATS: StatCard[] = [
  { label: 'Tổng ký ức', value: '47', change: '+8 tháng này', positive: true, icon: '📚' },
  { label: 'Chờ duyệt', value: '12', change: '3 mới hôm nay', positive: false, icon: '⏳' },
  { label: 'Người dùng', value: '138', change: '+24 tháng này', positive: true, icon: '👥' },
  { label: 'Lượt xem', value: '3.2K', change: '+18% tuần này', positive: true, icon: '👁' },
]
