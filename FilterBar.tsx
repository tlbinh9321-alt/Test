'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { GRADE_FILTERS, TYPE_FILTERS } from '@/lib/data'

export function FilterBar() {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState<Set<string>>(new Set(['Tất cả']))

  const toggle = (label: string) => {
    setActive((prev) => {
      const next = new Set(prev)
      if (label === 'Tất cả') {
        return new Set(['Tất cả'])
      }
      next.delete('Tất cả')
      if (next.has(label)) {
        next.delete(label)
        if (next.size === 0) next.add('Tất cả')
      } else {
        next.add(label)
      }
      return next
    })
  }

  return (
    <div className="sticky top-[68px] z-40 bg-white border-b border-navy/[0.08] px-[8vw] py-4 shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="🔍  Tìm kiếm học liệu, sự kiện, địa danh..."
          className="flex-1 min-w-[220px] bg-cream border border-navy/[0.12] rounded-full px-[18px] py-2.5
                     font-sans text-[13px] text-navy outline-none transition-colors duration-300
                     focus:border-navy placeholder:text-slate-400"
        />

        {/* Chips */}
        <div className="flex flex-wrap gap-2">
          {/* All */}
          <button
            onClick={() => toggle('Tất cả')}
            className={clsx(
              'px-3.5 py-[7px] rounded-full text-xs font-medium border transition-all duration-300',
              active.has('Tất cả')
                ? 'bg-navy text-white border-navy'
                : 'bg-transparent text-slate-500 border-navy/15 hover:border-navy hover:text-navy'
            )}
          >
            Tất cả
          </button>

          {/* Grade chips */}
          {GRADE_FILTERS.map((g) => (
            <button
              key={g}
              onClick={() => toggle(g)}
              className={clsx(
                'px-3.5 py-[7px] rounded-full text-xs font-medium border transition-all duration-300',
                active.has(g)
                  ? 'bg-navy text-white border-navy'
                  : 'bg-transparent text-slate-500 border-navy/15 hover:border-navy hover:text-navy'
              )}
            >
              {g}
            </button>
          ))}

          {/* Type chips */}
          {TYPE_FILTERS.map((t) => (
            <button
              key={t}
              onClick={() => toggle(t)}
              className={clsx(
                'px-3.5 py-[7px] rounded-full text-xs font-medium border transition-all duration-300',
                active.has(t)
                  ? 'bg-navy text-white border-navy'
                  : 'bg-transparent text-slate-500 border-navy/15 hover:border-navy hover:text-navy'
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
