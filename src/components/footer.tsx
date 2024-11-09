'use client'

import Link from "next/link"
import { MessageCircle, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-[#63e211]/20 bg-[#0d260d] py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-press-start-2p text-[#63e211]">Community</h3>
            <div className="space-y-2">
              <Link 
                href="https://t.me/eightbeteth"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#63e211]/80 hover:text-[#63e211] text-xs font-press-start-2p"
              >
                <MessageCircle className="h-4 w-4" />
                Telegram
              </Link>
              <Link 
                href="https://x.com/eightbeteth"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#63e211]/80 hover:text-[#63e211] text-xs font-press-start-2p"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-press-start-2p text-[#63e211]">Resources</h3>
            <div className="space-y-2">
              <Link 
                href="/litepaper"
                className="text-[#63e211]/80 hover:text-[#63e211] text-xs block font-press-start-2p"
              >
                Litepaper
              </Link>
              <Link 
                href="https://app.uniswap.org/swap?outputCurrency=0x9fC6Dc9Aba221e2260527CFA9e2564525D451093&chain=ethereum"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#63e211]/80 hover:text-[#63e211] text-xs block font-press-start-2p"
              >
                Buy on Uniswap
              </Link>
              <Link 
                href="https://dexscreener.com/ethereum/0x9fC6Dc9Aba221e2260527CFA9e2564525D451093"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#63e211]/80 hover:text-[#63e211] text-xs block font-press-start-2p"
              >
                Chart
              </Link>
            </div>
          </div>

          {/* Contract Info - More Compact */}
          <div className="space-y-2">
            <h3 className="text-sm font-press-start-2p text-[#63e211]">Contract</h3>
            <div 
              onClick={() => navigator.clipboard.writeText('0x9fC6Dc9Aba221e2260527CFA9e2564525D451093')}
              className="text-[8px] text-[#63e211]/70 font-press-start-2p bg-black/30 px-2 py-1 rounded cursor-pointer hover:bg-black/40 transition-colors break-all"
            >
              0x9fC6Dc9Aba221e2260527CFA9e2564525D451093
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-[#63e211]/20 text-center text-[10px] text-[#63e211]/50 font-press-start-2p">
          © 2024 8BET. All rights reserved.
        </div>
      </div>
    </footer>
  )
} 