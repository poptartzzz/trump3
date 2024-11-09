'use client'

import Link from 'next/link'
import { CustomImage } from "@/components/ui/custom-image"
import { 
  LayoutDashboard, 
  Gift, 
  LineChart, 
  Trophy, 
  Coins, 
  FileText, 
  ShoppingCart, 
  MessageCircle, 
  Twitter 
} from 'lucide-react'

export function LeftMenu() {
  return (
    <aside className="space-y-4 lg:space-y-6 p-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 rounded-lg bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] shadow-lg shadow-[#63e211]/10 px-3 py-2">
          <CustomImage
            src="/wagiebetlogocoin1.png"
            alt="Currency icon"
            className="rounded-full"
            height={24}
            width={24}
          />
          <div>
            <div className="font-semibold font-press-start-2p text-[#63e211]">8BET Coin</div>
            <div className="text-sm text-red-400">-6.13%</div>
          </div>
        </div>
      </div>

      {/* DASHBOARD Section */}
      <div className="space-y-1">
        <h2 className="px-3 text-xs font-semibold text-[#63e211]/50 font-press-start-2p">Dashboard</h2>
        <nav className="space-y-1">
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#63e211]/20 hover:text-green-300 font-press-start-2p"
          >
            <LayoutDashboard className="h-4 w-4" />
            Wagering
          </Link>
          <Link
            href="/lottery"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#63e211]/20 hover:text-green-300 font-press-start-2p"
          >
            <Gift className="h-4 w-4" />
            Lottery
          </Link>
          <Link
            href="/futures"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#63e211]/20 hover:text-green-300 font-press-start-2p"
          >
            <LineChart className="h-4 w-4" />
            Futures
          </Link>
          <Link
            href="/rewards"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#63e211]/20 hover:text-green-300 font-press-start-2p"
          >
            <Trophy className="h-4 w-4" />
            Rewards
          </Link>
        </nav>
      </div>

      {/* 8BIT Token Section */}
      <div className="space-y-1">
        <h2 className="px-3 text-xs font-semibold text-[#63e211]/50 font-press-start-2p">8bit Token</h2>
        <nav className="space-y-1">
          <Link
            href="/staking"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#63e211]/20 hover:text-green-300 font-press-start-2p"
          >
            <Coins className="h-4 w-4" />
            Staking
          </Link>
          <Link
            href="/litepaper"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#63e211]/20 hover:text-green-300 font-press-start-2p"
          >
            <FileText className="h-4 w-4" />
            Litepaper
          </Link>
          <Link
            href="https://uniswap.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#63e211]/20 hover:text-green-300 font-press-start-2p"
          >
            <ShoppingCart className="h-4 w-4" />
            Buy 8bet
          </Link>
          <Link
            href="https://dexscreener.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#63e211]/20 hover:text-green-300 font-press-start-2p"
          >
            <LineChart className="h-4 w-4" />
            Chart
          </Link>
        </nav>
      </div>

      {/* SOCIALS Section */}
      <div className="space-y-1">
        <h2 className="px-3 text-xs font-semibold text-[#63e211]/50 font-press-start-2p">Socials</h2>
        <nav className="space-y-1">
          <Link
            href="https://t.me/8beteth"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#63e211]/20 hover:text-green-300 font-press-start-2p"
          >
            <MessageCircle className="h-4 w-4" />
            Telegram
          </Link>
          <Link
            href="https://x.com/8beteth"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#63e211]/20 hover:text-green-300 font-press-start-2p"
          >
            <Twitter className="h-4 w-4" />
            Twitter
          </Link>
          <Link
            href="/litepaper"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#63e211]/20 hover:text-green-300 font-press-start-2p"
          >
            <FileText className="h-4 w-4" />
            Litepaper
          </Link>
        </nav>
      </div>
    </aside>
  )
} 