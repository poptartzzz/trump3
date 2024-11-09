import { create } from 'zustand'

const TOKEN_ADDRESS = '0x3ec4f4b120b3a893f03db0cec9a400a9b293663c'
const DEXTOOLS_API_KEY = process.env.NEXT_PUBLIC_DEXTOOLS_API_KEY

interface DexToolsResponse {
  data: {
    price: number
    priceChange: number
    volume24h: number
    liquidity: {
      usd: number
    }
  }
}

interface PriceState {
  prices: {
    '8bet': number
    ethereum: number
    bitcoin: number
  }
  volume24h: number
  holders: number
  burned: number
  fetchPrices: () => Promise<void>
}

export const usePriceStore = create<PriceState>((set) => ({
  prices: {
    '8bet': 0,
    ethereum: 0,
    bitcoin: 0
  },
  volume24h: 0,
  holders: 0,
  burned: 0,
  fetchPrices: async () => {
    try {
      // Fetch from DEXTools API
      const response = await fetch(
        `https://api.dextools.io/v1/token/${TOKEN_ADDRESS}/price`,
        {
          headers: {
            'X-API-Key': DEXTOOLS_API_KEY || ''
          }
        }
      )
      
      const data: DexToolsResponse = await response.json()

      set({
        prices: {
          '8bet': data.data.price,
          ethereum: 0, // You can add ETH price endpoint
          bitcoin: 0  // You can add BTC price endpoint
        },
        volume24h: data.data.volume24h,
        holders: 0, // This would come from Etherscan
        burned: 0  // This would need contract interaction
      })
    } catch (error) {
      console.error('Error fetching prices:', error)
    }
  }
}))

// Auto-update prices every 30 seconds
if (typeof window !== 'undefined') {
  setInterval(() => {
    usePriceStore.getState().fetchPrices()
  }, 30000)
} 