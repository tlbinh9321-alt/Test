import React from 'react'

export function LogoIcon({ size = 36 }: { size?: number }) {
  return (
    <div
      className="relative flex items-center justify-center rounded-full border-2 border-gold flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <div
        className="absolute rounded-full border border-gold"
        style={{
          width: size * 0.5,
          height: size * 0.5,
          borderWidth: 1.5,
        }}
      />
      <div
        className="absolute rounded-full bg-gold"
        style={{ width: size * 0.167, height: size * 0.167 }}
      />
    </div>
  )
}
