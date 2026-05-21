"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  SectionEyebrow,
  SectionTitle,
} from "@/components/shared/SectionHeader";

interface FeaturesTeaserProps {
  onContribute: () => void;
}

const FEATURES = [
  {
    emoji: "📚",
    gradient: "linear-gradient(135deg,#0F172A,#1E293B)",
    tag: { label: "Học Liệu", color: "bg-slate-100 text-navy" },
    title: "Thư Viện Học Liệu",
    description:
      "Kho bài đăng lịch sử địa phương được tổ chức theo khối lớp, chủ đề và mốc lịch sử. Có file đính kèm cho giáo viên.",
    cta: "Khám phá →",
    href: "/library",
    isExternal: false,
  },
  {
    emoji: "🗺️",
    gradient: "linear-gradient(135deg,#1a2744,#0f1d3a)",
    tag: { label: "Tương Tác", color: "bg-amber-50 text-amber-800" },
    title: "Bản Đồ Ký Ức",
    description:
      "Khám phá ký ức lịch sử theo địa điểm trên bản đồ tương tác — từ làng xã đến vùng miền trên cả nước.",
    cta: "Xem bản đồ →",
    href: "/map",
    isExternal: false,
  },
  {
    emoji: "✍️",
    gradient: "linear-gradient(135deg,#2d0a0a,#4a1515)",
    tag: { label: "Cộng Đồng", color: "bg-red-50 text-red-vss" },
    title: "Đóng Góp Ký Ức",
    description:
      "Chia sẻ câu chuyện, hình ảnh và tư liệu lịch sử địa phương. Cùng xây dựng kho di sản số Việt Nam.",
    cta: "Đóng góp →",
    href: null,
    isExternal: false,
  },
];

export function FeaturesTeaser({ onContribute }: FeaturesTeaserProps) {
  return (
    <section className="bg-cream px-[8vw] py-24">
      <SectionEyebrow>Tính Năng</SectionEyebrow>
      <SectionTitle>Nền Tảng Có Những Gì?</SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((f, i) => {
          const CardInner = (
            <motion.div
              className="bg-white rounded-[18px] overflow-hidden shadow-[0_2px_12px_rgba(15,23,42,0.07)]
                         transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(15,23,42,0.13)]
                         border-l-[3px] border-transparent hover:border-red-vss cursor-pointer h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {}
              <div
                className="h-40 flex items-center justify-center text-[56px]"
                style={{ background: f.gradient }}
              />
              {}
              <div className="p-5">
                <div className="flex gap-2 mb-2.5">
                  <span
                    className={`text-[11px] font-semibold px-3 py-1 rounded-full ${f.tag.color}`}
                  >
                    {f.tag.label}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-navy leading-[1.3] mb-2">
                  {f.title}
                </h3>
                <p className="text-[13px] text-slate-500 leading-[1.6] mb-4">
                  {f.description}
                </p>
                <div className="flex justify-between items-center pt-3.5 border-t border-navy/[0.07]">
                  <span className="text-sm text-red-vss font-semibold">
                    {f.cta}
                  </span>
                </div>
              </div>
            </motion.div>
          );

          if (f.href) {
            return (
              <Link key={f.title} href={f.href} className="no-underline">
                {CardInner}
              </Link>
            );
          }
          return (
            <div key={f.title} onClick={onContribute}>
              {CardInner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
