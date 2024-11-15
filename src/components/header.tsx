'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BalanceDropdown } from "@/components/balance-dropdown"

export function Header() {
  return (
    <header className="w-full border-b border-green-900/50 bg-black backdrop-blur-sm sticky top-0 z-50">
      <div className="w-full flex h-20 items-center justify-between bg-black">
        <div className="flex items-center gap-6 pl-6">
          <Link href="#" className="flex items-center gap-2">
            <Image
              src="/logoforweb.gif"
              alt="*BET Logo"
              width={300}
              height={100}
              className="h-20 w-auto animate-pulse"
              priority
              quality={100}
            />
          </Link>
        </div>
        <div className="flex items-center gap-4 pr-6">
          <div className="flex items-center gap-2 bg-[#1a4d1a]/50 px-4 py-2 rounded-lg border border-[#63e211]/20 animate-pulse-border">
            <span className="text-[#63e211]/70 text-sm font-press-start-2p rainbow-text">WEB WALLET</span>
            <div className="w-[1px] h-6 bg-[#63e211]/20" />
            <BalanceDropdown />
          </div>
          <Link href="/account">
            <Button 
              variant="outline"
              className="border-[#63e211]/20 bg-[#1a4d1a] text-[#63e211] hover:bg-[#63e211]/20 font-press-start-2p hover-glow animate-pulse-border"
            >
              ACCOUNT
            </Button>
          </Link>
          <Link href="/cashier">
            <Button className="bg-[#63e211] text-black hover:bg-[#7fff00] shadow-md shadow-[#63e211]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 font-press-start-2p hover-glow rainbow-border">
              CASHIER
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
} 