'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useContributeModal } from '@/hooks/useContributeModal'
import { Navbar } from '@/components/shared/Navbar'
import { MobileCtaBar } from '@/components/shared/MobileCtaBar'
import { Footer } from '@/components/shared/Footer'
import { ContributeModal } from '@/components/contribute/ContributeModal'
import { Tag } from '@/components/shared/Tag'
import { AuthorRow } from '@/components/shared/AuthorRow'
import { PostCard } from '@/components/library/PostCard'
import { POSTS } from '@/lib/data'

const ATTACH_ICONS: Record<string, string> = {
  pdf: '📄',
  video: '🎬',
  image: '🖼',
}
const ATTACH_BG: Record<string, string> = {
  pdf: 'bg-red-50',
  video: 'bg-blue-50',
  image: 'bg-emerald-50',
}

export function PostDetailClient({ slug }: { slug: string }) {
  const { isOpen, open, close } = useContributeModal()

  const post = POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  const related = POSTS.filter((p) => p.id !== post.id).slice(0, 3)

  return (
    <>
      <Navbar onContributeClick={open} />
      <MobileCtaBar onClick={open} />

      <main className="pb-14 md:pb-0">
        {/* Detail hero */}
        <div className="relative h-[60vh] min-h-[420px] overflow-hidden flex items-end">
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'sepia(0.3) brightness(0.7)' }}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center text-[80px]"
              style={{ background: post.imageGradient }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />

          <div className="relative z-10 px-[8vw] pb-12 max-w-[820px]">
            <div className="flex flex-wrap gap-2 mb-3.5">
              <Tag variant={post.categoryTag}>{post.category}</Tag>
              <span className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full bg-white/15 text-white">
                {post.grades.join(' · ')}
              </span>
            </div>
            <h1
              className="font-serif font-bold text-white leading-[1.2] mb-4"
              style={{ fontSize: 'clamp(28px, 4vw, 50px)' }}
            >
              {post.title}
            </h1>
            <AuthorRow
              initials={post.authorInitials}
              name={post.author}
              role="Biên tập viên · Việt Sử Số"
              light
            />
          </div>
        </div>

        {/* Meta bar */}
        <div className="bg-white border-b border-navy/[0.08] px-[8vw] py-4 flex flex-wrap items-center gap-6">
          {[
            { icon: '👁', text: '1.247 lượt xem' },
            { icon: '📅', text: post.date },
            { icon: '📚', text: `Dành cho: ${post.grades.join(', ')}` },
            { icon: '🏷', text: 'Thống nhất đất nước · TP.HCM · 1975' },
          ].map((m) => (
            <div key={m.text} className="flex items-center gap-1.5 text-[13px] text-slate-500">
              <span>{m.icon}</span>
              <span>{m.text}</span>
            </div>
          ))}
          <div className="ml-auto">
            <button className="px-3.5 py-1.5 border border-navy/15 rounded-full text-xs cursor-pointer text-navy bg-transparent hover:bg-navy hover:text-white transition-all duration-300">
              ↗ Chia sẻ
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="bg-cream">
          <div className="max-w-[1200px] mx-auto px-[8vw] py-12 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
            {/* Article */}
            <article>
              <p className="text-base leading-[1.9] text-navy/90 mb-5">
                Bà Nguyễn Thị Hoa, 72 tuổi, ngồi lặng yên nhìn ra cửa sổ một lúc trước khi bắt đầu kể.
                Giọng bà chậm, từng chữ như được lựa chọn cẩn thận — như thể sợ rằng nói nhanh quá sẽ làm
                vỡ mất những ký ức mà bà đã giữ trong suốt năm mươi năm qua.
              </p>

              <blockquote className="pull-quote my-8">
                <p className="font-serif text-xl italic text-navy leading-[1.6]">
                  &ldquo;Sáng hôm đó, tôi nghe tiếng súng ngừng. Lần đầu tiên sau nhiều năm, thành phố
                  thật sự im lặng. Tôi không biết đó là sự kết thúc hay sự bắt đầu.&rdquo;
                </p>
              </blockquote>

              <p className="text-base leading-[1.9] text-navy/90 mb-5">
                Câu chuyện của bà Hoa là một trong hàng nghìn câu chuyện của người dân Sài Gòn trong những
                ngày tháng Tư lịch sử năm 1975. Không phải chuyện của các vị tướng hay các nhà chính trị —
                mà là chuyện của những con người bình thường, sống và chứng kiến lịch sử từ trong từng ngõ
                nhỏ, từng căn nhà.
              </p>

              <h2 className="font-serif text-[28px] font-bold text-navy mt-9 mb-3.5">Bối Cảnh Lịch Sử</h2>
              <p className="text-base leading-[1.9] text-navy/90 mb-5">
                Trong chương trình Lịch sử lớp 9, học sinh tìm hiểu về chiến dịch Hồ Chí Minh và sự kiện
                30/4/1975. Nhưng sách giáo khoa chỉ có thể kể những điều lớn lao — con số, địa danh, ngày
                tháng. Câu chuyện của bà Hoa lấp đầy những khoảng trống ấy bằng cảm xúc thật, trải nghiệm thật.
              </p>

              {post.imageUrl && (
                <figure className="rounded-[10px] overflow-hidden my-7">
                  <img
                    src={post.imageUrl}
                    alt="Tư liệu lịch sử"
                    className="w-full"
                    style={{ filter: 'sepia(0.4)' }}
                  />
                  <figcaption className="text-xs text-slate-400 pt-2 text-center">
                    Đường phố Sài Gòn những ngày tháng Tư 1975 — ảnh tư liệu được số hoá.
                  </figcaption>
                </figure>
              )}

              <p className="text-base leading-[1.9] text-navy/90 mb-5">
                Dự án Việt Sử Số đã thu thập và biên tập câu chuyện qua 3 buổi phỏng vấn trong tháng 2/2026.
                Tất cả tư liệu được kiểm chứng bởi giáo viên lịch sử tại trường THPT và được cố vấn bởi nhà
                nghiên cứu sử học địa phương.
              </p>

              <h2 className="font-serif text-[28px] font-bold text-navy mt-9 mb-3.5">
                Hướng Dẫn Sử Dụng Trong Lớp Học
              </h2>
              <p className="text-base leading-[1.9] text-navy/90 mb-5">
                Học liệu này được thiết kế để sử dụng trong tiết học lịch sử lớp 9, chủ đề &ldquo;Hoàn thành
                thống nhất đất nước&rdquo;. Giáo viên có thể sử dụng video phỏng vấn như một tài liệu khởi động,
                sau đó thảo luận nhóm dựa trên các câu hỏi định hướng trong file hướng dẫn kèm theo.
              </p>

              {/* Related posts */}
              <div className="mt-16 pt-12 border-t border-navy/[0.08]">
                <h3 className="font-serif text-2xl font-bold text-navy mb-6">Bài Viết Liên Quan</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {related.map((p, i) => (
                    <PostCard key={p.id} post={p} index={i} />
                  ))}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-5">
              {/* Attachments */}
              <div className="bg-white border border-navy/[0.08] rounded-[18px] p-6">
                <h4 className="text-[13px] font-semibold tracking-[0.08em] uppercase text-slate-400 mb-4">
                  Tệp Đính Kèm
                </h4>
                <div className="divide-y divide-navy/[0.06]">
                  {post.attachments.map((att, i) => (
                    <div key={i} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0 ${ATTACH_BG[att.type]}`}>
                        {ATTACH_ICONS[att.type]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-medium text-navy truncate">{att.name}</p>
                        <p className="text-[11px] text-slate-400">{att.size}</p>
                      </div>
                      <button className="ml-auto flex-shrink-0 text-xs text-red-vss font-medium px-2.5 py-1 border border-red-vss/30 rounded-full cursor-pointer bg-transparent hover:bg-red-50 transition-colors duration-300">
                        {att.action}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Author */}
              <div className="bg-white border border-navy/[0.08] rounded-[18px] p-6">
                <h4 className="text-[13px] font-semibold tracking-[0.08em] uppercase text-slate-400 mb-4">
                  Tác Giả
                </h4>
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-navy text-gold flex items-center justify-center text-base font-semibold flex-shrink-0">
                    {post.authorInitials}
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-navy">{post.author}</p>
                    <p className="text-xs text-slate-400">Biên tập viên · PTIT HCM</p>
                  </div>
                </div>
                <p className="text-[13px] text-slate-500 mt-3 leading-[1.6]">
                  Sinh viên Khoa CNTT2 — PTIT HCM. Đồng sáng lập dự án Việt Sử Số, chịu trách nhiệm biên
                  tập và chuẩn hoá học liệu số.
                </p>
              </div>

              {/* Meta info */}
              <div className="bg-white border border-navy/[0.08] rounded-[18px] p-6">
                <h4 className="text-[13px] font-semibold tracking-[0.08em] uppercase text-slate-400 mb-4">
                  Thông Tin Học Liệu
                </h4>
                <div className="divide-y divide-navy/[0.06] text-[13px] text-slate-500">
                  {[
                    { label: 'Dành cho', value: post.grades.join(', '), bold: true },
                    { label: 'Thể loại', value: post.category, bold: true },
                    { label: 'Thời kỳ', value: 'Kháng chiến', bold: true },
                    { label: 'Đã kiểm chứng', value: '✓ 3 tầng', green: true },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between py-2 first:pt-0 last:pb-0">
                      <span>{row.label}</span>
                      <span className={row.green ? 'text-emerald-600 font-semibold' : row.bold ? 'text-navy font-medium' : ''}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/library"
                className="block w-full py-3 border-[1.5px] border-navy/15 rounded-full text-center text-[13px] font-semibold text-navy no-underline hover:bg-navy hover:text-white transition-all duration-300"
              >
                ← Quay lại Thư Viện
              </Link>
            </aside>
          </div>
        </div>
      </main>

      <Footer onContributeClick={open} minimal />
      <ContributeModal isOpen={isOpen} onClose={close} />
    </>
  )
}
