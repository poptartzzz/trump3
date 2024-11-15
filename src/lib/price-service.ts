import { create } from 'zustand'

type PriceState = {
  prices: {
    ethereum: number
    bitcoin: number
    '888': number
  }
  previousPrices: {
    ethereum: number
    bitcoin: number
    '888': number
  }
  volume24h: number
  chartData: {
    ethereum: [number, number][]
    bitcoin: [number, number][]
  }
  fetchPrices: () => Promise<void>
}

export const usePriceStore = create<PriceState>((set) => ({
  prices: {
    ethereum: 0,
    bitcoin: 0,
    '888': 0
  },
  previousPrices: {
    ethereum: 0,
    bitcoin: 0,
    '888': 0
  },
  volume24h: 0,
  chartData: {
    ethereum: [],
    bitcoin: []
  },
  fetchPrices: async () => {
    try {
      // Fetch ETH and BTC prices from API
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=usd')
      const data = await response.json()

      set((state) => ({
        previousPrices: { ...state.prices },
        prices: {
          ethereum: data.ethereum.usd,
          bitcoin: data.bitcoin.usd,
          '888': 0.00000001
        },
        volume24h: 3629.10
      }))
    } catch (error) {
      console.error('Error fetching prices:', error)
      // Set fallback values on error
      set((state) => ({
        previousPrices: { ...state.prices },
        prices: {
          ethereum: 0,
          bitcoin: 0,
          '888': 0
        },
        volume24h: 0
      }))
    }
  }
})) 