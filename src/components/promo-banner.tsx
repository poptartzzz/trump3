'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export function PromoBanner() {
  const messages = [
    "🎮 Welcome to 8BET - The Ultimate Web3 Wagering Platform",
    "🏆 Challenge Other Players in Skill-Based Games",
    "🚀 2X DEPOSIT BONUS LIVE NOW - Limited Time Only!",
    "💎 Stake Your 8BET Tokens - Earn While You Play"
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [messages.length])

  return (
    <div className="bg-[#1a4d1a]/50 border-y border-[#63e211]/20 backdrop-blur-sm py-2 relative overflow-hidden">
      <div className="container flex items-center justify-center gap-2">
        <Sparkles className="h-5 w-5 text-[#63e211] animate-pulse" />
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center font-press-start-2p text-[#63e211] text-sm px-4"
        >
          {messages[currentIndex]}
        </motion.div>
        <Sparkles className="h-5 w-5 text-[#63e211] animate-pulse" />
      </div>
    </div>
  )
} 