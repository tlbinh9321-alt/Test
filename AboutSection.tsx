"use client";

import { motion } from "framer-motion";
import { BENEFITS } from "@/lib/data";
import {
  SectionEyebrow,
  SectionTitle,
} from "@/components/shared/SectionHeader";
import clsx from "clsx";
import type { BenefitColor } from "@/types";

const ICON_BG: Record<BenefitColor, string> = {
  red: "bg-red-50",
  gold: "bg-amber-50",
  navy: "bg-slate-100",
};

export function AboutSection() {
  return (
    <section className="bg-cream px-[8vw] py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* image */}
        <div className="relative rounded-[18px] overflow-hidden aspect-[4/3] group">
          <img
            src="https://images.unsplash.com/photo-1528702748617-c64d49f918af?w=800&q=80"
            alt="Lịch sử Việt Nam"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            style={{ filter: "sepia(0.3) brightness(0.85)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
          <div className="absolute bottom-5 left-5 bg-gold/90 text-navy text-xs font-semibold px-3.5 py-1.5 rounded-full tracking-[0.05em]">
            ✦ Giáo dục là điểm xuất phát
          </div>
        </div>

        {/* content */}
        <div>
          <SectionEyebrow>Về Dự Án</SectionEyebrow>
          <SectionTitle>
            Việt Sử Số
            <br />
            Là Gì?
          </SectionTitle>
          <p className="text-base text-slate-500 leading-[1.8] mb-7">
            Việt Sử Số là nền tảng học liệu số khai thác ký ức cộng đồng — được
            biên tập theo cấu trúc sư phạm, phục vụ trực tiếp trong công tác dạy
            và học lịch sử địa phương tại trường phổ thông.
          </p>

          <div className="flex flex-col gap-4">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                className="bg-white border border-navy/[0.08] rounded-[10px] p-[18px_20px] flex items-start gap-4
                           transition-all duration-300 hover:translate-x-1 hover:shadow-[0_4px_24px_rgba(15,23,42,0.10)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div
                  className={clsx(
                    "w-10 h-10 rounded-[10px] flex items-center justify-center text-lg flex-shrink-0",
                    ICON_BG[b.color],
                  )}
                >
                  {b.icon}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-navy mb-0.5">
                    {b.title}
                  </h4>
                  <p className="text-[13px] text-slate-500 leading-[1.5]">
                    {b.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
