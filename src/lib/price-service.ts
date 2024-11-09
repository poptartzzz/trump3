import { create } from 'zustand'

interface PriceState {
  prices: {
    '8bet': number
    ethereum: number
    bitcoin: number
  }
  loading: boolean
  error: string | null
  fetchPrices: () => Promise<void>
}

export const usePriceStore = create<PriceState>((set) => ({
  prices: {
    '8bet': 1.00, // Pegged to USDC for now
    ethereum: 0,
    bitcoin: 0
  },
  loading: false,
  error: null,
  fetchPrices: async () => {
    try {
      set({ loading: true, error: null })
      
      // Fetch ETH and BTC prices from CoinGecko
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=usd'
      )
      
      if (!response.ok) throw new Error('Failed to fetch prices')
      
      const data = await response.json()
      
      set({
        prices: {
          '8bet': 1.00, // Keep USDC peg
          ethereum: data.ethereum.usd,
          bitcoin: data.bitcoin.usd
        },
        loading: false
      })
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'Failed to fetch prices',
        loading: false
      })
    }
  }
}))

// Auto-update prices every minute
if (typeof window !== 'undefined') {
  setInterval(() => {
    usePriceStore.getState().fetchPrices()
  }, 60000)
} 