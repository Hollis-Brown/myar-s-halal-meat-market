'use client'

import React from 'react'
import useSWR from 'swr'
import { 
  getAllProducts,
  getFeaturedProducts,
  getProductBySlug,
  getProductsByCategory,
  searchProducts,
  getSaleProducts,
  getHomepageData,
  getRelatedProducts,
  getAllCategories,
} from '@/lib/sanity/api'
import { swrConfig } from '@/lib/sanity/config'
import type {
  ProductSummary,
  Product,
  Category,
  ProductsResponse,
  SanityError,
} from '@/lib/sanity/types'

/**
 * Hook for fetching all products
 */
export function useProducts() {
  const { data, error, isLoading, mutate } = useSWR<ProductSummary[], SanityError>(
    'products-all',
    getAllProducts,
    swrConfig
  )

  return {
    products: data,
    error,
    isLoading,
    refetch: mutate,
  }
}

/**
 * Hook for fetching featured products
 */
export function useFeaturedProducts() {
  const { data, error, isLoading, mutate } = useSWR<ProductSummary[], SanityError>(
    'products-featured',
    getFeaturedProducts,
    swrConfig
  )

  return {
    products: data,
    error,
    isLoading,
    refetch: mutate,
  }
}

/**
 * Hook for fetching a single product by slug
 */
export function useProduct(slug: string | null) {
  const { data, error, isLoading, mutate } = useSWR<Product | null, SanityError>(
    slug ? `product-${slug}` : null,
    slug ? () => getProductBySlug(slug) : null,
    swrConfig
  )

  return {
    product: data,
    error,
    isLoading,
    refetch: mutate,
  }
}

/**
 * Hook for fetching products by category
 */
export function useProductsByCategory(categorySlug: string | null) {
  const { data, error, isLoading, mutate } = useSWR<ProductSummary[], SanityError>(
    categorySlug ? `products-category-${categorySlug}` : null,
    categorySlug ? () => getProductsByCategory(categorySlug) : null,
    swrConfig
  )

  return {
    products: data,
    error,
    isLoading,
    refetch: mutate,
  }
}

/**
 * Hook for searching products
 */
export function useProductSearch(searchTerm: string, enabled: boolean = true) {
  const { data, error, isLoading, mutate } = useSWR<ProductSummary[], SanityError>(
    enabled && searchTerm ? `search-${searchTerm}` : null,
    enabled && searchTerm ? () => searchProducts(searchTerm) : null,
    {
      ...swrConfig,
      revalidateOnFocus: false,
      dedupingInterval: 1000, // Shorter deduping for search
    }
  )

  return {
    results: data,
    error,
    isLoading,
    refetch: mutate,
  }
}

/**
 * Hook for fetching sale products
 */
export function useSaleProducts() {
  const { data, error, isLoading, mutate } = useSWR<ProductSummary[], SanityError>(
    'products-sale',
    getSaleProducts,
    swrConfig
  )

  return {
    products: data,
    error,
    isLoading,
    refetch: mutate,
  }
}

/**
 * Hook for fetching related products
 */
export function useRelatedProducts(categoryId: string | null, currentProductId: string | null) {
  const { data, error, isLoading, mutate } = useSWR<ProductSummary[], SanityError>(
    categoryId && currentProductId ? `related-${categoryId}-${currentProductId}` : null,
    categoryId && currentProductId ? () => getRelatedProducts(categoryId, currentProductId) : null,
    swrConfig
  )

  return {
    products: data,
    error,
    isLoading,
    refetch: mutate,
  }
}

/**
 * Hook for fetching homepage data (featured products, categories, sale products)
 */
export function useHomepageData() {
  const { data, error, isLoading, mutate } = useSWR<{
    featuredProducts: ProductSummary[]
    categories: Category[]
    saleProducts: ProductSummary[]
  }, SanityError>(
    'homepage-data',
    getHomepageData,
    swrConfig
  )

  return {
    data,
    error,
    isLoading,
    refetch: mutate,
  }
}

/**
 * Hook for fetching all categories
 */
export function useCategories() {
  const { data, error, isLoading, mutate } = useSWR<Category[], SanityError>(
    'categories-all',
    getAllCategories,
    swrConfig
  )

  return {
    categories: data,
    error,
    isLoading,
    refetch: mutate,
  }
}

/**
 * Hook for managing product favorites/wishlist (client-side only)
 */
export function useFavorites() {
  const [favorites, setFavorites] = React.useState<string[]>([])

  // Load favorites from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem('product-favorites')
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch (error) {
        console.error('Error loading favorites:', error)
      }
    }
  }, [])

  // Save favorites to localStorage when changed
  React.useEffect(() => {
    localStorage.setItem('product-favorites', JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = React.useCallback((productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) ? prev : [...prev, productId]
    )
  }, [])

  const removeFromFavorites = React.useCallback((productId: string) => {
    setFavorites(prev => prev.filter(id => id !== productId))
  }, [])

  const toggleFavorite = React.useCallback((productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }, [])

  const isFavorite = React.useCallback((productId: string) => {
    return favorites.includes(productId)
  }, [favorites])

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
  }
}

/**
 * Hook for debounced search
 */
export function useDebouncedSearch(searchTerm: string, delay: number = 300) {
  const [debouncedTerm, setDebouncedTerm] = React.useState(searchTerm)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm)
    }, delay)

    return () => clearTimeout(timer)
  }, [searchTerm, delay])

  return debouncedTerm
}

/**
 * Hook for managing loading states across multiple requests
 */
export function useLoadingStates() {
  const [loadingStates, setLoadingStates] = React.useState<Record<string, boolean>>({})

  const setLoading = React.useCallback((key: string, loading: boolean) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: loading,
    }))
  }, [])

  const isLoading = React.useCallback((key: string) => {
    return loadingStates[key] || false
  }, [loadingStates])

  const isAnyLoading = React.useCallback(() => {
    return Object.values(loadingStates).some(Boolean)
  }, [loadingStates])

  return {
    setLoading,
    isLoading,
    isAnyLoading,
  }
}