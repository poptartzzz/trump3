'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"

const moneyEmojis = ['💰', '💎', '🪙', '💵', '💸']

type EmojiStyle = {
  left: string;
  animationDelay: string;
}

type EmojiItem = {
  id: number;
  emoji: string;
  style: EmojiStyle;
}

export function MoneyBackground() {
  const [emojis, setEmojis] = useState<EmojiItem[]>([])

  // Background money effect
  useEffect(() => {
    const interval = setInterval(() => {
      const newEmoji = {
        id: Date.now(),
        emoji: moneyEmojis[Math.floor(Math.random() * moneyEmojis.length)],
        style: {
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
        }
      }
      setEmojis(prev => [...prev, newEmoji])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Clean up old emojis
  useEffect(() => {
    const cleanup = setInterval(() => {
      setEmojis(prev => prev.filter(emoji => Date.now() - emoji.id < 10000))
    }, 1000)

    return () => clearInterval(cleanup)
  }, [])

  return (
    <div className="money-background">
      {emojis.map(({ id, emoji, style }) => (
        <div
          key={id}
          className="money-emoji"
          style={style}
        >
          {emoji}
        </div>
      ))}
    </div>
  )
}

export function MakeItRain() {
  const [rainDrops, setRainDrops] = useState<EmojiItem[]>([])

  const triggerRain = () => {
    const newDrops = Array(50).fill(null).map((_, i) => ({
      id: Date.now() + i,
      emoji: moneyEmojis[Math.floor(Math.random() * moneyEmojis.length)],
      style: {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 0.5}s`,
      }
    }))
    setRainDrops(prev => [...prev, ...newDrops])

    // Clean up after animation
    setTimeout(() => {
      setRainDrops(prev => prev.filter(drop => drop.id !== newDrops[0].id))
    }, 3000)
  }

  return (
    <>
      <Button
        onClick={triggerRain}
        className="fixed bottom-4 left-4 bg-[#63e211] text-black hover:bg-[#7fff00] shadow-md shadow-[#63e211]/20 font-press-start-2p z-20 rainbow-border"
      >
        MAKE IT RAIN 💸
      </Button>
      <div className="money-background">
        {rainDrops.map(({ id, emoji, style }) => (
          <div
            key={id}
            className="rain-money"
            style={style}
          >
            {emoji}
          </div>
        ))}
      </div>
    </>
  )
} 