'use client'

import { Press_Start_2P } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Wallet, Gamepad2, Trophy, Timer, AlertCircle, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BalanceDropdown } from "@/components/balance-dropdown"
import { useWallet } from '@/app/providers'
import { useState } from 'react'

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p'
})

export default function FLEPEPage() {
  const { isConnected, connect } = useWallet()
  const [showBalanceError, setShowBalanceError] = useState(false)

  const handleWagerClick = () => {
    setShowBalanceError(true)
    setTimeout(() => setShowBalanceError(false), 3000) // Hide after 3 seconds
  }

  return (
    <div className={`min-h-screen bg-black text-[#63e211] ${pressStart2P.variable} font-press-start-2p`}>
      {/* Header remains the same */}
      <header className="border-b border-green-900/50 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex h-20 items-center justify-between w-full">
          <div className="flex items-center gap-6 pl-6">
            <Link href="/" className="flex items-center gap-2">
              <Image
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

      <div className="mb-[30px]" />

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
          <h1 className="text-2xl font-press-start-2p text-[#63e211] mb-8 text-center">FLAPPY PEPE</h1>

          {/* Current Round Info */}
          <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
            <CardHeader>
              <CardTitle className="text-[#63e211] font-press-start-2p text-lg flex items-center gap-2">
                <Timer className="h-4 w-4" />
                Current Round
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/30 p-4 rounded-lg">
                  <div className="text-sm text-[#63e211]/80 mb-2">Prize Pool</div>
                  <div className="text-xl font-bold text-[#63e211]">$365.00</div>
                  <div className="text-xs text-[#63e211]/50 mt-1">priced in 8BET token</div>
                </div>
                <div className="bg-black/30 p-4 rounded-lg">
                  <div className="text-sm text-[#63e211]/80 mb-2">Current High Score</div>
                  <div className="text-xl font-bold text-[#63e211]">28</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Game Container - Blurred */}
          <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
            <CardHeader>
              <CardTitle className="text-[#63e211] font-press-start-2p text-lg flex items-center gap-2">
                <Gamepad2 className="h-4 w-4" />
                Game Area
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative w-full aspect-[4/3] bg-black/30 rounded-lg overflow-hidden blur-sm pointer-events-none">
                <iframe 
                  src="https://i.simmer.io/@gameboy11/flappy-pepe-crypto-game" 
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 'none' }}
                />
              </div>

              {/* Wager Section */}
              <div className="space-y-4">
                {!isConnected ? (
                  <div className="text-center space-y-4 p-6 bg-black/30 rounded-lg">
                    <p className="text-sm text-[#63e211]/80 mb-4">
                      Connect your wallet to start playing for rewards
                    </p>
                    <Button 
                      onClick={() => connect()}
                      className="bg-[#63e211] text-black hover:bg-[#7fff00] shadow-md shadow-[#63e211]/20 font-press-start-2p"
                    >
                      <Wallet className="h-4 w-4 mr-2" />
                      CONNECT WALLET
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Button 
                      onClick={handleWagerClick}
                      className="w-full bg-[#63e211] text-black hover:bg-[#7fff00] shadow-md shadow-[#63e211]/20 font-press-start-2p"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Buy 1 Wager (Cost $10, priced in USDC, ETH or 8BET)
                    </Button>
                    
                    <div className="text-center text-xs text-[#63e211]/80">
                      Please fund your WEB wallet at the cashier
                    </div>
                    
                    {showBalanceError && (
                      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg text-center text-sm animate-fade-in">
                        <div className="flex items-center justify-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          <span>Insufficient balance</span>
                        </div>
                        <Link href="/cashier" className="text-[#63e211] hover:underline mt-2 block">
                          Fund your wallet in the cashier
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* High Scores */}
          <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
            <CardHeader>
              <CardTitle className="text-[#63e211] font-press-start-2p text-lg flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                High Scores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { address: '0x7F3a...4c29', score: 28 },
                  { address: '0x2B9c...8f31', score: 21 },
                  { address: '0x4E1d...9a76', score: 8 },
                  { address: '0x9D2e...5b12', score: 2 },
                  { address: '0x3F8b...2e45', score: 1 },
                ].map((player, i) => (
                  <div key={i} className="bg-black/30 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-[#63e211] font-bold">#{i + 1}</div>
                        <div className="text-sm text-[#63e211]">{player.address}</div>
                      </div>
                      <div className="text-sm text-[#63e211] font-bold">
                        Score: {player.score}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rules Card - Updated without prize distribution */}
          <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
            <CardHeader>
              <CardTitle className="text-[#63e211] font-press-start-2p text-lg flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Rules & Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 text-sm text-[#63e211]/80">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#63e211]">Wager Information:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Each wager costs $10 (payable in USDC, ETH or 8BET)</li>
                    <li>One attempt per wager</li>
                    <li>Score must be submitted within 5 minutes</li>
                    <li>Anti-cheat system enabled</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#63e211]">Important Notes:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Funds must be in WEB wallet to play</li>
                    <li>Prizes paid automatically at round end</li>
                    <li>Results verifiable on-chain</li>
                    <li>Practice mode available for free</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 