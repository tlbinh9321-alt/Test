'use client'

import { motion } from 'framer-motion'
import { INFO_CARDS, ROADMAP } from '@/lib/data'
import { SectionEyebrow, SectionTitle, SectionSub } from '@/components/shared/SectionHeader'

export function ProjectInfo() {
  return (
    <section className="bg-navy px-[8vw] py-24">
      <SectionEyebrow>Hành Trình</SectionEyebrow>
      <SectionTitle light>Thông Tin Dự Án</SectionTitle>
      <SectionSub light>
        Khởi động tháng 2/2026 — đang trong giai đoạn thí điểm và hoàn thiện nền tảng.
      </SectionSub>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Info cards 2×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {INFO_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              className="glass-card rounded-[18px] p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="text-[26px] mb-4">{card.icon}</div>
              <h4 className="text-[13px] font-semibold text-gold uppercase tracking-[0.08em] mb-2.5">
                {card.title}
              </h4>
              <p className="text-sm text-white/65 leading-[1.65]">{card.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Roadmap timeline */}
        <div>
          <h3 className="font-serif text-2xl text-gold font-semibold mb-6">Lộ Trình Phát Triển</h3>
          <div className="relative pl-8 roadmap-line">
            {ROADMAP.map((item, i) => (
              <motion.div
                key={item.title}
                className="relative mb-9"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-[29px] top-1 w-4 h-4 rounded-full border-[3px] border-navy"
                  style={{ background: item.faded ? 'rgba(212,160,23,0.3)' : '#D4A017' }}
                />
                <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gold mb-1">
                  {item.phase}
                </p>
                <h4 className="text-base font-semibold text-white mb-1">{item.title}</h4>
                <p className="text-[13px] text-white/50 leading-[1.5]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
