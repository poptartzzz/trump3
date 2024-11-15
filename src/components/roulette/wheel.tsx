'use client'

import { useEffect } from 'react'
import { cn } from "@/lib/utils"

interface WheelProps {
  rotation: number
  onSpinComplete: () => void
}

export function RouletteWheel({ rotation, onSpinComplete }: WheelProps) {
  useEffect(() => {
    // Your effect code here
  }, [rotation, onSpinComplete])

  return (
    <div className={cn(
      "relative w-full aspect-square",
      "transform transition-transform duration-5000 ease-out",
      `rotate-[${rotation}deg]`
    )}>
      {/* Wheel content */}
    </div>
  )
}