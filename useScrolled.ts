'use client'

import { useState, useEffect } from 'react'

export function useScrolled(threshold = 30) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    // Always scrolled on mount (navbar always has bg)
    setScrolled(true)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])

  return scrolled
}
