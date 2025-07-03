import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'

// Sanity configuration
export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  // Only include token on server side for mutations
  token: process.env.SANITY_API_TOKEN,
}

// Validate required environment variables
if (!config.projectId) {
  throw new Error('Missing required environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID')
}

// Create Sanity client
export const sanityClient = createClient(config)

// Create read-only client for public use
export const sanityReadClient = createClient({
  ...config,
  token: undefined, // Remove token for read-only operations
  useCdn: true, // Always use CDN for read operations
})

// Image URL builder
const builder = imageUrlBuilder(sanityReadClient)

/**
 * Generate optimized image URLs with fallback handling
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

/**
 * Generate responsive image URLs for different screen sizes
 */
export function getResponsiveImageUrls(source: SanityImageSource) {
  if (!source) {
    return {
      mobile: '',
      tablet: '',
      desktop: '',
      original: '',
    }
  }

  const baseBuilder = builder.image(source)
  
  return {
    mobile: baseBuilder.width(640).height(640).format('webp').url(),
    tablet: baseBuilder.width(768).height(768).format('webp').url(),
    desktop: baseBuilder.width(1024).height(1024).format('webp').url(),
    original: baseBuilder.format('webp').url(),
    // Fallback JPEGs for browsers that don't support WebP
    mobileFallback: baseBuilder.width(640).height(640).format('jpg').url(),
    tabletFallback: baseBuilder.width(768).height(768).format('jpg').url(),
    desktopFallback: baseBuilder.width(1024).height(1024).format('jpg').url(),
  }
}

/**
 * Generate optimized product image with specific dimensions
 */
export function getProductImageUrl(
  source: SanityImageSource,
  width: number = 800,
  height: number = 800,
  format: 'webp' | 'jpg' | 'png' = 'webp'
) {
  if (!source) return ''
  
  return builder
    .image(source)
    .width(width)
    .height(height)
    .format(format)
    .quality(85)
    .url()
}

/**
 * Generate low quality placeholder for progressive loading
 */
export function getLQIP(source: SanityImageSource) {
  if (!source) return ''
  
  return builder
    .image(source)
    .width(20)
    .height(20)
    .blur(50)
    .format('jpg')
    .quality(50)
    .url()
}

// Environment configuration helper
export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelopment = process.env.NODE_ENV === 'development'

// Cache configuration for SWR
export const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: isProduction ? 300000 : 0, // 5 minutes in production, no refresh in dev
  dedupingInterval: 2000,
  errorRetryCount: 3,
  errorRetryInterval: 5000,
}