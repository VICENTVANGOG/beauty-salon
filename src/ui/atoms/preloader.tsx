'use client'

import { useEffect, useState } from 'react'
import { Scissors } from 'lucide-react'

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#E75A5A] transition-opacity duration-500 ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white">
        <Scissors className="h-10 w-10 text-[#E75A5A]" />
        <div className="absolute -bottom-1 left-1/2 h-6 w-8 -translate-x-1/2 bg-[#E75A5A]" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)' }} />
      </div>
      <h1 className="mt-4 text-2xl font-semibold text-white">Rincón Glamour</h1>
    </div>
  )
}
