'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Tag } from '@/components/shared/Tag'
import { AuthorRow } from '@/components/shared/AuthorRow'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post
  index?: number
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  const attachCount = post.attachments.length
  const attachLabel = post.attachments.some((a) => a.type === 'video')
    ? `🎬 ${attachCount} tệp`
    : `📎 ${attachCount} tệp`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <Link href={`/library/${post.slug}`} className="no-underline group">
        <article
          className="bg-white rounded-[18px] overflow-hidden h-full
                     shadow-[0_2px_12px_rgba(15,23,42,0.07)]
                     transition-all duration-300
                     group-hover:-translate-y-[5px] group-hover:shadow-[0_12px_32px_rgba(15,23,42,0.13)]
                     border-l-[3px] border-transparent group-hover:border-red-vss"
        >
          {/* Thumbnail */}
          <div className="h-[200px] overflow-hidden relative">
            {post.imageUrl ? (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                style={{ filter: 'sepia(0.2) brightness(0.85)' }}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-[52px]"
                style={{ background: post.imageGradient }}
              />
            )}
          </div>

          {/* Body */}
          <div className="p-5">
            <div className="flex flex-wrap gap-2 mb-2.5">
              <Tag variant={post.categoryTag}>{post.category}</Tag>
              <Tag variant="navy">{post.grades.join(' · ')}</Tag>
            </div>
            <h3 className="font-serif text-xl font-bold text-navy leading-[1.3] mb-2 mt-2.5">
              {post.title}
            </h3>
            <p className="text-[13px] text-slate-500 leading-[1.6] mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between pt-3.5 border-t border-navy/[0.07]">
              <AuthorRow
                initials={post.authorInitials}
                name={post.author}
                size="sm"
              />
              <span className="text-[12px] text-slate-400 bg-cream px-2.5 py-1 rounded-full flex items-center gap-1">
                {attachLabel}
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
