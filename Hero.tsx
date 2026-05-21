"use client";

import { motion } from "framer-motion";
import { HERO_STATS } from "@/lib/data";

interface HeroProps {
  onExplore: () => void;
  onContribute: () => void;
}

export function Hero({ onExplore, onContribute }: HeroProps) {
  return (
    <section className="relative min-h-screen bg-navy flex flex-col justify-between overflow-hidden">
      {}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.65) 50%, rgba(185,28,28,0.15) 100%),
            url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80') center/cover no-repeat
          `,
          filter: "sepia(0.4) brightness(0.7)",
        }}
      />
      {}
      <div className="absolute inset-0 dot-texture pointer-events-none" />

      {}
      <motion.div
        className="relative z-10 flex-1 flex items-center px-[8vw] pt-28 pb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        <div className="max-w-[780px] w-full">
          {}
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-block w-8 h-px bg-gold flex-shrink-0" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-gold">
              Nền Tảng Học Liệu Số
            </span>
          </div>

          {}
          <h1
            className="font-serif font-bold text-white leading-[1.08] mb-6"
            style={{ fontSize: "clamp(40px, 6vw, 84px)" }}
          >
            Ký Ức Cộng Đồng
            <br />
            Thành <em className="text-gold not-italic">Di Sản Số</em>
          </h1>

          {}
          <p
            className="text-white/70 max-w-[520px] mb-10 font-light leading-[1.75]"
            style={{ fontSize: "clamp(14px, 1.6vw, 18px)" }}
          >
            Việt Sử Số chuyển hoá ký ức nhân chứng và tư liệu lịch sử địa phương
            thành học liệu số dành cho giáo dục phổ thông Việt Nam.
          </p>

          {}
          <div className="flex flex-wrap gap-3.5">
            <button
              onClick={onExplore}
              className="inline-flex items-center gap-2 bg-white text-navy px-7 py-3.5 rounded-full
                         text-sm font-semibold tracking-[0.02em] border-none cursor-pointer
                         transition-all duration-300 hover:-translate-y-0.5
                         hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]"
            >
              <span>Khám Phá Học Liệu</span>
              <span>→</span>
            </button>
            <button
              onClick={onContribute}
              className="inline-flex items-center gap-2 bg-transparent text-white px-7 py-3.5 rounded-full
                         text-sm font-medium cursor-pointer
                         border-[1.5px] border-white/40
                         transition-all duration-300 hover:border-white hover:bg-white/[0.07]"
            >
              <span>Đóng Góp Ký Ức</span>
            </button>
          </div>
        </div>
      </motion.div>

      {}
      <motion.div
        className="relative z-10 px-[8vw] pb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
      >
        <div
          className="flex gap-px overflow-hidden rounded-2xl border border-white/[0.13]
                     backdrop-blur-[16px] max-w-[560px]"
          style={{ background: "rgba(255,255,255,0.07)" }}
        >
          {HERO_STATS.map((stat, i) => (
            <div
              key={i}
              className="flex-1 px-6 py-4 text-center"
              style={{
                borderRight:
                  i < HERO_STATS.length - 1
                    ? "1px solid rgba(255,255,255,0.13)"
                    : "none",
              }}
            >
              <div className="font-serif text-2xl font-bold text-gold leading-none">
                {stat.num}
              </div>
              <div className="text-[11px] text-white/55 mt-1 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {}
      <div className="absolute bottom-10 right-[8vw] hidden lg:flex flex-col items-center gap-2 animate-bounce-y z-10">
        <div className="w-px h-[50px] bg-white/20" />
        <span className="text-[11px] text-white/40 tracking-[0.15em]">
          CUỘN
        </span>
      </div>
    </section>
  );
}
