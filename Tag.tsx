import clsx from 'clsx'
import type { PostTag } from '@/types'

const TAG_STYLES: Record<PostTag, string> = {
  red: 'bg-red-50 text-red-vss',
  gold: 'bg-amber-50 text-amber-800',
  navy: 'bg-slate-100 text-navy',
  blue: 'bg-blue-50 text-blue-800',
}

interface TagProps {
  variant?: PostTag
  children: React.ReactNode
  className?: string
}

export function Tag({ variant = 'navy', children, className }: TagProps) {
  return (
    <span
      className={clsx(
        'inline-block text-[11px] font-semibold tracking-wide px-3 py-1 rounded-full',
        TAG_STYLES[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
