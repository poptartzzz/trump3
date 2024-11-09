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

const defaultPrices = {
  '8BET': 0.000001,
  ethereum: 3500,
  bitcoin: 65000
}

export const usePriceStore = create<PriceState>((set, get) => ({
  prices: { ...defaultPrices },
  previousPrices: { ...defaultPrices },
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

      try {
        // Fetch 8BET price from DexScreener
        const tokenResponse = await fetch(
          `https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESS}`
        );
        
        if (!tokenResponse.ok) {
          throw new Error('Failed to fetch token price');
        }

        const tokenData = await tokenResponse.json();

        // Fetch ETH and BTC prices from CoinGecko
        const cgResponse = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=usd'
        );

        if (!cgResponse.ok) {
          throw new Error('Failed to fetch crypto prices');
        }

        const cgData = await cgResponse.json();

        const tokenPrice = tokenData?.pairs?.[0]?.priceUsd || defaultPrices['8BET'];
        const ethPrice = cgData?.ethereum?.usd || defaultPrices.ethereum;
        const btcPrice = cgData?.bitcoin?.usd || defaultPrices.bitcoin;

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
          volume24h: tokenData?.pairs?.[0]?.volume?.h24 || 0,
          burned: 0
        });

      } catch (error) {
        console.warn('API fetch failed, using fallback data:', error);
        // Use default values on API failure
        set({
          prices: { ...defaultPrices },
          chartData: {
            '8BET': generateChartData(defaultPrices['8BET'], true),
            ethereum: generateChartData(defaultPrices.ethereum),
            bitcoin: generateChartData(defaultPrices.bitcoin)
          },
          volume24h: 0,
          burned: 0
        });
      }

    } catch (error) {
      console.error('Error in fetchPrices:', error);
      // Use default values on any error
      set({
        prices: { ...defaultPrices },
        chartData: {
          '8BET': [],
          ethereum: [],
          bitcoin: []
        },
        volume24h: 0,
        burned: 0
      });
    }
  }
}));

// Initial fetch with delay to avoid hydration issues
if (typeof window !== 'undefined') {
  setTimeout(() => {
    usePriceStore.getState().fetchPrices().catch(console.error);
  }, 1000);
  
  // Then update every 30 seconds
  setInterval(() => {
    usePriceStore.getState().fetchPrices().catch(console.error);
  }, 30000);
} 