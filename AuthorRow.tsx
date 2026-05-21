import clsx from 'clsx'

interface AuthorRowProps {
  initials: string
  name: string
  role?: string
  date?: string
  size?: 'sm' | 'md' | 'lg'
  light?: boolean
  className?: string
}

export function AuthorRow({
  initials,
  name,
  role,
  date,
  size = 'md',
  light = false,
  className,
}: AuthorRowProps) {
  const avatarSize = size === 'sm' ? 'w-[26px] h-[26px] text-[9px]' : size === 'lg' ? 'w-12 h-12 text-base' : 'w-8 h-8 text-[11px]'

  return (
    <div className={clsx('flex items-center gap-2.5', className)}>
      <div
        className={clsx(
          'rounded-full bg-navy text-gold font-semibold flex items-center justify-center flex-shrink-0',
          avatarSize
        )}
      >
        {initials}
      </div>
      <div>
        <p className={clsx('font-medium', light ? 'text-white' : 'text-navy', size === 'sm' ? 'text-xs' : 'text-sm')}>
          {name}
        </p>
        {role && <p className="text-xs text-white/50">{role}</p>}
        {date && !role && <p className={clsx('text-[11px]', light ? 'text-white/50' : 'text-slate-400')}>{date}</p>}
      </div>
    </div>
  )
}
