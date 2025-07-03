'use client'

import React from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ProductImage, ProductImageSkeleton } from './product-image'
import { ProductPrice, ProductPriceSkeleton } from './product-price'
import { cn } from '@/lib/utils'
import type { ProductCardProps } from '@/lib/sanity/types'
import { ShoppingCart, Heart, Eye } from 'lucide-react'

interface ExtendedProductCardProps extends ProductCardProps {
  showQuickActions?: boolean
  showStockStatus?: boolean
  variant?: 'default' | 'minimal' | 'detailed'
  onAddToCart?: (productId: string) => void
  onAddToWishlist?: (productId: string) => void
  onQuickView?: (productId: string) => void
}

export function ProductCard({
  product,
  priority = false,
  className,
  showQuickActions = true,
  showStockStatus = true,
  variant = 'default',
  onAddToCart,
  onAddToWishlist,
  onQuickView,
}: ExtendedProductCardProps) {
  const isOutOfStock = !product.inStock
  const hasDiscount = product.salePrice && product.salePrice < product.price

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isOutOfStock) {
      onAddToCart?.(product._id)
    }
  }

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToWishlist?.(product._id)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onQuickView?.(product._id)
  }

  return (
    <article
      className={cn(
        'group relative bg-card rounded-lg border border-border overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-primary/20',
        isOutOfStock && 'opacity-75',
        className
      )}
    >
      <Link 
        href={`/products/${product.slug.current}`}
        className="block"
        aria-label={`View ${product.title}`}
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <ProductImage
            image={product.mainImage}
            alt={`${product.title} product image`}
            fill
            priority={priority}
            className="transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {hasDiscount && (
              <Badge variant="destructive" className="text-xs font-medium">
                Sale
              </Badge>
            )}
            {product.featured && (
              <Badge variant="secondary" className="text-xs font-medium">
                Featured
              </Badge>
            )}
            {isOutOfStock && (
              <Badge variant="outline" className="text-xs font-medium bg-background/80">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          {showQuickActions && (
            <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {onAddToWishlist && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
                  onClick={handleAddToWishlist}
                  aria-label="Add to wishlist"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              )}
              {onQuickView && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
                  onClick={handleQuickView}
                  aria-label="Quick view"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}

          {/* Quick Add to Cart - Bottom overlay */}
          {showQuickActions && onAddToCart && !isOutOfStock && (
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                size="sm"
                className="w-full text-white bg-primary/90 hover:bg-primary"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          {/* Title */}
          <h3 className="font-semibold text-sm line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          {/* Stock Status */}
          {showStockStatus && (
            <div className="flex items-center gap-2 text-xs">
              <div
                className={cn(
                  'w-2 h-2 rounded-full',
                  product.inStock ? 'bg-green-500' : 'bg-red-500'
                )}
                aria-hidden="true"
              />
              <span className={cn(
                'font-medium',
                product.inStock ? 'text-green-600' : 'text-red-600'
              )}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          )}

          {/* Price */}
          <div className="pt-1">
            <ProductPrice
              price={product.price}
              salePrice={product.salePrice}
              currency={product.currency}
              size="sm"
              showSavings={variant === 'detailed'}
            />
          </div>

          {/* Additional Info for Detailed Variant */}
          {variant === 'detailed' && (
            <div className="pt-2 space-y-2">
              {!showQuickActions && onAddToCart && (
                <Button
                  size="sm"
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              )}
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}

// Product Card Skeleton for loading states
export function ProductCardSkeleton({ 
  className,
  variant = 'default' 
}: { 
  className?: string
  variant?: 'default' | 'minimal' | 'detailed'
}) {
  return (
    <div className={cn('bg-card rounded-lg border border-border overflow-hidden', className)}>
      {/* Image Skeleton */}
      <ProductImageSkeleton className="aspect-square w-full" />
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-2">
        {/* Title */}
        <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
        
        {/* Stock Status */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-muted rounded-full animate-pulse" />
          <div className="h-3 bg-muted rounded w-16 animate-pulse" />
        </div>
        
        {/* Price */}
        <ProductPriceSkeleton size="sm" />
        
        {/* Button for detailed variant */}
        {variant === 'detailed' && (
          <div className="pt-2">
            <div className="h-8 bg-muted rounded w-full animate-pulse" />
          </div>
        )}
      </div>
    </div>
  )
}

// Product Grid component for layout
export function ProductGrid({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div 
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6',
        className
      )}
    >
      {children}
    </div>
  )
}