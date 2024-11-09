'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, ExternalLink } from 'lucide-react'
import { WalletService } from '@/lib/wallet-service'
import QRCodeStyling from 'qr-code-styling'
import { CustomImage } from "@/components/ui/custom-image"

interface DepositAddressProps {
  tokenName: string
  tokenAddress: string
  network: string
  icon: string
}

const walletService = new WalletService()

export function DepositAddress({ tokenName, tokenAddress, network, icon }: DepositAddressProps) {
  const [address, setAddress] = useState<string | null>(null)
  const qrRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Try to load existing wallet or create new one
    const initWallet = async () => {
      const hasWallet = await walletService.loadWallet('default_password')
      if (!hasWallet) {
        const newAddress = walletService.createWallet()
        await walletService.saveWallet('default_password')
        setAddress(newAddress)
      } else {
        setAddress(walletService.getAddress())
      }
    }

    initWallet()
  }, [])

  useEffect(() => {
    if (address && qrRef.current) {
      const qrCode = new QRCodeStyling({
        width: 200,
        height: 200,
        data: address,
        dotsOptions: {
          color: "#ffffff",
          type: "rounded"
        },
        backgroundOptions: {
          color: "#0d260d",
        },
        cornersSquareOptions: {
          color: "#ffffff",
          type: "extra-rounded"
        },
        cornersDotOptions: {
          color: "#ffffff",
          type: "dot"
        },
      })
      
      qrRef.current.innerHTML = ''
      qrCode.append(qrRef.current)
    }
  }, [address])

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setTimeout(() => setAddress(null), 2000)
    }
  }

  return (
    <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
      <CardHeader>
        <CardTitle className="text-[#63e211] font-press-start-2p text-lg flex items-center gap-3">
          <CustomImage
            src={icon}
            alt={tokenName}
            width={32}
            height={32}
            className="rounded-full"
          />
          Deposit {tokenName}
          <span className="text-sm font-normal ml-2">({network})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-black/30 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <code className="text-sm text-[#63e211] font-press-start-2p font-mono break-all">
              {address || 'Generating...'}
            </code>
            <Button
              variant="ghost"
              size="icon"
              onClick={copyAddress}
              className="hover:bg-[#63e211]/20"
            >
              <Copy className="h-4 w-4 text-[#63e211]" />
            </Button>
          </div>
        </div>
        <div className="flex justify-center p-4 bg-[#0d260d] rounded-lg">
          <div ref={qrRef} className="rounded-lg overflow-hidden" />
        </div>
        <div className="space-y-2">
          <div className="text-xs text-[#63e211]/80 font-press-start-2p">
            Send only {tokenName} to this address. Other tokens may be lost permanently.
          </div>
          <div className="text-xs text-[#63e211]/80 font-press-start-2p">
            Token Contract: 
            <code className="ml-2 bg-black/20 px-2 py-1 rounded font-press-start-2p">{tokenAddress}</code>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-[#63e211]/20 ml-2 h-6 w-6"
              onClick={() => window.open(`https://etherscan.io/token/${tokenAddress}`, '_blank')}
            >
              <ExternalLink className="h-3 w-3 text-[#63e211]" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 