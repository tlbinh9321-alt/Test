import type { Metadata } from 'next'
import '@/styles/globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { AuthGuard } from '@/components/shared/AuthGuard'

export const metadata: Metadata = {
  title: 'Việt Sử Số — Ký Ức Cộng Đồng · Di Sản Số Bền Vững',
  description: 'Nền tảng học liệu số bảo tồn và lan tỏa ký ức văn hóa Việt Nam.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="antialiased">
        <AuthProvider>
          <AuthGuard>
            {children}
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  )
}
