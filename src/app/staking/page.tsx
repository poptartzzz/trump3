'use client'

import { Press_Start_2P } from 'next/font/google'
import Link from 'next/link'
import { ArrowLeft, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CustomImage } from "@/components/ui/custom-image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BalanceDropdown } from "@/components/balance-dropdown"
import { useWallet } from '@/app/providers'

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p'
})

export default function StakingPage() {
  const { isConnected, connect } = useWallet()

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
      <div className="container py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2 text-[#63e211] hover:bg-[#63e211]/20 font-press-start-2p">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-2xl font-press-start-2p text-[#63e211] text-center">8BET STAKING</h1>

          {/* Staking Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
              <CardContent className="p-6">
                <div className="text-sm text-[#63e211]/80">TVL</div>
                <div className="text-xl font-bold text-[#63e211]">$0.00</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
              <CardContent className="p-6">
                <div className="text-sm text-[#63e211]/80">APR</div>
                <div className="text-xl font-bold text-[#63e211]">0.00%</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
              <CardContent className="p-6">
                <div className="text-sm text-[#63e211]/80">Total Staked</div>
                <div className="text-xl font-bold text-[#63e211]">0 8BET</div>
              </CardContent>
            </Card>
          </div>

          {/* Staking Card */}
          <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
            <CardHeader>
              <CardTitle className="text-[#63e211] font-press-start-2p text-lg flex items-center gap-3">
                <CustomImage
                  src="/wagiebetlogocoin1.png"
                  alt="8BET"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                8BET Staking Pool
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* User Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-black/30 p-4 rounded-lg">
                <div>
                  <div className="text-sm text-[#63e211]/80">Your Staked Balance</div>
                  <div className="text-lg font-bold text-[#63e211]">0.00 8BET</div>
                </div>
                <div>
                  <div className="text-sm text-[#63e211]/80">Claimable Rewards</div>
                  <div className="text-lg font-bold text-[#63e211]">0.00 8BET</div>
                </div>
              </div>

              {/* Staking Actions */}
              {isConnected ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-[#63e211]">
                      <span>Amount to Stake</span>
                      <span>Balance: 0.00 8BET</span>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="bg-black/30 border-[#63e211]/20 text-[#63e211] font-press-start-2p"
                      />
                      <Button
                        variant="outline"
                        className="border-[#63e211]/20 text-[#63e211] hover:bg-[#63e211]/20"
                      >
                        MAX
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      className="bg-[#63e211] text-black hover:bg-[#7fff00] shadow-md shadow-[#63e211]/20"
                      disabled
                    >
                      STAKE
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-[#63e211]/20 text-[#63e211] hover:bg-[#63e211]/20"
                      disabled
                    >
                      UNSTAKE
                    </Button>
                  </div>
                  <Button 
                    className="w-full bg-[#63e211] text-black hover:bg-[#7fff00] shadow-md shadow-[#63e211]/20"
                    disabled
                  >
                    CLAIM REWARDS
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => connect()}
                  className="w-full bg-[#63e211] text-black hover:bg-[#7fff00] shadow-md shadow-[#63e211]/20 flex items-center gap-2"
                >
                  <Wallet className="h-4 w-4" />
                  CONNECT WALLET
                </Button>
              )}

              {/* Staking Info */}
              <div className="space-y-2 text-xs text-[#63e211]/80">
                <div className="flex justify-between">
                  <span>Lock Period</span>
                  <span>7 Days</span>
                </div>
                <div className="flex justify-between">
                  <span>Early Unstake Fee</span>
                  <span>10%</span>
                </div>
                <div className="flex justify-between">
                  <span>Rewards Distribution</span>
                  <span>Every 24 Hours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 