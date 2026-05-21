'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { MAP_PINS, MAP_MEMORIES, MAP_PERIOD_FILTERS, MAP_GRADE_FILTERS } from '@/lib/data'
import type { MapPin } from '@/types'

// Approximate percent positions on a Vietnam map bounding box
const PIN_POSITIONS: Record<string, { left: string; top: string }> = {
  '1': { left: '54%', top: '62%' },
  '2': { left: '52%', top: '60%' },
  '3': { left: '53%', top: '58%' },
  '4': { left: '47%', top: '35%' },
  '5': { left: '43%', top: '18%' },
}

export function MemoryMap() {
  const router = useRouter()
  const [activePeriods, setActivePeriods] = useState<Set<string>>(new Set(['Tất cả']))
  const [activeGrades, setActiveGrades] = useState<Set<string>>(new Set(['Lớp 9']))
  const [hoveredPin, setHoveredPin] = useState<string | null>(null)

  const togglePeriod = (p: string) => {
    setActivePeriods((prev) => {
      const next = new Set(prev)
      if (p === 'Tất cả') return new Set(['Tất cả'])
      next.delete('Tất cả')
      next.has(p) ? next.delete(p) : next.add(p)
      return next.size === 0 ? new Set(['Tất cả']) : next
    })
  }

  const toggleGrade = (g: string) => {
    setActiveGrades((prev) => {
      const next = new Set(prev)
      next.has(g) ? next.delete(g) : next.add(g)
      return next.size === 0 ? new Set() : next
    })
  }

  const goToPost = (pin: MapPin) => {
    if (pin.slug) router.push(`/library/${pin.slug}`)
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 68px)' }}>
      {/* Header strip */}
      <div className="bg-navy px-[8vw] py-5 flex-shrink-0 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-[22px] font-bold text-white">Bản Đồ Ký Ức</h2>
          <p className="text-[13px] text-white/50">
            Khám phá ký ức lịch sử theo địa điểm — từ làng xã đến vùng miền
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="bg-gold/10 border border-gold/20 text-gold text-[11px] font-medium px-3 py-1.5 rounded-full">
            Tất cả
          </button>
          <button className="bg-white/7 border border-white/10 text-white/65 text-[11px] font-medium px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors">
            Ký ức nhân chứng
          </button>
          <button className="bg-white/7 border border-white/10 text-white/65 text-[11px] font-medium px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors">
            Tư liệu ảnh
          </button>
        </div>
      </div>

      {/* Map container */}
      <div className="flex-1 relative overflow-hidden" style={{ background: '#1a2744' }}>
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80"
          alt="Map"
          className="w-full h-full object-cover opacity-50"
          style={{ filter: 'hue-rotate(200deg) saturate(0.5) brightness(0.6)' }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-texture" />

        {/* Sidebar */}
        <div
          className="absolute left-6 top-6 bottom-6 w-[280px] overflow-y-auto rounded-[18px] p-5"
          style={{
            background: 'rgba(15,23,42,0.93)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.1)',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(212,160,23,0.3) transparent',
          }}
        >
          {/* Search */}
          <h4 className="text-[12px] tracking-[0.15em] uppercase text-gold mb-3">Tìm Kiếm</h4>
          <input
            className="w-full rounded-lg px-3.5 py-2.5 text-[13px] text-white mb-4 outline-none"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              fontFamily: 'Be Vietnam Pro, sans-serif',
            }}
            placeholder="🔍 Địa điểm, sự kiện..."
          />

          {/* Period filter */}
          <div className="mb-4">
            <p className="text-[11px] text-white/40 tracking-[0.1em] uppercase mb-2">
              Thời Kỳ Lịch Sử
            </p>
            <div className="flex flex-wrap gap-1.5">
              {MAP_PERIOD_FILTERS.map((p) => (
                <button
                  key={p}
                  onClick={() => togglePeriod(p)}
                  className={clsx(
                    'inline-block px-3 py-[5px] rounded-full text-[11px] font-medium border cursor-pointer transition-all duration-300',
                    activePeriods.has(p)
                      ? 'bg-gold text-navy border-gold'
                      : 'bg-white/7 text-white/65 border-white/10 hover:bg-white/10'
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Grade filter */}
          <div className="mb-5">
            <p className="text-[11px] text-white/40 tracking-[0.1em] uppercase mb-2">Khối Lớp</p>
            <div className="flex flex-wrap gap-1.5">
              {MAP_GRADE_FILTERS.map((g) => (
                <button
                  key={g}
                  onClick={() => toggleGrade(g)}
                  className={clsx(
                    'inline-block px-3 py-[5px] rounded-full text-[11px] font-medium border cursor-pointer transition-all duration-300',
                    activeGrades.has(g)
                      ? 'bg-gold text-navy border-gold'
                      : 'bg-white/7 text-white/65 border-white/10 hover:bg-white/10'
                  )}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Memory list */}
          <h4 className="text-[12px] tracking-[0.15em] uppercase text-gold mb-3 mt-5">
            Ký Ức Gần Đây
          </h4>
          <div className="divide-y divide-white/[0.06]">
            {MAP_MEMORIES.map((mem) => (
              <div
                key={mem.id}
                className="flex gap-2.5 py-3 cursor-pointer group"
                onClick={() => mem.slug && router.push(`/library/${mem.slug}`)}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-[5px]"
                  style={{ background: mem.variant === 'gold' ? '#D4A017' : '#B91C1C' }}
                />
                <div>
                  <p className="text-[13px] text-white/80 font-medium leading-[1.4] group-hover:text-gold transition-colors">
                    {mem.title}
                  </p>
                  <p className="text-[11px] text-white/35 mt-0.5">📍 {mem.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Pins */}
        {MAP_PINS.map((pin) => (
          <div
            key={pin.id}
            className="absolute cursor-pointer transition-transform duration-300 hover:-translate-y-[10%]"
            style={{
              left: PIN_POSITIONS[pin.id]?.left ?? '50%',
              top: PIN_POSITIONS[pin.id]?.top ?? '50%',
              transform: 'translate(-50%, -100%)',
            }}
            onMouseEnter={() => setHoveredPin(pin.id)}
            onMouseLeave={() => setHoveredPin(null)}
            onClick={() => goToPost(pin)}
          >
            {/* Dot */}
            <div
              className="w-3.5 h-3.5 rounded-full border-2 border-white/80"
              style={{
                background: pin.variant === 'gold' ? '#D4A017' : '#B91C1C',
                boxShadow:
                  pin.variant === 'gold'
                    ? '0 0 0 4px rgba(212,160,23,0.3)'
                    : '0 0 0 4px rgba(185,28,28,0.3)',
                animation:
                  pin.variant === 'gold'
                    ? 'pulsePinGold 2s ease infinite'
                    : 'pulsePin 2s ease infinite',
              }}
            />

            {/* Tooltip */}
            {hoveredPin === pin.id && (
              <div
                className="absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-[200px] rounded-[10px] p-3 pointer-events-none z-10"
                style={{
                  background: '#0F172A',
                  border: '1px solid rgba(255,255,255,0.13)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                }}
              >
                <h5 className="text-[13px] text-white font-semibold mb-1">{pin.title}</h5>
                <p className="text-[11px] text-white/50">
                  {pin.location} · {pin.grade}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Legend */}
        <div
          className="absolute bottom-5 flex gap-4 rounded-[10px] px-4 py-3"
          style={{
            left: 'calc(280px + 48px)',
            background: 'rgba(15,23,42,0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div className="flex items-center gap-1.5 text-[11px] text-white/60">
            <div className="w-2.5 h-2.5 rounded-full bg-gold" />
            Nổi bật
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-white/60">
            <div className="w-2.5 h-2.5 rounded-full bg-red-vss" />
            Ký ức
          </div>
        </div>
      </div>
    </div>
  )
}
