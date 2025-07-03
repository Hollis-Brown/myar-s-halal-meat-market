'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { formatCompletePrice, getPriceComparisonText } from '@/lib/utils/currency'
import { cn } from '@/lib/utils'
import type { ProductPriceProps } from '@/lib/sanity/types'

interface ExtendedProductPriceProps extends ProductPriceProps {
  showSavings?: boolean
  size?: 'sm' | 'md' | 'lg'
  orientation?: 'horizontal' | 'vertical'
}

export function ProductPrice({
  price,
  salePrice,
  currency,
  className,
  showSavings = true,
  size = 'md',
  orientation = 'horizontal',
}: ExtendedProductPriceProps) {
  const formattedPrice = formatCompletePrice(price, currency, salePrice)
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  const saleSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm', 
    lg: 'text-base',
  }

  const isVertical = orientation === 'vertical'

  if (!formattedPrice.hasDiscount) {
    return (
      <div className={cn('flex items-center', className)}>
        <span 
          className={cn(
            'font-semibold text-foreground',
            sizeClasses[size]
          )}
          aria-label={`Price: ${formattedPrice.original}`}
        >
          {formattedPrice.original}
        </span>
      </div>
    )
  }

  return (
    <div 
      className={cn(
        'flex items-center gap-2',
        isVertical && 'flex-col items-start gap-1',
        className
      )}
    >
      {/* Sale Price */}
      <span 
        className={cn(
          'font-semibold text-foreground',
          sizeClasses[size]
        )}
        aria-label={`Sale price: ${formattedPrice.sale}`}
      >
        {formattedPrice.sale}
      </span>

      {/* Original Price (crossed out) */}
      <span 
        className={cn(
          'font-medium text-muted-foreground line-through decoration-2',
          saleSizeClasses[size]
        )}
        aria-label={`Original price: ${formattedPrice.original}`}
      >
        {formattedPrice.original}
      </span>

      {/* Discount Badge */}
      {formattedPrice.discountPercentage && formattedPrice.discountPercentage > 0 && (
        <Badge 
          variant="destructive" 
          className={cn(
            'text-xs font-medium',
            size === 'sm' && 'text-[10px] px-1 py-0.5',
            size === 'lg' && 'text-sm px-2 py-1'
          )}
          aria-label={`${formattedPrice.discountPercentage}% discount`}
        >
          -{formattedPrice.discountPercentage}%
        </Badge>
      )}

      {/* Savings Text */}
      {showSavings && formattedPrice.hasDiscount && salePrice && (
        <span 
          className={cn(
            'text-xs text-green-600 font-medium',
            isVertical && 'mt-1'
          )}
          aria-label={getPriceComparisonText(price, salePrice, currency)}
        >
          {getPriceComparisonText(price, salePrice, currency)}
        </span>
      )}
    </div>
  )
}

// Skeleton for loading state
export function ProductPriceSkeleton({ 
  size = 'md',
  className 
}: { 
  size?: 'sm' | 'md' | 'lg'
  className?: string 
}) {
  const skeletonSizes = {
    sm: 'h-4 w-16',
    md: 'h-5 w-20',
    lg: 'h-6 w-24',
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn('animate-pulse bg-muted rounded', skeletonSizes[size])} />
      <div className={cn('animate-pulse bg-muted rounded', 'h-3 w-12')} />
      <div className="animate-pulse bg-muted rounded h-4 w-8" />
    </div>
  )
}