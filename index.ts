// ─── Post / Library ────────────────────────────────────────────────
export type PostTag = 'red' | 'gold' | 'navy' | 'blue'

export interface PostAttachment {
  type: 'pdf' | 'video' | 'image'
  name: string
  size: string
  action: 'Tải' | 'Xem'
}

export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  categoryTag: PostTag
  grades: string[]
  author: string
  authorInitials: string
  date: string
  imageUrl?: string
  imageEmoji?: string
  imageGradient?: string
  attachments: PostAttachment[]
  featured?: boolean
  content?: string
}

// ─── Map ──────────────────────────────────────────────────────────
export interface MapPin {
  id: string
  title: string
  location: string
  lat: number
  lng: number
  variant: 'gold' | 'red'
  grade?: string
  category?: string
  slug?: string
}

export interface MapMemory {
  id: string
  title: string
  location: string
  variant: 'gold' | 'red'
  slug?: string
}

// ─── Contribute Form ──────────────────────────────────────────────
export type RoleOption =
  | 'Nhân chứng lịch sử'
  | 'Giáo viên'
  | 'Người thân nhân chứng'
  | 'Nhà nghiên cứu'

export interface ContributeFormData {
  // Step 1
  name: string
  email: string
  role: RoleOption | ''
  province: string
  // Step 2
  memoryTitle: string
  period: string
  content: string
  // Step 3
  files: File[]
}

// ─── Navigation ──────────────────────────────────────────────────
export interface NavItem {
  label: string
  href: string
}

// ─── Project Info ────────────────────────────────────────────────
export interface InfoCard {
  icon: string
  title: string
  description: string
}

export interface RoadmapItem {
  phase: string
  title: string
  description: string
  faded?: boolean
}

// ─── Verify ──────────────────────────────────────────────────────
export interface VerifyStep {
  num: string
  icon: string
  title: string
  description: string
}

// ─── Benefit ─────────────────────────────────────────────────────
export type BenefitColor = 'red' | 'gold' | 'navy'
export interface Benefit {
  icon: string
  color: BenefitColor
  title: string
  description: string
}

// ─── Stat ────────────────────────────────────────────────────────
export interface Stat {
  num: string
  label: string
}
