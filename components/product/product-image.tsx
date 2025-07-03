'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { getProductImageUrl, getLQIP } from '@/lib/sanity/config'
import type { SanityImage } from '@/lib/sanity/types'

interface ProductImageProps {
  image: SanityImage
  alt?: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  onLoad?: () => void
  onError?: () => void
}

export function ProductImage({
  image,
  alt,
  width = 800,
  height = 800,
  className,
  priority = false,
  fill = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 85,
  placeholder = 'blur',
  onLoad,
  onError,
}: ProductImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  if (!image?.asset) {
    return (
      <div 
        className={cn(
          'flex items-center justify-center bg-muted text-muted-foreground',
          fill ? 'absolute inset-0' : `w-[${width}px] h-[${height}px]`,
          className
        )}
        aria-label="No image available"
      >
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    )
  }

  const imageUrl = getProductImageUrl(image, width, height)
  const blurDataURL = placeholder === 'blur' ? getLQIP(image) : undefined
  const imageAlt = alt || image.alt || 'Product image'

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
    onError?.()
  }

  if (hasError) {
    return (
      <div 
        className={cn(
          'flex items-center justify-center bg-muted text-muted-foreground',
          fill ? 'absolute inset-0' : `w-[${width}px] h-[${height}px]`,
          className
        )}
        aria-label="Failed to load image"
      >
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Loading overlay */}
      {isLoading && (
        <div 
          className={cn(
            'absolute inset-0 bg-muted animate-pulse flex items-center justify-center z-10',
            fill ? 'absolute inset-0' : `w-[${width}px] h-[${height}px]`
          )}
          aria-label="Loading image"
        >
          <svg
            className="w-8 h-8 text-muted-foreground animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}

      <Image
        src={imageUrl}
        alt={imageAlt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        quality={quality}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={cn(
          'object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  )
}

// Product image with overlay for interactive elements
export function ProductImageWithOverlay({
  image,
  alt,
  className,
  overlay,
  ...props
}: ProductImageProps & {
  overlay?: React.ReactNode
}) {
  return (
    <div className={cn('relative group', className)}>
      <ProductImage
        image={image}
        alt={alt}
        className="w-full h-full"
        {...props}
      />
      {overlay && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200">
          {overlay}
        </div>
      )}
    </div>
  )
}

// Product image skeleton for loading states
export function ProductImageSkeleton({
  width = 300,
  height = 300,
  className,
}: {
  width?: number
  height?: number
  className?: string
}) {
  return (
    <div
      className={cn(
        'animate-pulse bg-muted rounded-lg',
        className
      )}
      style={{ width, height }}
      aria-label="Loading product image"
    />
  )
}