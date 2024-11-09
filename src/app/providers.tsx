'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface WalletContextType {
  isConnected: boolean
  address: string | null
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: null,
  connect: async () => {},
  disconnect: () => {}
})

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)

  const connect = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        }) as string[];
        
        if (accounts && accounts.length > 0) {
          setAddress(accounts[0])
          setIsConnected(true)
        }
      } else {
        console.log('Please install MetaMask!')
      }
    } catch (error) {
      console.error('Error connecting wallet:', error)
    }
  }

  const disconnect = () => {
    setIsConnected(false)
    setAddress(null)
  }

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (...args: unknown[]) => {
        const accounts = args[0] as string[];
        if (accounts && accounts.length > 0) {
          setAddress(accounts[0])
          setIsConnected(true)
        } else {
          setAddress(null)
          setIsConnected(false)
        }
      }

      window.ethereum.on('accountsChanged', handleAccountsChanged)

      // Check if already connected
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: unknown) => {
          const ethAccounts = accounts as string[];
          if (ethAccounts && ethAccounts.length > 0) {
            setAddress(ethAccounts[0])
            setIsConnected(true)
          }
        })

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
      }
    }
  }, [])

  return (
    <WalletContext.Provider value={{ isConnected, address, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)