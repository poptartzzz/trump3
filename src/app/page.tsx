'use client'

import Link from "next/link"
import Image from "next/image"
import { Press_Start_2P } from 'next/font/google'
import { PromoBanner } from "@/components/promo-banner"
import { TrollBox } from "@/components/troll-box"
import { 
  LayoutDashboard,
  Gift,
  LineChart,
  Trophy,
  Coins,
  FileText,
  ShoppingCart,
  MessageCircle,
  Twitter,
  Flame,
  Banknote,
  Timer
} from 'lucide-react'
import { 
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { usePriceStore } from "@/lib/price-service"
import { formatPrice } from '@/lib/format-price';
import { useEffect } from 'react';
import { Header } from "@/components/header"
import { MoneyBackground, MakeItRain } from "@/components/money-background"

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p'
})

export default function Home() {
  const { prices, volume24h, previousPrices, fetchPrices } = usePriceStore()

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Fetch every 30 seconds
    return () => clearInterval(interval);
  }, [fetchPrices]); // Add fetchPrices to dependency array

  console.log('Price data:', { prices, volume24h, previousPrices });

  return (
    <div className={`min-h-screen w-full bg-black text-[#63e211] ${pressStart2P.variable} animate-gradient`}>
      <MoneyBackground />
      <MakeItRain />
      {/* Promo Banner */}
      <PromoBanner />
      
      {/* Use shared header */}
      <Header />

      <div className="mb-[30px]" />

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px,1fr,340px] gap-6 min-h-0 bg-black w-full px-4 lg:px-6">
        {/* Sidebar Navigation */}
        <aside className="space-y-4 lg:space-y-6">
          <div className="space-y-2">
            <div className="flex flex-col gap-1 rounded-lg bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] shadow-lg shadow-[#63e211]/10 px-3 py-2 animate-pulse-border">
              <div className="flex items-center gap-2">
                <Image
                  src="/8betdark.png"
                  alt="Currency icon"
                  className="rounded-full"
                  height={24}
                  width={24}
                />
                <div>
                  <div className="font-semibold font-press-start-2p text-[#63e211] rainbow-text">$888 Coin</div>
                  <div className="flex items-center gap-1">
                    <div className={`text-sm font-press-start-2p ${
                      prices['888'] > previousPrices['888'] 
                        ? 'text-[#63e211]' 
                        : prices['888'] < previousPrices['888'] 
                          ? 'text-[#ff6666]' 
                          : 'text-[#63e211]/70'
                    }`}>
                      ${formatPrice(prices['888'])}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DASHBOARD Section */}
          <div className="space-y-1">
            <h2 className="px-3 text-xs font-semibold text-[#63e211]/50 font-press-start-2p">Dashboard</h2>
            <nav className="space-y-1">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#63e211]/20 hover:text-green-300 font-press-start-2p hover-glow"
              >
                <LayoutDashboard className="h-4 w-4" />
                Wagering
              </Link>
              <Link
                href="/lottery"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#63e211]/20 hover:text-green-300 font-press-start-2p hover-glow"
              >
                <Gift className="h-4 w-4" />
                Lottery
              </Link>
              <Link
                href="/futures"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#63e211]/20 hover:text-green-300 font-press-start-2p hover-glow"
              >
                <LineChart className="h-4 w-4" />
                Futures
              </Link>
              <Link
                href="/rewards"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#63e211]/20 hover:text-green-300 font-press-start-2p hover-glow"
              >
                <Trophy className="h-4 w-4" />
                Rewards
              </Link>
            </nav>
          </div>

          {/* $888 Token Section */}
          <div className="space-y-1">
            <h2 className="px-3 text-xs font-semibold text-[#63e211]/50 font-press-start-2p">$888 Token</h2>
            <nav className="space-y-1">
              <Link
                href="/staking"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#63e211]/20 hover:text-green-300 font-press-start-2p hover-glow"
              >
                <Coins className="h-4 w-4" />
                Staking
              </Link>
              <Link
                href="/litepaper"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#63e211]/20 hover:text-green-300 font-press-start-2p hover-glow"
              >
                <FileText className="h-4 w-4" />
                Litepaper
              </Link>
              <Link
                href="https://app.uniswap.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#63e211]/20 hover:text-green-300 font-press-start-2p hover-glow"
              >
                <ShoppingCart className="h-4 w-4" />
                BUY 888
              </Link>
              <Link
                href="https://dexscreener.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#63e211]/20 hover:text-green-300 font-press-start-2p hover-glow"
              >
                <LineChart className="h-4 w-4" />
                Chart
              </Link>
            </nav>
          </div>

          {/* Socials Section */}
          <div className="space-y-1">
            <h2 className="px-3 text-xs font-semibold text-[#63e211]/50 font-press-start-2p">Socials</h2>
            <nav className="space-y-1">
              <Link
                href="https://t.me/triple_eight"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#63e211]/20 hover:text-green-300 font-press-start-2p hover-glow"
              >
                <MessageCircle className="h-4 w-4" />
                Telegram
              </Link>
              <Link
                href="https://x.com/tripleeighth"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#63e211]/20 hover:text-green-300 font-press-start-2p hover-glow"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="space-y-4 lg:space-y-6 min-h-0">
          {/* Wagering Games */}
          <section className="h-auto w-full">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-[#63e211]" />
                <h2 className="font-semibold text-[#63e211] font-press-start-2p">WAGERING GAMES</h2>
              </div>
            </div>
            <ScrollArea className="w-full">
              <div className="flex space-x-4 pb-4">
                {[
                  { 
                    name: 'FLAPPY PEPE', 
                    amount: 3.6291, 
                    image: '/flyingpepethumb.gif',
                    isLive: true,
                    isNew: true,
                    wagerLink: '/flepe',
                    practiceLink: '/flepedemo'
                  },
                  { 
                    name: 'TANKZ', 
                    amount: 0, 
                    image: '/wojaktanks.png',
                    isLive: false 
                  },
                  { 
                    name: 'ETHRIS', 
                    amount: 0, 
                    image: '/pepetetris.png',
                    isLive: false 
                  },
                  { 
                    name: 'BOUNCE', 
                    amount: 0, 
                    image: '/pepejbounce.png',
                    isLive: false 
                  },
                ].map((game, i) => (
                  <Card 
                    key={i} 
                    className={`min-w-[220px] max-w-[220px] bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] shadow-lg shadow-[#63e211]/10 backdrop-blur-sm border border-[#63e211]/20 transform transition-all duration-200 hover:scale-105 ${!game.isLive && 'opacity-50'}`}
                  >
                    <CardContent className="p-4">
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                        <Image
                          src={game.image}
                          alt={`${game.name} thumbnail`}
                          className="object-cover"
                          fill
                          priority={i === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent" />
                        {game.isNew && (
                          <div className="absolute top-2 left-2 bg-[#ff6666] px-2 py-1 rounded text-[8px] text-black font-press-start-2p">
                            NEW
                          </div>
                        )}
                        {!game.isLive && (
                          <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-[8px] text-[#63e211] font-press-start-2p border border-[#63e211]/20">
                            COMING SOON
                          </div>
                        )}
                      </div>
                      <div className="mt-3 space-y-3">
                        <div className="text-sm font-medium text-[#63e211] font-press-start-2p">
                          {game.name}
                        </div>
                        
                        {/* Pot Amount */}
                        <div className="flex items-center gap-2 bg-black/30 p-2 rounded-lg">
                          <Banknote className="h-4 w-4 text-[#63e211]" />
                          <span className="text-sm text-[#63e211] font-press-start-2p">
                            ${(game.amount * 100).toFixed(2)}
                          </span>
                        </div>

                        {/* Buttons */}
                        <div className="grid grid-cols-2 gap-2">
                          <Link href={game.wagerLink || '#'}>
                            <Button 
                              className="bg-[#63e211] text-black hover:bg-[#7fff00] shadow-md shadow-[#63e211]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 font-press-start-2p hover-glow"
                              disabled={!game.isLive}
                            >
                              WAGER
                            </Button>
                          </Link>
                          <Link href={game.practiceLink || '#'}>
                            <Button 
                              variant="outline"
                              className="border-[#ff6666] bg-[#ff6666]/20 text-[#ff6666] hover:bg-[#ff6666]/30 font-press-start-2p text-[10px] w-full"
                              disabled={!game.isLive}
                            >
                              PRACTICE
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="bg-[#63e211]/20" />
            </ScrollArea>
          </section>

          {/* Lottery Section */}
          <section className="h-auto w-full">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-[#63e211]" />
                <h2 className="font-semibold text-[#63e211] font-press-start-2p">LOTTERY</h2>
              </div>
            </div>
            <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20 relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ 
                  backgroundImage: 'url(/8betrafflebanner.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <CardContent className="p-6 relative z-10">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-press-start-2p text-[#63e211] mb-2">OPENING DAY LOTTERY</h3>
                    <div className="space-y-2">
                      <p className="text-sm text-[#ff6666] font-press-start-2p">
                        All accounts will receive a free entry
                      </p>
                      <p className="text-xs text-[#ff6666] font-press-start-2p">
                        Must hold 1000+ $888 during snapshot
                      </p>
                    </div>
                  </div>
                  <Link href="/lottery">
                    <Button 
                      className="bg-[#63e211] text-black hover:bg-[#7fff00] shadow-md shadow-[#63e211]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 font-press-start-2p hover-glow"
                    >
                      ENTER LOTTERY
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* $888 Coin Stats */}
          <section className="rounded-xl bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] p-4 lg:p-6 backdrop-blur-sm shadow-xl shadow-[#63e211]/10 border border-[#63e211]/20 animate-pulse-border">
            <div className="mb-4 lg:mb-6">
              <div className="flex items-center gap-4">
                <Image
                  src="/8betdark.png"
                  alt="$888 Coin"
                  className="rounded-full"
                  height={48}
                  width={48}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl lg:text-2xl font-bold text-[#63e211] font-press-start-2p rainbow-text">$888 COIN</h2>
                  </div>
                  <div className="text-xs lg:text-sm text-[#63e211] font-press-start-2p">
                    Coin Price: <span className={`${
                      prices['888'] > previousPrices['888'] 
                        ? 'text-[#63e211]' 
                        : prices['888'] < previousPrices['888'] 
                          ? 'text-[#ff6666]' 
                          : 'text-[#63e211]'
                    }`}>${formatPrice(prices['888'])}</span> USD • 24h Volume: ${formatPrice(volume24h)}
                  </div>
                  <div className="flex items-center gap-4">
                    <div 
                      className="mt-2 flex items-center gap-2 text-[12px] font-press-start-2p bg-black/30 px-3 py-1.5 rounded w-fit rainbow-text glow"
                    >
                      Stealth Launch today at approximately 7:30 UTC on UNISWAP
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
              <div>
                <div className="text-xs lg:text-sm text-[#63e211] font-press-start-2p">24h Revenue</div>
                <div className="text-xl lg:text-2xl font-bold text-[#63e211] font-press-start-2p leading-none mt-2">$0.00</div>
                <div className="text-xs lg:text-sm text-orange-400 font-press-start-2p leading-none mt-2">↑ 0.00%</div>
              </div>
              <div>
                <div className="text-xs lg:text-sm text-[#63e211] font-press-start-2p">$888 Burned</div>
                <div className="text-xl lg:text-2xl font-bold text-[#63e211] font-press-start-2p leading-none mt-2">0</div>
                <div className="text-xs lg:text-sm text-[#63e211] font-press-start-2p leading-none mt-2">$0.00</div>
              </div>
              <div>
                <div className="text-xs lg:text-sm text-[#63e211] font-press-start-2p">Revenue Share</div>
                <div className="text-xl lg:text-2xl font-bold text-[#63e211] font-press-start-2p leading-none mt-2">$0.00</div>
                <div className="text-xs lg:text-sm text-[#63e211] font-press-start-2p leading-none mt-2">0.00%</div>
              </div>
            </div>

            {/* DEXTools Chart */}
            <div className="mt-6 bg-black/30 p-4 rounded-lg">
              <div className="relative w-full h-[400px] overflow-hidden rounded-lg bg-[#0d260d]">
                <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                  <div className="text-xl font-press-start-2p text-[#63e211] rainbow-text glow">
                    Chart Updating After Launch
                  </div>
                  <div className="text-sm font-press-start-2p text-[#63e211]/70">
                    Price data and trading view will be available post-launch
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-start items-center mt-4">
              <div className="text-[10px] text-[#ff6666] italic font-press-start-2p">
                Information updated every 30 minutes
              </div>
            </div>
          </section>
        </main>

        {/* Troll Box Section */}
        <aside className="lg:block bg-black">
          <TrollBox />
        </aside>
      </div>
    </div>
  )
}
