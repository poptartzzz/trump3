import { create } from 'zustand'

const TOKEN_ADDRESS = '0xbeac671ee661461b7fcd786ece1b2f37af2a99f8'.toLowerCase()

interface PriceState {
  prices: {
    '8BET': number
    ethereum: number
    bitcoin: number
  }
  previousPrices: {
    '8BET': number
    ethereum: number
    bitcoin: number
  }
  chartData: {
    '8BET': { time: string; value: number }[]
    ethereum: { time: string; value: number }[]
    bitcoin: { time: string; value: number }[]
  }
  volume24h: number
  burned: number
  fetchPrices: () => Promise<void>
}

export const usePriceStore = create<PriceState>((set, get) => ({
  prices: {
    '8BET': 0,
    ethereum: 0,
    bitcoin: 0
  },
  previousPrices: {
    '8BET': 0,
    ethereum: 0,
    bitcoin: 0
  },
  chartData: {
    '8BET': [],
    ethereum: [],
    bitcoin: []
  },
  volume24h: 0,
  burned: 0,
  fetchPrices: async () => {
    try {
      const currentPrices = get().prices;
      
      set(state => ({
        ...state,
        previousPrices: { ...currentPrices }
      }));

      // Generate dates for the last 7 days
      const generateDates = () => {
        const dates = [];
        const now = new Date();
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          dates.push(date.toISOString().split('T')[0]);
        }
        return dates;
      };

      // Generate chart data with appropriate increments
      const generateChartData = (basePrice: number, is8BET: boolean = false) => {
        const dates = generateDates();
        let lastPrice = basePrice;

        return dates.map(date => {
          const variation = is8BET 
            ? (Math.random() - 0.5) * 0.001 
            : (Math.random() - 0.5) * (basePrice * 0.02);

          lastPrice = lastPrice + variation;
          return {
            time: date,
            value: Math.max(lastPrice, is8BET ? 0.000001 : 1)
          };
        });
      };

      // Fetch 8BET price from DexScreener
      const tokenResponse = await fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESS}`
      );
      const tokenData = await tokenResponse.json();

      // Fetch ETH and BTC prices from CoinGecko
      const cgResponse = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=usd'
      );
      const cgData = await cgResponse.json();

      const tokenPrice = tokenData.pairs?.[0]?.priceUsd || 0.000001;
      const ethPrice = cgData.ethereum?.usd || 3500;
      const btcPrice = cgData.bitcoin?.usd || 65000;

      const tokenChartData = generateChartData(tokenPrice, true);
      const ethChartData = generateChartData(ethPrice);
      const btcChartData = generateChartData(btcPrice);

      set({
        prices: {
          '8BET': tokenPrice,
          ethereum: ethPrice,
          bitcoin: btcPrice
        },
        chartData: {
          '8BET': tokenChartData,
          ethereum: ethChartData,
          bitcoin: btcChartData
        },
        volume24h: tokenData.pairs?.[0]?.volume?.h24 || 0,
        burned: 0
      });

      console.log('Updated with data:', {
        token: tokenPrice,
        eth: ethPrice,
        btc: btcPrice,
        charts: {
          '8BET': tokenChartData.length,
          ethereum: ethChartData.length,
          bitcoin: btcChartData.length
        }
      });

    } catch (error) {
      console.error('Error in fetchPrices:', error);
      // Use empty arrays for chart data on error
      set({
        prices: {
          '8BET': 0.000001,
          ethereum: 3500,
          bitcoin: 65000
        },
        chartData: {
          '8BET': [],
          ethereum: [],
          bitcoin: []
        },
        volume24h: 1000,
        burned: 0
      });
    }
  }
}));

// Initial fetch with delay to avoid hydration issues
if (typeof window !== 'undefined') {
  setTimeout(() => {
    usePriceStore.getState().fetchPrices();
  }, 1000);
  
  // Then update every 30 seconds
  setInterval(() => {
    usePriceStore.getState().fetchPrices();
  }, 30000);
} 