import type {FormattedPrice} from '../sanity/types'

/**
 * Currency symbol mapping
 */
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'C$',
  AUD: 'A$',
  JPY: '¥',
}

/**
 * Currency configuration for different locales
 */
const CURRENCY_CONFIG: Record<string, {
  locale: string
  minimumFractionDigits: number
  maximumFractionDigits: number
}> = {
  USD: { locale: 'en-US', minimumFractionDigits: 2, maximumFractionDigits: 2 },
  EUR: { locale: 'de-DE', minimumFractionDigits: 2, maximumFractionDigits: 2 },
  GBP: { locale: 'en-GB', minimumFractionDigits: 2, maximumFractionDigits: 2 },
  CAD: { locale: 'en-CA', minimumFractionDigits: 2, maximumFractionDigits: 2 },
  AUD: { locale: 'en-AU', minimumFractionDigits: 2, maximumFractionDigits: 2 },
  JPY: { locale: 'ja-JP', minimumFractionDigits: 0, maximumFractionDigits: 0 },
}

/**
 * Convert price from cents to currency units
 */
export function centsToPrice(cents: number, currency: string = 'USD'): number {
  // Japanese Yen doesn't use decimal places
  if (currency === 'JPY') {
    return cents
  }
  return cents / 100
}

/**
 * Convert price from currency units to cents
 */
export function priceToCents(price: number, currency: string = 'USD'): number {
  // Japanese Yen doesn't use decimal places
  if (currency === 'JPY') {
    return Math.round(price)
  }
  return Math.round(price * 100)
}

/**
 * Format price with proper currency formatting
 */
export function formatPrice(
  priceInCents: number,
  currency: string = 'USD',
  options: {
    showSymbol?: boolean
    showCode?: boolean
    locale?: string
  } = {}
): string {
  const {
    showSymbol = true,
    showCode = false,
    locale = CURRENCY_CONFIG[currency]?.locale || 'en-US'
  } = options

  const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.USD
  const price = centsToPrice(priceInCents, currency)

  try {
    if (showSymbol && !showCode) {
      // Use Intl.NumberFormat for proper currency formatting
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: config.minimumFractionDigits,
        maximumFractionDigits: config.maximumFractionDigits,
      }).format(price)
    }

    // Custom formatting with symbol and/or code
    const formattedNumber = new Intl.NumberFormat(locale, {
      minimumFractionDigits: config.minimumFractionDigits,
      maximumFractionDigits: config.maximumFractionDigits,
    }).format(price)

    let result = formattedNumber

    if (showSymbol) {
      const symbol = CURRENCY_SYMBOLS[currency] || currency
      result = `${symbol}${formattedNumber}`
    }

    if (showCode) {
      result = `${result} ${currency}`
    }

    return result

  } catch (error) {
    console.error('Error formatting price:', error)
    // Fallback formatting
    const symbol = showSymbol ? (CURRENCY_SYMBOLS[currency] || currency) : ''
    const code = showCode ? ` ${currency}` : ''
    return `${symbol}${price.toFixed(currency === 'JPY' ? 0 : 2)}${code}`
  }
}

/**
 * Format price range (min - max)
 */
export function formatPriceRange(
  minPriceInCents: number,
  maxPriceInCents: number,
  currency: string = 'USD'
): string {
  const minFormatted = formatPrice(minPriceInCents, currency, { showSymbol: true })
  const maxFormatted = formatPrice(maxPriceInCents, currency, { showSymbol: false })
  
  return `${minFormatted} - ${maxFormatted}`
}

/**
 * Calculate discount percentage
 */
export function calculateDiscountPercentage(
  originalPrice: number,
  salePrice: number
): number {
  if (originalPrice <= 0 || salePrice >= originalPrice) {
    return 0
  }
  
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

/**
 * Format complete price with sale price and discount
 */
export function formatCompletePrice(
  price: number,
  currency: string = 'USD',
  salePrice?: number
): FormattedPrice {
  const original = formatPrice(price, currency)
  
  if (!salePrice || salePrice >= price) {
    return {
      original,
      hasDiscount: false,
    }
  }

  const sale = formatPrice(salePrice, currency)
  const discountPercentage = calculateDiscountPercentage(price, salePrice)

  return {
    original,
    sale,
    hasDiscount: true,
    discountPercentage,
  }
}

/**
 * Get currency symbol
 */
export function getCurrencySymbol(currency: string): string {
  return CURRENCY_SYMBOLS[currency] || currency
}

/**
 * Validate currency code
 */
export function isValidCurrency(currency: string): boolean {
  return Object.keys(CURRENCY_SYMBOLS).includes(currency)
}

/**
 * Get available currencies
 */
export function getAvailableCurrencies(): Array<{code: string; symbol: string; name: string}> {
  return [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  ]
}

/**
 * Convert between currencies (would need real exchange rates in production)
 */
export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  exchangeRate: number
): number {
  // In a real application, you'd fetch current exchange rates
  // This is a placeholder implementation
  const amountInDollars = centsToPrice(amount, fromCurrency)
  const convertedAmount = amountInDollars * exchangeRate
  return priceToCents(convertedAmount, toCurrency)
}

/**
 * Format price for display in product cards (shorter format)
 */
export function formatCardPrice(
  price: number,
  currency: string = 'USD',
  salePrice?: number
): string {
  if (salePrice && salePrice < price) {
    const saleFormatted = formatPrice(salePrice, currency)
    const originalFormatted = formatPrice(price, currency, { showSymbol: false })
    return `${saleFormatted} (was ${originalFormatted})`
  }
  
  return formatPrice(price, currency)
}

/**
 * Get price comparison text
 */
export function getPriceComparisonText(
  price: number,
  salePrice: number,
  currency: string = 'USD'
): string {
  const savings = price - salePrice
  const percentage = calculateDiscountPercentage(price, salePrice)
  const savingsFormatted = formatPrice(savings, currency)
  
  return `Save ${savingsFormatted} (${percentage}%)`
}