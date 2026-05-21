'use client'

import { motion } from 'framer-motion'
import { VERIFY_STEPS } from '@/lib/data'
import { SectionEyebrow, SectionTitle, SectionSub } from '@/components/shared/SectionHeader'

export function VerifySection() {
  return (
    <section className="bg-[#F0EDE8] px-[8vw] py-24">
      <div className="text-center max-w-[600px] mx-auto mb-14">
        <SectionEyebrow>Chất Lượng Nội Dung</SectionEyebrow>
        <SectionTitle>Kiểm Chứng 3 Tầng</SectionTitle>
        <SectionSub className="mx-auto mb-0">
          Mọi ký ức và tư liệu đều được qua quy trình xác thực nghiêm ngặt trước khi xuất bản làm
          học liệu.
        </SectionSub>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-0">
        {VERIFY_STEPS.map((step, i) => (
          <div key={step.num} className="flex items-center">
            {/* Step card */}
            <motion.div
              className="text-center px-4 md:px-6 flex-1 min-w-[180px] max-w-[240px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div
                className="w-[52px] h-[52px] rounded-full flex items-center justify-center mx-auto mb-4 font-serif text-[22px] font-bold"
                style={{
                  background: i === 0 ? '#0F172A' : '#D4A017',
                  color: i === 0 ? '#D4A017' : '#0F172A',
                }}
              >
                {step.num}
              </div>
              <div className="text-[28px] mb-3">{step.icon}</div>
              <h4 className="text-base font-semibold text-navy mb-2">{step.title}</h4>
              <p className="text-[13px] text-slate-500 leading-[1.6]">{step.description}</p>
            </motion.div>

            {/* Arrow connector (between steps) */}
            {i < VERIFY_STEPS.length - 1 && (
              <div className="hidden md:block text-[28px] text-navy/20 px-2 mt-[-60px]">→</div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
