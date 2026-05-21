'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  User as FirebaseUser
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

export type UserRole = 'user' | 'admin' | 'editor'

export interface AuthUser {
  uid: string
  displayName: string
  name: string
  email: string
  photoURL?: string
  role: UserRole
  createdAt?: any
  status?: string
  bio?: string
  province?: string
  joinDate?: string
  contributions: number
}

interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  loginWithFacebook: () => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<AuthUser>) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5005/api'


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Hàm gọi backend để xác thực và lấy dữ liệu user từ Firestore
  const syncUserWithBackend = async (firebaseUser: FirebaseUser) => {
    try {
      const idToken = await firebaseUser.getIdToken()
      const response = await fetch(`${API_URL}/auth/verify-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      })

      if (response.ok) {
        const data = await response.json()
        const userData = data.user
        // Map displayName to name if name is missing
        setUser({
          ...userData,
          name: userData.name || userData.displayName || userData.email.split('@')[0],
          contributions: userData.contributions || 0,
          joinDate: userData.joinDate || (userData.createdAt ? new Date(userData.createdAt._seconds * 1000).toLocaleDateString() : 'Mới tham gia')
        })
      } else {
        console.error('Failed to sync user with backend')
        setUser(null)
      }
    } catch (error) {
      console.error('Error syncing user:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  // Lắng nghe trạng thái auth từ Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await syncUserWithBackend(firebaseUser)
      } else {
        setUser(null)
        setIsLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      // 1. Đăng ký ở backend (để tạo record trong Firestore và Auth)
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, displayName: name })
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.message || 'Registration failed')
      }

      // 2. Sau khi backend tạo xong, đăng nhập ở client
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error('Registration error:', error)
      setIsLoading(false)
      throw error
    }
  }, [])

  const loginWithGoogle = useCallback(async () => {
    setIsLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error('Google login error:', error)
      setIsLoading(false)
      throw error
    }
  }, [])

  const loginWithFacebook = useCallback(async () => {
    setIsLoading(true)
    try {
      const provider = new FacebookAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error('Facebook login error:', error)
      setIsLoading(false)
      throw error
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }, [])

  const updateProfile = useCallback(async (data: Partial<AuthUser>) => {
    setUser(prev => prev ? { ...prev, ...data } : null)
    // Note: In a real app, you would also call an API to persist this to Firestore
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, loginWithGoogle, loginWithFacebook, logout, updateProfile }}
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
