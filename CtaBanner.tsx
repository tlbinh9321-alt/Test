"use client";

interface CtaBannerProps {
  onContribute: () => void;
}

export function CtaBanner({ onContribute }: CtaBannerProps) {
  return (
    <div
      className="relative text-center px-[8vw] py-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0F172A 0%, #1a0505 50%, #2d0a0a 100%)",
      }}
    >
      {}
      <div className="absolute inset-0 dot-texture-sm pointer-events-none" />

      <div className="relative z-10">
        <h2
          className="font-serif font-bold text-white mb-4"
          style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
        >
          Bạn có ký ức lịch sử muốn chia sẻ?
        </h2>
        <p className="text-base text-white/60 max-w-[500px] mx-auto mb-9">
          Đóng góp tư liệu, câu chuyện và hình ảnh để cùng xây dựng kho di sản
          số Việt Nam.
        </p>
        <button
          onClick={onContribute}
          className="bg-white text-navy px-10 py-4 rounded-full text-[15px] font-semibold border-none cursor-pointer
                     transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,255,255,0.2)]"
        >
          ✦ Đóng Góp Ký Ức Ngay
        </button>
      </div>
    </div>
  );
}
