'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, User, Shield, LogOut, ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import { useScrolled } from '@/hooks/useScrolled'
import { useAuth } from '@/context/AuthContext'
import { LogoIcon } from '@/components/shared/LogoIcon'

interface NavbarProps {
  onContributeClick: () => void
}

const NAV_LINKS = [
  { label: 'Trang Chủ', href: '/' },
  { label: 'Thư Viện Học Liệu', href: '/library' },
  { label: 'Bản Đồ Ký Ức', href: '/map' },
]

export function Navbar({ onContributeClick }: NavbarProps) {
  const scrolled = useScrolled()
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const handleLogout = () => {
    logout()
    setDropdownOpen(false)
    router.push('/')
  }

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5vw] h-[68px]',
        'transition-all duration-500',
        scrolled
          ? 'bg-[#0F172A] border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.35)]'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 no-underline cursor-pointer">
        <LogoIcon size={36} />
        <span className="font-serif text-xl font-bold text-white tracking-[0.03em] leading-none">
          VIỆT SỬ <span className="text-gold">SỐ</span>
        </span>
      </Link>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-8 list-none">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={clsx(
                'text-sm font-medium tracking-[0.02em] no-underline transition-colors duration-200',
                isActive(link.href) ? 'text-white' : 'text-white/70 hover:text-white'
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}

        {user ? (
          /* User dropdown */
          <li className="relative">
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-2 cursor-pointer bg-transparent border-none text-white/80 hover:text-white transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-xs font-bold text-gold">
                {user.name.charAt(0)}
              </div>
              <span className="text-sm font-medium">{user.name.split(' ').pop()}</span>
              <ChevronDown size={14} className={clsx('transition-transform duration-200', dropdownOpen && 'rotate-180')} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-[calc(100%+12px)] w-[200px] bg-[#0F172A] border border-white/[0.1] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-white/[0.07]">
                  <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                  <p className="text-[11px] text-white/40 truncate">{user.email}</p>
                </div>
                <div className="py-1">
                  <Link href="/profile" onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 no-underline transition-colors">
                    <User size={14} /> Trang cá nhân
                  </Link>
                  {user.role === 'admin' && (
                    <Link href="/admin" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gold/80 hover:text-gold hover:bg-white/5 no-underline transition-colors">
                      <Shield size={14} /> Admin Dashboard
                    </Link>
                  )}
                  <button onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/50 hover:text-red-400 hover:bg-white/5 cursor-pointer bg-transparent border-none text-left transition-colors">
                    <LogOut size={14} /> Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </li>
        ) : (
          <li>
            <Link href="/login"
              className="text-sm font-medium text-white/70 hover:text-white no-underline transition-colors mr-2">
              Đăng nhập
            </Link>
          </li>
        )}

        <li>
          <button
            onClick={onContributeClick}
            className="bg-red-vss text-white px-5 py-2.5 rounded-full text-sm font-semibold
                       transition-all duration-200 hover:bg-red-light hover:-translate-y-px
                       cursor-pointer shadow-[0_2px_12px_rgba(185,28,28,0.4)]"
          >
            Đóng Góp Ký Ức
          </button>
        </li>
      </ul>

      {/* Hamburger */}
      <button className="md:hidden text-white p-1 cursor-pointer" onClick={() => setMenuOpen((v) => !v)}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-[68px] left-0 right-0 bg-[#0F172A] flex flex-col gap-2 px-[5vw] py-5 md:hidden border-t border-white/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              className={clsx('text-sm font-medium no-underline py-2 transition-colors', isActive(link.href) ? 'text-white' : 'text-white/70 hover:text-white')}>
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/profile" onClick={() => setMenuOpen(false)} className="text-sm text-white/70 no-underline py-2">Trang cá nhân</Link>
              {user.role === 'admin' && <Link href="/admin" onClick={() => setMenuOpen(false)} className="text-sm text-gold/80 no-underline py-2">Admin Dashboard</Link>}
              <button onClick={() => { handleLogout(); setMenuOpen(false) }} className="text-sm text-white/50 text-left bg-transparent border-none cursor-pointer py-2">Đăng xuất</button>
            </>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)} className="text-sm text-white/70 no-underline py-2">Đăng nhập</Link>
          )}
          <button onClick={() => { setMenuOpen(false); onContributeClick() }}
            className="bg-red-vss text-white px-5 py-3 rounded-full text-sm font-semibold text-center cursor-pointer mt-1 border-none">
            Đóng Góp Ký Ức
          </button>
        </div>
      )}
    </nav>
  )
}
