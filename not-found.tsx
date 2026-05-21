import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center text-center px-6">
      <div className="text-[72px] mb-6 font-serif font-bold text-gold/20">404</div>
      <h1 className="font-serif text-4xl font-bold text-white mb-3">Trang không tồn tại</h1>
      <p className="text-base text-white/50 max-w-sm mb-8">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
      </p>
      <Link
        href="/"
        className="bg-white text-navy px-8 py-3.5 rounded-full text-sm font-semibold no-underline
                   transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
      >
        ← Về Trang Chủ
      </Link>
    </div>
  )
}
