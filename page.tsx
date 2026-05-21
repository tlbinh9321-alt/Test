'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, FileText, Users, BarChart2,
  CheckCircle, XCircle, Clock, Eye, Trash2,
  ChevronDown, Search, LogOut, Shield,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { auth } from '@/lib/firebase'
import { LogoIcon } from '@/components/shared/LogoIcon'
import { type PostStatus, type AdminPost } from '@/lib/adminData'
import clsx from 'clsx'
import Link from 'next/link'

type Tab = 'overview' | 'posts' | 'users'

interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  joinDate: string
  contributions: number
  status: 'active' | 'suspended'
  province: string
}

interface StatCard {
  label: string
  value: string
  change: string
  positive: boolean
  icon: string
}

const STATUS_CONFIG: Record<PostStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending:  { label: 'Chờ duyệt', color: 'bg-amber-50 text-amber-700',  icon: <Clock size={12} /> },
  approved: { label: 'Đã duyệt',  color: 'bg-emerald-50 text-emerald-700', icon: <CheckCircle size={12} /> },
  rejected: { label: 'Từ chối',   color: 'bg-red-50 text-red-vss',     icon: <XCircle size={12} /> },
}

export default function AdminPage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [tab, setTab] = useState<Tab>('overview')
  const [posts, setPosts] = useState<AdminPost[]>([])
  const [users, setUsers] = useState<AdminUser[]>([])
  const [stats, setStats] = useState<StatCard[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<PostStatus | 'all'>('all')

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5005/api'

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchData()
    }
  }, [user])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const idToken = await auth.currentUser?.getIdToken()
      const headers = { 'Authorization': `Bearer ${idToken}` }

      // Fetch all submissions for review
      const subsRes = await fetch(`${API_URL}/submissions/pending`, { headers })
      if (subsRes.ok) {
        const subsData = await subsRes.json()
        setPosts(subsData.map((s: any) => ({
          id: s.id,
          title: s.memoryTitle || s.data?.title || 'Không tiêu đề',
          author: s.name || s.data?.author || 'Ẩn danh',
          authorEmail: s.email || '',
          category: s.targetCollection === 'posts' ? 'Bài viết' : 'Dữ liệu',
          grade: s.data?.grades ? s.data.grades[0] : 'N/A',
          submittedAt: s.createdAt ? new Date(s.createdAt).toLocaleDateString() : 'N/A',
          status: s.status === 'approved' ? 'approved' : (s.status === 'rejected' ? 'rejected' : 'pending'),
          excerpt: s.content || s.data?.excerpt || '',
          attachments: s.attachments ? s.attachments.length : (s.data?.attachments?.length || 0),
          aiScore: s.aiResult?.score // Lấy điểm từ kết quả AI
        })))
      }

      // Fetch users
      const usersRes = await fetch(`${API_URL}/auth/users`, { headers })
      if (usersRes.ok) {
        const usersData = await usersRes.json()
        setUsers(usersData.map((u: any) => ({
          id: u.uid,
          name: u.name || u.displayName || 'Người dùng',
          email: u.email,
          role: u.role,
          joinDate: u.createdAt ? new Date(u.createdAt._seconds * 1000).toLocaleDateString() : 'N/A',
          contributions: u.contributions || 0,
          status: u.status || 'active',
          province: u.province || 'N/A'
        })))
      }

      // Fetch stats
      const statsRes = await fetch(`${API_URL}/stats`)
      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Guard — chỉ admin mới vào được
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center px-6 text-center">
        <div>
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="font-serif text-2xl font-bold text-white mb-2">Không có quyền truy cập</h2>
          <p className="text-white/50 text-sm mb-6">Trang này chỉ dành cho Admin</p>
          <Link href="/" className="inline-block bg-gold text-navy px-6 py-3 rounded-full text-sm font-semibold no-underline">
            Về Trang Chủ
          </Link>
        </div>
      </div>
    )
  }

  const handleApprove = async (id: string) => {
    try {
      const idToken = await auth.currentUser?.getIdToken()
      const res = await fetch(`${API_URL}/submissions/review/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({ action: 'approve' })
      })
      if (res.ok) {
        setPosts((p) => p.map(post => post.id === id ? { ...post, status: 'approved' } : post))
        // Refresh stats
        const statsRes = await fetch(`${API_URL}/stats`)
        if (statsRes.ok) setStats(await statsRes.json())
      }
    } catch (error) {
      console.error('Approve error:', error)
    }
  }

  const handleReject = async (id: string) => {
    try {
      const idToken = await auth.currentUser?.getIdToken()
      const res = await fetch(`${API_URL}/submissions/review/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({ action: 'reject' })
      })
      if (res.ok) {
        setPosts((p) => p.map(post => post.id === id ? { ...post, status: 'rejected' } : post))
      }
    } catch (error) {
      console.error('Reject error:', error)
    }
  }

  const handleDeletePost = (id: string) =>
    setPosts((p) => p.filter((post) => post.id !== id))

  const handleToggleUser = (id: string) =>
    setUsers((u) => u.map((usr) => usr.id === id
      ? { ...usr, status: usr.status === 'active' ? 'suspended' : 'active' }
      : usr
    ))

  const filteredPosts = posts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                        p.author.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || p.status === filterStatus
    return matchSearch && matchStatus
  })

  const pendingCount = posts.filter((p) => p.status === 'pending').length

  const NAV_TABS = [
    { key: 'overview', label: 'Tổng quan', icon: <LayoutDashboard size={16} /> },
    { key: 'posts',    label: `Bài đăng ${pendingCount > 0 ? `(${pendingCount})` : ''}`, icon: <FileText size={16} /> },
    { key: 'users',    label: 'Người dùng', icon: <Users size={16} /> },
  ]

  return (
    <div className="min-h-screen flex bg-[#F0EDE8]">
      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside className="w-[240px] bg-navy flex-shrink-0 flex flex-col fixed top-0 left-0 bottom-0 z-40">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/[0.07]">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <LogoIcon size={32} />
            <span className="font-serif text-lg font-bold text-white">
              VIỆT SỬ <span className="text-gold">SỐ</span>
            </span>
          </Link>
          <div className="mt-3 flex items-center gap-1.5 bg-gold/10 border border-gold/20 rounded-lg px-3 py-1.5">
            <Shield size={12} className="text-gold" />
            <span className="text-[11px] text-gold font-semibold">Admin Dashboard</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as Tab)}
              className={clsx(
                'w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-left cursor-pointer border-none transition-all duration-200',
                tab === t.key
                  ? 'bg-white/10 text-white'
                  : 'text-white/55 hover:text-white hover:bg-white/5'
              )}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-white/[0.07]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-sm font-bold text-gold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name || 'Admin'}</p>
              <p className="text-[11px] text-white/40 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => { logout(); router.push('/') }}
            className="w-full flex items-center gap-2 text-white/50 hover:text-white text-xs py-2 cursor-pointer bg-transparent border-none transition-colors"
          >
            <LogOut size={13} /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────────────── */}
      <main className="ml-[240px] flex-1 p-8">

        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy"></div>
          </div>
        ) : (
          <>
            {/* ── OVERVIEW TAB ── */}
            {tab === 'overview' && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="font-serif text-3xl font-bold text-navy mb-1">Tổng Quan</h1>
                <p className="text-slate-400 text-sm mb-8">Chào mừng trở lại, {user?.name?.split(' ').pop() || 'Admin'}!</p>

                {/* Stat cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {stats.map((s, i) => (
                    <motion.div
                      key={s.label}
                      className="bg-white rounded-2xl p-5 border border-navy/[0.06] shadow-sm"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-2xl">{s.icon}</span>
                        <span className={clsx('text-[11px] font-medium px-2 py-0.5 rounded-full', s.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600')}>
                          {s.change}
                        </span>
                      </div>
                      <div className="font-serif text-3xl font-bold text-navy mb-1">{s.value}</div>
                      <div className="text-xs text-slate-400">{s.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Recent pending posts */}
                <div className="bg-white rounded-2xl border border-navy/[0.06] shadow-sm">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-navy/[0.06]">
                    <h2 className="font-semibold text-navy text-base">Bài chờ duyệt gần đây</h2>
                    <button onClick={() => setTab('posts')} className="text-xs text-red-vss font-medium cursor-pointer bg-transparent border-none hover:underline">
                      Xem tất cả →
                    </button>
                  </div>
                  <div className="divide-y divide-navy/[0.05]">
                    {posts.filter((p) => p.status === 'pending').slice(0, 3).map((post) => (
                      <PostRow key={post.id} post={post} onApprove={handleApprove} onReject={handleReject} onDelete={handleDeletePost} compact />
                    ))}
                    {posts.filter((p) => p.status === 'pending').length === 0 && (
                      <p className="text-center text-slate-400 text-sm py-8">Không có bài chờ duyệt 🎉</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── POSTS TAB ── */}
            {tab === 'posts' && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="font-serif text-3xl font-bold text-navy mb-1">Quản Lý Bài Đăng</h1>
                <p className="text-slate-400 text-sm mb-6">{posts.length} bài đăng · {pendingCount} chờ duyệt</p>

                {/* Filter bar */}
                <div className="flex flex-wrap gap-3 mb-5">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-navy/[0.1] rounded-xl text-sm text-navy outline-none focus:border-navy"
                      placeholder="Tìm bài đăng, tác giả..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    {(['all', 'pending', 'approved', 'rejected'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setFilterStatus(s)}
                        className={clsx(
                          'px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer border transition-all duration-200',
                          filterStatus === s
                            ? 'bg-navy text-white border-navy'
                            : 'bg-white text-slate-400 border-navy/[0.1] hover:border-navy hover:text-navy'
                        )}
                      >
                        {s === 'all' ? 'Tất cả' : STATUS_CONFIG[s].label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-navy/[0.06] shadow-sm overflow-hidden">
                  {filteredPosts.length > 0 ? (
                    <div className="divide-y divide-navy/[0.05]">
                      {filteredPosts.map((post) => (
                        <PostRow key={post.id} post={post} onApprove={handleApprove} onReject={handleReject} onDelete={handleDeletePost} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-slate-400 text-sm py-12">Không tìm thấy bài đăng nào</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── USERS TAB ── */}
            {tab === 'users' && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="font-serif text-3xl font-bold text-navy mb-1">Quản Lý Người Dùng</h1>
                <p className="text-slate-400 text-sm mb-6">{users.length} người dùng</p>

                <div className="bg-white rounded-2xl border border-navy/[0.06] shadow-sm overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-navy/[0.06] bg-cream/60">
                        {['Người dùng', 'Địa phương', 'Tham gia', 'Đóng góp', 'Trạng thái', ''].map((h) => (
                          <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy/[0.04]">
                      {users.map((u) => (
                        <tr key={u.id} className="hover:bg-cream/40 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center text-xs font-bold text-navy flex-shrink-0">
                                {u.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-navy">{u.name}</p>
                                <p className="text-[11px] text-slate-400">{u.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-slate-500">{u.province}</td>
                          <td className="px-5 py-4 text-slate-500">{u.joinDate}</td>
                          <td className="px-5 py-4">
                            <span className="font-semibold text-navy">{u.contributions}</span>
                          </td>
                          <td className="px-5 py-4">
                            <span className={clsx(
                              'inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full',
                              u.status === 'active'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-red-50 text-red-vss'
                            )}>
                              {u.status === 'active' ? '● Hoạt động' : '● Tạm khoá'}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <button
                              onClick={() => handleToggleUser(u.id)}
                              className={clsx(
                                'text-xs font-medium px-3 py-1.5 rounded-lg cursor-pointer border transition-all duration-200',
                                u.status === 'active'
                                  ? 'border-red-vss/30 text-red-vss hover:bg-red-50'
                                  : 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
                              )}
                            >
                              {u.status === 'active' ? 'Khoá' : 'Mở khoá'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

// ── PostRow sub-component ─────────────────────────────────
function PostRow({
  post, onApprove, onReject, onDelete, compact = false,
}: {
  post: AdminPost
  onApprove: (id: string) => void
  onReject: (id: string) => void
  onDelete: (id: string) => void
  compact?: boolean
}) {
  const cfg = STATUS_CONFIG[post.status]

  return (
    <div className="flex items-start gap-4 px-6 py-4 hover:bg-cream/40 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className={clsx('inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full', cfg.color)}>
            {cfg.icon} {cfg.label}
          </span>
          <span className="text-[11px] text-slate-300">{post.category}</span>
          <span className="text-[11px] text-slate-300">· {post.grade}</span>
          
          {post.aiScore !== undefined && (
            <span className={clsx(
              "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold",
              post.aiScore >= 0.6 ? "bg-green-50 text-green-600 border border-green-100" : "bg-orange-50 text-orange-600 border border-orange-100"
            )}>
              AI: {(post.aiScore * 100).toFixed(0)}%
            </span>
          )}
        </div>
        <h4 className="font-semibold text-navy text-sm leading-snug mb-0.5">{post.title}</h4>
        {!compact && <p className="text-xs text-slate-400 line-clamp-1 mb-1">{post.excerpt}</p>}
        <p className="text-[11px] text-slate-400">
          {post.author} · {post.submittedAt} · 📎 {post.attachments} tệp
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button className="p-1.5 text-slate-400 hover:text-navy cursor-pointer bg-transparent border-none rounded-lg hover:bg-cream transition-colors" title="Xem">
          <Eye size={14} />
        </button>
        {post.status === 'pending' && (
          <>
            <button
              onClick={() => onApprove(post.id)}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold cursor-pointer border-none hover:bg-emerald-100 transition-colors"
            >
              <CheckCircle size={12} /> Duyệt
            </button>
            <button
              onClick={() => onReject(post.id)}
              className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-vss rounded-lg text-xs font-semibold cursor-pointer border-none hover:bg-red-100 transition-colors"
            >
              <XCircle size={12} /> Từ chối
            </button>
          </>
        )}
        <button
          onClick={() => onDelete(post.id)}
          className="p-1.5 text-slate-300 hover:text-red-vss cursor-pointer bg-transparent border-none rounded-lg hover:bg-red-50 transition-colors"
          title="Xoá"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}
