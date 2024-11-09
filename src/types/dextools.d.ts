export interface DexToolsResponse {
  data: {
    price: number
    priceChange: number
    volume24h: number
    liquidity: {
      usd: number
    }
    pairs: {
      [key: string]: {
        liquidity: number
        volume24h: number
      }
    }
  }
} 