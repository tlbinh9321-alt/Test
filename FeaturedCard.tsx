'use client'

import Link from 'next/link'
import { Tag } from '@/components/shared/Tag'
import { AuthorRow } from '@/components/shared/AuthorRow'
import type { Post } from '@/types'

interface FeaturedCardProps {
  post: Post
}

export function FeaturedCard({ post }: FeaturedCardProps) {
  return (
    <Link href={`/library/${post.slug}`} className="no-underline group">
      <article
        className="bg-white rounded-[18px] overflow-hidden grid grid-cols-1 md:grid-cols-[1.2fr_1fr]
                   shadow-[0_4px_24px_rgba(15,23,42,0.10)] mb-12
                   transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_12px_40px_rgba(15,23,42,0.14)]"
      >
        {/* Image */}
        <div className="relative overflow-hidden min-h-[240px] md:min-h-[320px]">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            style={{ filter: 'sepia(0.25) brightness(0.85)' }}
          />
          <span className="absolute top-5 left-5 bg-red-vss text-white text-[11px] font-semibold tracking-[0.08em] px-3 py-1.5 rounded-full">
            ✦ Nổi Bật
          </span>
        </div>

        {/* Body */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="flex flex-wrap gap-2 mb-4">
            <Tag variant={post.categoryTag}>{post.category}</Tag>
            <Tag variant="navy">{post.grades.join(' · ')}</Tag>
          </div>
          <h2 className="font-serif text-[30px] font-bold text-navy leading-[1.25] mb-3">
            {post.title}
          </h2>
          <p className="text-sm text-slate-500 leading-[1.7] mb-6">{post.excerpt}</p>
          <div className="flex items-center gap-2.5">
            <AuthorRow
              initials={post.authorInitials}
              name={post.author}
              date={post.date}
              size="md"
            />
            <span className="ml-auto text-[12px] text-slate-400 bg-cream px-2.5 py-1 rounded-full">
              📎 {post.attachments.length} tệp
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
