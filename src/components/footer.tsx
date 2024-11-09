'use client'

import Link from 'next/link'
import { CustomImage } from "@/components/ui/custom-image"
import { MessageCircle, Twitter, FileText, ShoppingCart, LineChart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-green-900/50 bg-[#0a1f0a] backdrop-blur-sm mt-auto">
      <div className="container max-w-[1400px] py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <CustomImage
              src="/8BETbanner.png"
              alt="8BET Logo"
              width={200}
              height={60}
              className="h-12 w-auto"
            />
            <p className="text-xs text-[#63e211]/80 font-press-start-2p">
              Web3 Skill-Based Wagering Platform
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-press-start-2p text-[#63e211]">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/staking" className="text-xs text-[#63e211]/80 hover:text-[#63e211] font-press-start-2p">
                Staking
              </Link>
              <Link href="/account" className="text-xs text-[#63e211]/80 hover:text-[#63e211] font-press-start-2p">
                Account
              </Link>
              <Link href="/cashier" className="text-xs text-[#63e211]/80 hover:text-[#63e211] font-press-start-2p">
                Cashier
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-press-start-2p text-[#63e211]">Resources</h3>
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/litepaper" 
                className="text-xs text-[#63e211]/80 hover:text-[#63e211] font-press-start-2p flex items-center gap-2"
              >
                <FileText className="h-3 w-3" />
                Litepaper
              </Link>
              <Link 
                href="https://uniswap.org/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#63e211]/80 hover:text-[#63e211] font-press-start-2p flex items-center gap-2"
              >
                <ShoppingCart className="h-3 w-3" />
                Buy 8BET
              </Link>
              <Link 
                href="https://dexscreener.com/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#63e211]/80 hover:text-[#63e211] font-press-start-2p flex items-center gap-2"
              >
                <LineChart className="h-3 w-3" />
                Chart
              </Link>
            </nav>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="text-sm font-press-start-2p text-[#63e211]">Community</h3>
            <nav className="flex flex-col space-y-2">
              <Link 
                href="https://t.me/8beteth" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#63e211]/80 hover:text-[#63e211] font-press-start-2p flex items-center gap-2"
              >
                <MessageCircle className="h-3 w-3" />
                Telegram
              </Link>
              <Link 
                href="https://x.com/8beteth" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#63e211]/80 hover:text-[#63e211] font-press-start-2p flex items-center gap-2"
              >
                <Twitter className="h-3 w-3" />
                Twitter
              </Link>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-green-900/50 text-center">
          <p className="text-xs text-[#63e211]/60 font-press-start-2p">
            © 2024 8BET. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 