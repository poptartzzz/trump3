export function formatPrice(price: number, options: { 
  decimals?: number,
  prefix?: string 
} = {}) {
  const { decimals = 2, prefix = '$' } = options
  
  return `${prefix}${price.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })}`
}

export function formatPriceChange(change: number) {
  const prefix = change >= 0 ? '+' : ''
  return `${prefix}${change.toFixed(2)}%`
} 