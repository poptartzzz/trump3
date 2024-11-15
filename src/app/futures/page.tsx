'use client'

import { Press_Start_2P } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Wallet, TrendingUp, TrendingDown, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useWallet } from '@/app/providers'
import { usePriceStore } from '@/lib/price-service'
import { formatPrice, formatPriceChange } from '@/lib/format-price'
import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import eth32 from 'cryptocurrency-icons/32/color/eth.png'
import btc32 from 'cryptocurrency-icons/32/color/btc.png'
import { PriceChart } from '@/components/price-chart'
import { Header } from "@/components/header"

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p'
})

const formatChartData = (data: [number, number][]) => {
  return data.map(([timestamp, value]) => ({
    time: new Date(timestamp).toISOString(),
    value: value
  }));
};

export default function FuturesPage() {
  const { isConnected, connect } = useWallet()
  const [selectedCoin, setSelectedCoin] = useState('ETH')
  const { prices, chartData, fetchPrices } = usePriceStore()

  useEffect(() => {
    fetchPrices()
  }, [fetchPrices])

  const coins = [
    { 
      name: 'ETH',
      icon: eth32.src,
      price: formatPrice(prices.ethereum),
      change: formatPriceChange(2.45)
    },
    { 
      name: 'BTC',
      icon: btc32.src,
      price: formatPrice(prices.bitcoin),
      change: formatPriceChange(1.23)
    },
    { 
      name: '888',
      icon: '/8betlogodark.png',
      price: formatPrice(prices['888']),
      change: '-6.13%'
    }
  ]

  return (
    <div className={`min-h-screen bg-black text-[#63e211] ${pressStart2P.variable} font-press-start-2p`}>
      <Header />

      {/* Added mb-[30px] here */}
      <div className="mb-[30px]" />

      {/* Main Content */}
      <div className="container py-8 relative">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2 text-[#63e211] hover:bg-[#63e211]/20 font-press-start-2p">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Futures Content */}
          <div className={`transition-all duration-200 ${!isConnected ? 'blur-sm pointer-events-none' : ''}`}>
            <h1 className="text-2xl font-press-start-2p text-[#63e211] mb-2 text-center">Futures Trading</h1>
            <div className="text-center text-[#ff6666] font-press-start-2p text-sm mb-8">
              Releasing Late November 2024
            </div>

            {/* Trading Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
                <CardContent className="p-6">
                  <div className="text-sm text-[#63e211]/80">24h Volume</div>
                  <div className="text-xl font-bold text-[#63e211]">$0.00</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
                <CardContent className="p-6">
                  <div className="text-sm text-[#63e211]/80">Open Interest</div>
                  <div className="text-xl font-bold text-[#63e211]">$0.00</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
                <CardContent className="p-6">
                  <div className="text-sm text-[#63e211]/80">Funding Rate</div>
                  <div className="text-xl font-bold text-[#63e211]">0.00%</div>
                </CardContent>
              </Card>
            </div>

            {/* Trading Interface */}
            <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20 opacity-75">
              <CardHeader>
                <CardTitle className="text-[#63e211] font-press-start-2p text-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2 text-[#63e211] hover:bg-[#63e211]/20">
                          <Image
                            src={coins.find(c => c.name === selectedCoin)?.icon || ''}
                            alt={selectedCoin}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          {selectedCoin}-USD Perpetual
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-[#0d260d] border-[#63e211]/20">
                        {coins.map((coin) => (
                          <DropdownMenuItem 
                            key={coin.name}
                            className="flex items-center gap-2 hover:bg-[#63e211]/20 cursor-pointer"
                            onClick={() => setSelectedCoin(coin.name)}
                          >
                            <Image
                              src={coin.icon}
                              alt={coin.name}
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                            <span className="text-[#63e211]">{coin.name}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="h-[300px] bg-black/30 rounded-lg overflow-hidden">
                  {selectedCoin === '888' ? (
                    <iframe 
                      id="dextools-widget"
                      title="DEXTools Trading Chart"
                      width="100%"
                      height="300"
                      src="https://www.dextools.io/widget-chart/en/ether/pe-light/0x9fC6Dc9Aba221e2260527CFA9e2564525D451093?theme=dark&chartType=1&chartResolution=30&drawingToolbars=true&headerColor=1a4d1a&tvPlatformColor=000000&tvPaneColor=0d260d&chartInUsd=true"
                      className="w-full h-full border-0"
                    />
                  ) : selectedCoin === 'ETH' ? (
                    <iframe 
                      id="dextools-widget-eth"
                      title="DEXTools ETH Trading Chart"
                      width="100%"
                      height="300"
                      src="https://www.dextools.io/widget-chart/en/bnb/pe-light/0xf9878a5dd55edc120fde01893ea713a4f032229c?theme=dark&chartType=1&chartResolution=30&drawingToolbars=true&headerColor=1a4d1a&tvPlatformColor=000000&tvPaneColor=0d260d&chartInUsd=true"
                      className="w-full h-full border-0"
                    />
                  ) : selectedCoin === 'BTC' ? (
                    <iframe 
                      id="dextools-widget-btc"
                      title="DEXTools BTC Trading Chart"
                      width="100%"
                      height="300"
                      src="https://www.dextools.io/widget-chart/en/ether/pe-light/0x4ab6702b3ed3877e9b1f203f90cbef13d663b0e8?theme=dark&chartType=1&chartResolution=30&drawingToolbars=true&headerColor=1a4d1a&tvPlatformColor=000000&tvPaneColor=0d260d&chartInUsd=true"
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <PriceChart 
                      data={formatChartData(chartData[
                        selectedCoin === 'BTC' ? 'bitcoin' : 'ethereum'
                      ])} 
                    />
                  )}
                </div>

                {/* Price Display */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-black/30 p-4 rounded-lg">
                  <div>
                    <div className="text-sm text-[#63e211]/80">Mark Price</div>
                    <div className="text-lg font-bold text-[#63e211]">
                      {coins.find(c => c.name === selectedCoin)?.price}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-[#63e211]/80">24h Change</div>
                    <div className={`text-lg font-bold ${
                      coins.find(c => c.name === selectedCoin)?.change.startsWith('+') 
                        ? 'text-green-500' 
                        : 'text-red-400'
                    }`}>
                      {coins.find(c => c.name === selectedCoin)?.change}
                    </div>
                  </div>
                </div>

                {/* Trading Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    className="bg-green-500/50 text-black cursor-not-allowed"
                    disabled={true}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    LONG
                  </Button>
                  <Button 
                    className="bg-red-500/50 text-black cursor-not-allowed"
                    disabled={true}
                  >
                    <TrendingDown className="h-4 w-4 mr-2" />
                    SHORT
                  </Button>
                </div>

                {/* Info Section */}
                <div className="bg-black/30 p-4 rounded-lg space-y-2">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 flex-shrink-0 mt-1 text-[#63e211]" />
                    <div className="space-y-2 text-xs text-[#63e211]">
                      <p>• Maximum position size: $10,000</p>
                      <p>• Maintenance margin: 2%</p>
                      <p>• Funding rate updates every 8 hours</p>
                      <p>• Trading fee: 0.1%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Open Positions */}
            <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
              <CardHeader>
                <CardTitle className="text-[#63e211] font-press-start-2p text-lg">
                  Open Positions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-sm text-[#63e211]/80 py-8">
                  No open positions
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Connect Wallet Overlay */}
          {!isConnected && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
              <div className="text-center space-y-8 p-8 rounded-lg bg-[#0d260d]/80 border border-[#63e211]/20 max-w-md w-full mx-4">
                <h2 className="text-xl font-press-start-2p text-[#63e211]">Connect Wallet to Trade</h2>
                <Button 
                  onClick={() => connect()}
                  className="bg-[#63e211] text-black hover:bg-[#7fff00] shadow-md shadow-[#63e211]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 font-press-start-2p flex items-center gap-2 mx-auto"
                >
                  <Wallet className="h-4 w-4" />
                  CONNECT WALLET
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 