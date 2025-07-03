import {sanityReadClient} from './config'
import {
  getAllProductsQuery,
  getFeaturedProductsQuery,
  getProductsWithPaginationQuery,
  getProductBySlugQuery,
  getProductsByCategoryQuery,
  searchProductsQuery,
  getSaleProductsQuery,
  getRelatedProductsQuery,
  getAllCategoriesQuery,
  getCategoryBySlugQuery,
  getProductPathsQuery,
  getCategoryPathsQuery,
  getFilteredProductsQuery,
  getHomepageDataQuery,
  getProductMetadataQuery,
} from './queries'
import type {
  Product,
  ProductSummary,
  Category,
  ProductsResponse,
  SanityError,
  GroqProductResult,
} from './types'

/**
 * Base error handler for Sanity API calls
 */
function handleSanityError(error: unknown): SanityError {
  console.error('Sanity API Error:', error)
  
  if (error instanceof Error) {
    return {
      message: error.message,
      details: error.stack,
      statusCode: 500,
    }
  }
  
  return {
    message: 'An unknown error occurred',
    statusCode: 500,
  }
}

/**
 * Generic fetch function with error handling
 */
async function fetchFromSanity<T>(
  query: string,
  params: Record<string, unknown> = {},
  revalidate?: number
): Promise<T> {
  try {
    const result = await sanityReadClient.fetch<T>(query, params, {
      cache: revalidate ? 'force-cache' : 'no-store',
      next: revalidate ? { revalidate } : undefined,
    })
    return result
  } catch (error) {
    throw handleSanityError(error)
  }
}

/**
 * Get all products (for listings)
 */
export async function getAllProducts(): Promise<ProductSummary[]> {
  return fetchFromSanity<ProductSummary[]>(getAllProductsQuery, {}, 300) // 5 min cache
}

/**
 * Get featured products for homepage
 */
export async function getFeaturedProducts(): Promise<ProductSummary[]> {
  return fetchFromSanity<ProductSummary[]>(getFeaturedProductsQuery, {}, 600) // 10 min cache
}

/**
 * Get products with pagination
 */
export async function getProductsWithPagination(
  page: number = 1,
  limit: number = 12
): Promise<ProductsResponse> {
  const start = (page - 1) * limit
  const end = start + limit

  return fetchFromSanity<ProductsResponse>(
    getProductsWithPaginationQuery,
    { start, end },
    300
  )
}

/**
 * Get single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = await fetchFromSanity<GroqProductResult | null>(
    getProductBySlugQuery,
    { slug },
    300
  )

  return product as Product | null
}

/**
 * Get products by category
 */
export async function getProductsByCategory(
  categorySlug: string
): Promise<ProductSummary[]> {
  return fetchFromSanity<ProductSummary[]>(
    getProductsByCategoryQuery,
    { categorySlug },
    300
  )
}

/**
 * Search products
 */
export async function searchProducts(searchTerm: string): Promise<ProductSummary[]> {
  if (!searchTerm || searchTerm.length < 2) {
    return []
  }

  return fetchFromSanity<ProductSummary[]>(
    searchProductsQuery,
    { searchTerm: searchTerm.toLowerCase() }
  )
}

/**
 * Get products on sale
 */
export async function getSaleProducts(): Promise<ProductSummary[]> {
  return fetchFromSanity<ProductSummary[]>(getSaleProductsQuery, {}, 300)
}

/**
 * Get related products
 */
export async function getRelatedProducts(
  categoryId: string,
  currentProductId: string
): Promise<ProductSummary[]> {
  return fetchFromSanity<ProductSummary[]>(
    getRelatedProductsQuery,
    { categoryId, currentProductId },
    300
  )
}

/**
 * Get all categories
 */
export async function getAllCategories(): Promise<Category[]> {
  return fetchFromSanity<Category[]>(getAllCategoriesQuery, {}, 600) // 10 min cache
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return fetchFromSanity<Category | null>(
    getCategoryBySlugQuery,
    { slug },
    300
  )
}

/**
 * Get product paths for static generation
 */
export async function getProductPaths(): Promise<string[]> {
  return fetchFromSanity<string[]>(getProductPathsQuery, {}, 3600) // 1 hour cache
}

/**
 * Get category paths for static generation
 */
export async function getCategoryPaths(): Promise<string[]> {
  return fetchFromSanity<string[]>(getCategoryPathsQuery, {}, 3600) // 1 hour cache
}

/**
 * Get filtered products with advanced filtering
 */
export async function getFilteredProducts({
  page = 1,
  limit = 12,
  minPrice,
  maxPrice,
  inStockOnly = false,
  categoryId,
}: {
  page?: number
  limit?: number
  minPrice?: number
  maxPrice?: number
  inStockOnly?: boolean
  categoryId?: string
}): Promise<ProductsResponse> {
  const start = (page - 1) * limit
  const end = start + limit

  return fetchFromSanity<ProductsResponse>(
    getFilteredProductsQuery,
    {
      start,
      end,
      minPrice: minPrice ? minPrice * 100 : null, // Convert to cents
      maxPrice: maxPrice ? maxPrice * 100 : null, // Convert to cents
      inStockOnly,
      categoryId: categoryId || null,
    },
    180 // 3 min cache for filtered results
  )
}

/**
 * Get homepage data (featured products, categories, sale products)
 */
export async function getHomepageData(): Promise<{
  featuredProducts: ProductSummary[]
  categories: Category[]
  saleProducts: ProductSummary[]
}> {
  return fetchFromSanity<{
    featuredProducts: ProductSummary[]
    categories: Category[]
    saleProducts: ProductSummary[]
  }>(getHomepageDataQuery, {}, 600) // 10 min cache
}

/**
 * Get product metadata for SEO and Open Graph
 */
export async function getProductMetadata(slug: string): Promise<{
  title: string
  description: string
  mainImage?: {
    asset: {
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt?: string
  }
  price: number
  salePrice?: number
  currency: string
  inStock: boolean
  category: {
    title: string
  }
  publishedAt: string
} | null> {
  return fetchFromSanity(getProductMetadataQuery, { slug }, 600)
}

/**
 * Revalidate specific data (for webhooks or admin actions)
 */
export async function revalidateProduct(slug: string): Promise<void> {
  try {
    // In a real application, you might want to revalidate specific pages
    // This would depend on your deployment setup (Vercel, Netlify, etc.)
    console.log(`Revalidating product: ${slug}`)
  } catch (error) {
    console.error('Error revalidating product:', error)
  }
}

/**
 * Health check for Sanity connection
 */
export async function healthCheck(): Promise<{ status: 'ok' | 'error'; message: string }> {
  try {
    await sanityReadClient.fetch('*[_type == "product"][0]._id')
    return {
      status: 'ok',
      message: 'Sanity connection is healthy',
    }
  } catch (error) {
    return {
      status: 'error',
      message: `Sanity connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}