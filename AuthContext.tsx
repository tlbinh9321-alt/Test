'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type UserRole = 'user' | 'admin'

export interface AuthUser {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  joinDate: string
  contributions: number
  bio?: string
  province?: string
}

interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  loginWithFacebook: () => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<AuthUser>) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

// ── Mock users (thay bằng API thật sau) ──────────────────
const MOCK_ADMIN: AuthUser = {
  id: 'admin-1',
  name: 'Lê Thanh Bình',
  email: 'admin@vietsuso.vn',
  role: 'admin',
  joinDate: 'Tháng 1, 2026',
  contributions: 24,
  bio: 'Đồng sáng lập Việt Sử Số — PTIT HCM',
  province: 'TP. Hồ Chí Minh',
}

const MOCK_USER: AuthUser = {
  id: 'user-1',
  name: 'Nguyễn Văn An',
  email: 'user@example.com',
  role: 'user',
  joinDate: 'Tháng 3, 2026',
  contributions: 3,
  bio: 'Giáo viên lịch sử tại THPT Nguyễn Du',
  province: 'Bình Dương',
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (email: string, _password: string) => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1000)) // simulate API
    // Mock: email admin → vào admin, còn lại → user thường
    setUser(email.includes('admin') ? MOCK_ADMIN : MOCK_USER)
    setIsLoading(false)
  }, [])

  const loginWithGoogle = useCallback(async () => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setUser(MOCK_USER)
    setIsLoading(false)
  }, [])

  const loginWithFacebook = useCallback(async () => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setUser(MOCK_USER)
    setIsLoading(false)
  }, [])

  const logout = useCallback(() => setUser(null), [])

  const updateProfile = useCallback((data: Partial<AuthUser>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : prev))
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, loginWithGoogle, loginWithFacebook, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
