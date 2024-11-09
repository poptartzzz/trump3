'use client'

import { createContext, useContext, useState } from 'react'
import { ethers } from 'ethers'

interface WalletContextType {
  address: string | null
  isConnected: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnected: false,
  connect: async () => {},
  disconnect: () => {},
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)

  const connect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        setAddress(address)
      } catch (error) {
        console.error('Error connecting wallet:', error)
      }
    } else {
      alert('Please install MetaMask!')
    }
  }

  const disconnect = () => {
    setAddress(null)
  }

  return (
    <WalletContext.Provider value={{
      address,
      isConnected: !!address,
      connect,
      disconnect,
    }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  return useContext(WalletContext)
} 