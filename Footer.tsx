import Link from 'next/link'
import { LogoIcon } from '@/components/shared/LogoIcon'

interface FooterProps {
  onContributeClick?: () => void
  minimal?: boolean
}

export function Footer({ onContributeClick, minimal = false }: FooterProps) {
  if (minimal) {
    return (
      <footer className="bg-navy border-t border-white/[0.06] px-[8vw] py-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-white/30">© 2026 Việt Sử Số · Nhóm MAVI · PTIT HCM</p>
          <span className="bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 text-[11px] text-gold font-medium">
            Khởi Nghiệp Sáng Tạo 2026
          </span>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-navy px-[8vw] pt-14 pb-8 border-t border-white/[0.06]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-8 lg:gap-12 mb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-3.5">
            <LogoIcon size={36} />
            <span className="font-serif text-xl font-bold text-white tracking-[0.03em]">
              VIỆT SỬ <span className="text-gold">SỐ</span>
            </span>
          </div>
          <p className="text-sm text-white/45 leading-[1.7] max-w-xs">
            Nền tảng học liệu số bảo tồn và lan tỏa ký ức văn hóa Việt Nam thông qua giáo dục.
          </p>
          <div className="mt-4">
            <span className="bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 text-[11px] text-gold font-medium">
              PTIT HCM · Khởi Nghiệp Sáng Tạo 2026
            </span>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h5 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-gold mb-4">
            Khám Phá
          </h5>
          <nav className="flex flex-col gap-2.5">
            <Link href="/" className="text-sm text-white/50 hover:text-white no-underline transition-colors">Trang Chủ</Link>
            <Link href="/library" className="text-sm text-white/50 hover:text-white no-underline transition-colors">Thư Viện Học Liệu</Link>
            <Link href="/map" className="text-sm text-white/50 hover:text-white no-underline transition-colors">Bản Đồ Ký Ức</Link>
            <button
              onClick={onContributeClick}
              className="text-sm text-white/50 hover:text-white text-left transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              Đóng Góp Ký Ức
            </button>
          </nav>
        </div>

        {/* About */}
        <div>
          <h5 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-gold mb-4">
            Về Dự Án
          </h5>
          <nav className="flex flex-col gap-2.5">
            {['Giới Thiệu', 'Nhóm Thực Hiện', 'Đối Tác', 'Liên Hệ'].map((item) => (
              <a key={item} className="text-sm text-white/50 hover:text-white no-underline transition-colors cursor-pointer">
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-white/[0.06] pt-6 flex flex-wrap justify-between items-center gap-3">
        <p className="text-xs text-white/30">
          © 2026 Việt Sử Số · Nhóm MAVI · Lê Thanh Bình &amp; Lê Chí Bảo · PTIT HCM
        </p>
        <p className="text-xs text-white/20">Bộ Khoa Học Và Công Nghệ</p>
      </div>
    </footer>
  )
}
