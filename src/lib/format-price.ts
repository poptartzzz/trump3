export const formatPrice = (price: number | undefined | null): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (numPrice === undefined || numPrice === null || isNaN(numPrice)) {
    return '0.00';
  }

  if (numPrice < 0.000001) return numPrice.toExponential(2);
  if (numPrice < 1) return numPrice.toFixed(6);
  if (numPrice < 1000) return numPrice.toFixed(2);
  
  try {
    return numPrice.toLocaleString(undefined, { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    });
  } catch (error) {
    console.error('Error formatting price:', error);
    return '0.00';
  }
}

export function formatPriceChange(change: number) {
  if (typeof change !== 'number' || isNaN(change)) {
    return '+0.00%';
  }
  const prefix = change >= 0 ? '+' : '';
  return `${prefix}${change.toFixed(2)}%`;
} 