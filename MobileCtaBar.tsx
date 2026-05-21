'use client'

interface MobileCtaBarProps {
  onClick: () => void
}

export function MobileCtaBar({ onClick }: MobileCtaBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <button
        onClick={onClick}
        className="w-full bg-red-vss text-white py-3.5 text-sm font-semibold
                   text-center cursor-pointer hover:bg-red-light transition-colors duration-300"
      >
        ✦ Đóng Góp Ký Ức Của Bạn
      </button>
    </div>
  )
}
