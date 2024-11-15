'use client'

import * as React from "react"
import type { StaticImageData } from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { CustomImage } from "@/components/ui/custom-image"
import Image from 'next/image'
import eth32 from 'cryptocurrency-icons/32/color/eth.png'
import usdc32 from 'cryptocurrency-icons/32/color/usdc.png'
import { usePriceStore } from '@/lib/price-service'

type CoinType = {
  name: string
  balance: string
  icon: string | StaticImageData
  price: number
}

export function BalanceDropdown() {
  const [selectedCoin, setSelectedCoin] = React.useState<CoinType>({
    name: '888',
    balance: '0.00',
    icon: '/8betlogodark.png',
    price: 1.00
  })

  const { prices } = usePriceStore()

  const coins: CoinType[] = [
    { name: '888', balance: '0.00', icon: '/8betlogodark.png', price: prices['888'] },
    { name: 'ETH', balance: '0.00', icon: eth32, price: prices.ethereum },
    { name: 'USDC', balance: '0.00', icon: usdc32, price: 1.00 }
  ]

  const handleCoinSelect = (coin: CoinType) => {
    setSelectedCoin(coin)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 text-[#63e211] hover:bg-[#63e211]/20">
          <div className="flex items-center gap-2">
            {typeof selectedCoin.icon === 'string' ? (
              <CustomImage
                src={selectedCoin.icon}
                alt={selectedCoin.name}
                width={20}
                height={20}
                className="rounded-full"
              />
            ) : (
              <Image
                src={selectedCoin.icon}
                alt={selectedCoin.name}
                width={20}
                height={20}
                className="rounded-full"
              />
            )}
            <span className="font-press-start-2p">{selectedCoin.balance} {selectedCoin.name}</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#0d260d] border-[#63e211]/20">
        {coins.map((coin) => (
          <DropdownMenuItem 
            key={coin.name}
            className="flex items-center justify-between gap-4 hover:bg-[#63e211]/20 cursor-pointer"
            onClick={() => handleCoinSelect(coin)}
          >
            <div className="flex items-center gap-2">
              {typeof coin.icon === 'string' ? (
                <CustomImage
                  src={coin.icon}
                  alt={coin.name}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              ) : (
                <Image
                  src={coin.icon}
                  alt={coin.name}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              )}
              <span className="font-press-start-2p text-[#63e211] text-xs">{coin.name}</span>
            </div>
            <span className="font-press-start-2p text-[#63e211] text-xs">{coin.balance}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 