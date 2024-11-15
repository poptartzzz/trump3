'use client'

import Link from 'next/link'
import { ArrowLeft, Wallet, Timer, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useWallet } from '@/app/providers'
import { useEffect, useState } from 'react'
import { Header } from "@/components/header"

export default function LotteryPage() {
  const { isConnected, connect } = useWallet()
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000)
      const target = new Date(utcNow)
      target.setUTCHours(2, 0, 0, 0)
      
      if (utcNow > target) {
        target.setDate(target.getDate() + 1)
      }

      const diff = target.getTime() - utcNow.getTime()
      
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen w-full bg-black text-[#63e211]">
      <Header />

      <div className="mb-[30px]" />

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
          <h1 className="text-2xl font-press-start-2p text-[#63e211] text-center">OPENING DAY LOTTERY</h1>

          {/* Lottery Info */}
          <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
            <CardHeader>
              <CardTitle className="text-[#63e211] font-press-start-2p text-lg flex items-center gap-2">
                <Timer className="h-4 w-4" />
                Time Until Draw
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#63e211] font-press-start-2p glow">
                  {countdown}
                </div>
              </div>
              <div className="text-sm text-[#63e211]/80 space-y-4">
                <p>
                  All accounts will receive a free entry to the opening day lottery.
                  Must hold 1000+ 888 during snapshot to be eligible.
                </p>
                <div className="bg-black/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-[#ff6666]">
                    <AlertCircle className="h-4 w-4" />
                    <span>Snapshot will be taken at 2:00 UTC</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prize Pool */}
          <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
            <CardHeader>
              <CardTitle className="text-[#63e211] font-press-start-2p text-lg">
                Prize Pool
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/30 p-4 rounded-lg text-center">
                  <div className="text-sm text-[#63e211]/80 mb-2">1st Place</div>
                  <div className="text-lg font-bold text-[#63e211]">5000 888</div>
                </div>
                <div className="bg-black/30 p-4 rounded-lg text-center">
                  <div className="text-sm text-[#63e211]/80 mb-2">2nd Place</div>
                  <div className="text-lg font-bold text-[#63e211]">2500 888</div>
                </div>
                <div className="bg-black/30 p-4 rounded-lg text-center">
                  <div className="text-sm text-[#63e211]/80 mb-2">3rd Place</div>
                  <div className="text-lg font-bold text-[#63e211]">1000 888</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Entry Status */}
          <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
            <CardHeader>
              <CardTitle className="text-[#63e211] font-press-start-2p text-lg">
                Your Entry Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isConnected ? (
                <div className="space-y-4">
                  <div className="bg-black/30 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-[#63e211]">888 Balance</div>
                      <div className="text-sm text-[#63e211]">0.00</div>
                    </div>
                  </div>
                  <div className="text-center text-sm text-[#ff6666]">
                    Insufficient balance for lottery entry (1000+ 888 required)
                  </div>
                  <Link href="/cashier">
                    <Button className="w-full bg-[#63e211] text-black hover:bg-[#7fff00] shadow-md shadow-[#63e211]/20 font-press-start-2p">
                      GET 888 TOKENS
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="text-sm text-[#63e211]/80">
                    Connect wallet to view entry status
                  </div>
                  <Button 
                    onClick={() => connect()}
                    className="bg-[#63e211] text-black hover:bg-[#7fff00] shadow-md shadow-[#63e211]/20 font-press-start-2p"
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    CONNECT WALLET
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 