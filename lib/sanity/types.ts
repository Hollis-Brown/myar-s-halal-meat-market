import type {PortableTextBlock} from '@portabletext/types'

// Sanity Image Type with URL builder support
export interface SanityImageAsset {
  _id: string
  url: string
  metadata: {
    dimensions: {
      width: number
      height: number
    }
    lqip?: string
  }
}

export interface SanityImage {
  _type: 'image'
  asset: SanityImageAsset
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

// Category Type
export interface Category {
  _id: string
  _type: 'category'
  title: string
  slug: {
    current: string
  }
  description?: string
  image?: SanityImage
}

// Product Type
export interface Product {
  _id: string
  _type: 'product'
  _createdAt: string
  _updatedAt: string
  title: string
  slug: {
    current: string
  }
  description: PortableTextBlock[]
  mainImage: SanityImage
  galleryImages?: SanityImage[]
  price: number
  salePrice?: number
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY'
  category: Category
  tags?: string[]
  inStock: boolean
  featured: boolean
  publishedAt: string
}

// Partial product type for listings
export interface ProductSummary {
  _id: string
  title: string
  slug: {
    current: string
  }
  mainImage: SanityImage
  price: number
  salePrice?: number
  currency: string
  inStock: boolean
  featured: boolean
  publishedAt: string
  category?: {
    _id: string
    title: string
    slug: {
      current: string
    }
  }
}

// API Response Types
export interface ProductsResponse {
  products: Product[]
  total: number
}

export interface ProductDetailResponse {
  product: Product | null
}

// Price formatting helper type
export interface FormattedPrice {
  original: string
  sale?: string
  hasDiscount: boolean
  discountPercentage?: number
}

// Error types
export interface SanityError {
  message: string
  details?: string
  statusCode?: number
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'error' | 'success'

// Utility types for component props
export interface ProductCardProps {
  product: ProductSummary
  priority?: boolean
  className?: string
}

export interface ProductGalleryProps {
  mainImage: SanityImage
  galleryImages?: SanityImage[]
  productTitle: string
}

export interface ProductPriceProps {
  price: number
  salePrice?: number
  currency: string
  className?: string
}

// GROQ Query Result Types
export interface GroqProductResult {
  _id: string
  _type: 'product'
  title: string
  slug: {
    current: string
  }
  description: PortableTextBlock[]
  mainImage: {
    _type: 'image'
    asset: {
      _id: string
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
        lqip?: string
      }
    }
    alt?: string
    caption?: string
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
    crop?: {
      top: number
      bottom: number
      left: number
      right: number
    }
  }
  galleryImages?: Array<{
    _type: 'image'
    asset: {
      _id: string
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
        lqip?: string
      }
    }
    alt?: string
    caption?: string
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
    crop?: {
      top: number
      bottom: number
      left: number
      right: number
    }
  }>
  price: number
  salePrice?: number
  currency: string
  category: {
    _id: string
    title: string
    slug: {
      current: string
    }
  }
  tags?: string[]
  inStock: boolean
  featured: boolean
  publishedAt: string
}