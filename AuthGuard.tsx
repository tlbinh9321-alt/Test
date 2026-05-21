'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const isPublicPage = pathname === '/login' || pathname === '/register'

  useEffect(() => {
    if (!isLoading && !user && !isPublicPage) {
      router.push('/login')
    }
  }, [user, isLoading, pathname, router, isPublicPage])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 animate-spin text-gold mb-4" />
        <p className="text-sm font-medium text-white/60 tracking-widest uppercase">Đang xác thực...</p>
      </div>
    )
  }

  if (!user && !isPublicPage) {
    return null
  }

  return <>{children}</>
}
