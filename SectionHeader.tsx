import clsx from 'clsx'

interface SectionEyebrowProps {
  children: React.ReactNode
  className?: string
}

export function SectionEyebrow({ children, className }: SectionEyebrowProps) {
  return (
    <p
      className={clsx(
        'text-[11px] font-semibold tracking-[0.2em] uppercase text-gold mb-3.5',
        className
      )}
    >
      {children}
    </p>
  )
}

interface SectionTitleProps {
  children: React.ReactNode
  className?: string
  light?: boolean
}

export function SectionTitle({ children, className, light }: SectionTitleProps) {
  return (
    <h2
      className={clsx(
        'font-serif font-bold leading-[1.15] mb-4',
        'text-[clamp(32px,4vw,52px)]',
        light ? 'text-white' : 'text-navy',
        className
      )}
    >
      {children}
    </h2>
  )
}

interface SectionSubProps {
  children: React.ReactNode
  className?: string
  light?: boolean
}

export function SectionSub({ children, className, light }: SectionSubProps) {
  return (
    <p
      className={clsx(
        'text-base max-w-[520px] mb-14 leading-[1.75]',
        light ? 'text-white/55' : 'text-slate-500',
        className
      )}
    >
      {children}
    </p>
  )
}
