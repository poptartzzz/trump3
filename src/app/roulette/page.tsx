'use client'

import { Press_Start_2P } from 'next/font/google'

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p'
})

export default function RoulettePage() {
  return (
    <div className={`min-h-screen bg-black text-[#63e211] ${pressStart2P.variable} font-press-start-2p`}>
      <div className="text-center py-12">
        <h1 className="text-2xl">Coming Soon</h1>
      </div>
    </div>
  )
}