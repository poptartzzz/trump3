'use client'

import { Press_Start_2P } from 'next/font/google'
import Link from 'next/link'
import { ArrowLeft, Wallet, TrendingUp, TrendingDown, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CustomImage } from "@/components/ui/custom-image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BalanceDropdown } from "@/components/balance-dropdown"
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
import Image from 'next/image'
import eth32 from 'cryptocurrency-icons/32/color/eth.png'
import btc32 from 'cryptocurrency-icons/32/color/btc.png'

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p'
})

interface Position {
  type: 'LONG' | 'SHORT'
  token: string
  amount: string
  leverage: string
  entryPrice: string
  liquidationPrice: string
  timestamp: Date
}

export default function FuturesPage() {
  const { isConnected, connect } = useWallet()
  const [positions, setPositions] = useState<Position[]>([])
  const [amount, setAmount] = useState('')
  const [leverage, setLeverage] = useState('1')
  const [selectedCoin, setSelectedCoin] = useState('8BET')
  const [customLeverage, setCustomLeverage] = useState('')
  const { prices, fetchPrices } = usePriceStore()

  useEffect(() => {
    fetchPrices()
  }, [fetchPrices])

  const coins = [
    { 
      name: '8BET', 
      icon: '/wagiebetlogocoin1.png', 
      price: formatPrice(prices['8bet']), 
      change: '-6.13%' // Hardcoded for now
    },
    { 
      name: 'ETH', 
      icon: eth32.src, 
      price: formatPrice(prices.ethereum), 
      change: formatPriceChange(2.45) // Example change
    },
    { 
      name: 'BTC', 
      icon: btc32.src, 
      price: formatPrice(prices.bitcoin), 
      change: formatPriceChange(1.23) // Example change
    }
  ]

  const handleTrade = (type: 'LONG' | 'SHORT') => {
    if (!amount || !isConnected) return

    const newPosition: Position = {
      type,
      token: '8BET',
      amount,
      leverage,
      entryPrice: '$1.00', // Example price
      liquidationPrice: type === 'LONG' ? '$0.50' : '$1.50', // Example prices
      timestamp: new Date()
    }

    setPositions(prev => [newPosition, ...prev])
    setAmount('')
  }

  return (
    <div className={`min-h-screen bg-black text-[#63e211] ${pressStart2P.variable} font-press-start-2p`}>
      {/* Header */}
      <header className="border-b border-green-900/50 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex h-20 items-center justify-between w-full">
          <div className="flex items-center gap-6 pl-6">
            <Link href="/" className="flex items-center gap-2">
              <CustomImage
                src="/8BETbanner.png"
                alt="8BET Logo"
                width={300}
                height={100}
                className="h-20 w-auto"
                priority
                quality={100}
              />
            </Link>
          </div>
          <div className="flex items-center gap-4 pr-6">
            <BalanceDropdown />
            <Link href="/account">
              <Button 
                variant="outline"
                className="border-[#63e211]/20 bg-[#1a4d1a] text-[#63e211] hover:bg-[#63e211]/20 font-press-start-2p"
              >
                ACCOUNT
              </Button>
            </Link>
            <Link href="/cashier">
              <Button className="bg-[#63e211] text-black hover:bg-[#7fff00] shadow-md shadow-[#63e211]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 font-press-start-2p">
                CASHIER
              </Button>
            </Link>
          </div>
        </div>
      </header>

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
            <h1 className="text-2xl font-press-start-2p text-[#63e211] mb-8 text-center">Futures Trading</h1>

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
            <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
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

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-[#63e211]">
                      <span>Amount (USD)</span>
                      <span>Balance: $0.00</span>
                    </div>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-black/30 border-[#63e211]/20 text-[#63e211] font-press-start-2p"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-[#63e211]">
                      <span>Leverage</span>
                      <span>{customLeverage || leverage}x</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      {['1', '3', '5', '10', '100', '1000'].map((x) => (
                        <Button
                          key={x}
                          variant="outline"
                          onClick={() => {
                            setLeverage(x)
                            setCustomLeverage('')
                          }}
                          className={`border-[#63e211]/20 text-[#63e211] hover:bg-[#63e211]/20 ${
                            leverage === x && !customLeverage ? 'bg-[#63e211]/20' : ''
                          }`}
                        >
                          {x}x
                        </Button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Custom leverage"
                        value={customLeverage}
                        onChange={(e) => {
                          setCustomLeverage(e.target.value)
                          setLeverage('')
                        }}
                        min="1"
                        max="1000"
                        className="bg-black/30 border-[#63e211]/20 text-[#63e211] font-press-start-2p"
                      />
                      <Button
                        variant="outline"
                        onClick={() => {
                          if (customLeverage) {
                            setLeverage(customLeverage)
                            setCustomLeverage('')
                          }
                        }}
                        className="border-[#63e211]/20 text-[#63e211] hover:bg-[#63e211]/20"
                      >
                        Set
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      onClick={() => handleTrade('LONG')}
                      className="bg-green-500 text-black hover:bg-green-400 shadow-md"
                      disabled={!amount}
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      LONG
                    </Button>
                    <Button 
                      onClick={() => handleTrade('SHORT')}
                      className="bg-red-500 text-black hover:bg-red-400 shadow-md"
                      disabled={!amount}
                    >
                      <TrendingDown className="h-4 w-4 mr-2" />
                      SHORT
                    </Button>
                  </div>
                </div>

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
                {positions.length > 0 ? (
                  <div className="space-y-4">
                    {positions.map((position, i) => (
                      <div key={i} className="bg-black/30 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${
                              position.type === 'LONG' ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {position.type}
                            </span>
                            <span className="text-sm text-[#63e211]">{position.token}</span>
                          </div>
                          <span className="text-xs text-[#63e211]/80">
                            {position.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs text-[#63e211]/80">Size</div>
                            <div className="text-sm text-[#63e211]">${position.amount}</div>
                          </div>
                          <div>
                            <div className="text-xs text-[#63e211]/80">Leverage</div>
                            <div className="text-sm text-[#63e211]">{position.leverage}x</div>
                          </div>
                          <div>
                            <div className="text-xs text-[#63e211]/80">Entry Price</div>
                            <div className="text-sm text-[#63e211]">{position.entryPrice}</div>
                          </div>
                          <div>
                            <div className="text-xs text-[#63e211]/80">Liq. Price</div>
                            <div className="text-sm text-[#63e211]">{position.liquidationPrice}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-sm text-[#63e211]/80 py-8">
                    No open positions
                  </div>
                )}
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