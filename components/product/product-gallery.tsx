'use client'

import React, { useState, useCallback } from 'react'
import { ProductImage } from './product-image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ProductGalleryProps } from '@/lib/sanity/types'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'

interface ExtendedProductGalleryProps extends ProductGalleryProps {
  className?: string
  showThumbnails?: boolean
  showZoom?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
}

export function ProductGallery({
  mainImage,
  galleryImages = [],
  productTitle,
  className,
  showThumbnails = true,
  showZoom = true,
  autoPlay = false,
  autoPlayInterval = 5000,
}: ExtendedProductGalleryProps) {
  // Combine main image with gallery images
  const allImages = [mainImage, ...galleryImages].filter(Boolean)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  // Auto-play functionality
  React.useEffect(() => {
    if (!autoPlay || allImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex((current) => 
        current === allImages.length - 1 ? 0 : current + 1
      )
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, allImages.length])

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((current) => 
      current === 0 ? allImages.length - 1 : current - 1
    )
  }, [allImages.length])

  const goToNext = useCallback(() => {
    setCurrentImageIndex((current) => 
      current === allImages.length - 1 ? 0 : current + 1
    )
  }, [allImages.length])

  const goToImage = useCallback((index: number) => {
    setCurrentImageIndex(index)
  }, [])

  const toggleZoom = useCallback(() => {
    setIsZoomed(!isZoomed)
  }, [isZoomed])

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isZoomed) {
        switch (event.key) {
          case 'Escape':
            setIsZoomed(false)
            break
          case 'ArrowLeft':
            goToPrevious()
            break
          case 'ArrowRight':
            goToNext()
            break
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isZoomed, goToPrevious, goToNext])

  const currentImage = allImages[currentImageIndex]

  if (!currentImage) {
    return (
      <div className={cn('aspect-square bg-muted rounded-lg flex items-center justify-center', className)}>
        <span className="text-muted-foreground">No images available</span>
      </div>
    )
  }

  return (
    <>
      <div className={cn('space-y-4', className)}>
        {/* Main Image Display */}
        <div className="relative group">
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <ProductImage
              image={currentImage}
              alt={`${productTitle} - Image ${currentImageIndex + 1}`}
              fill
              priority={currentImageIndex === 0}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Navigation Arrows */}
          {allImages.length > 1 && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background/80 backdrop-blur-sm"
                onClick={goToPrevious}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background/80 backdrop-blur-sm"
                onClick={goToNext}
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Zoom Button */}
          {showZoom && (
            <Button
              variant="outline"
              size="sm"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background/80 backdrop-blur-sm"
              onClick={toggleZoom}
              aria-label="Zoom image"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          )}

          {/* Image Indicator Dots */}
          {allImages.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-200',
                    index === currentImageIndex
                      ? 'bg-primary scale-125'
                      : 'bg-white/50 hover:bg-white/75'
                  )}
                  onClick={() => goToImage(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {showThumbnails && allImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {allImages.map((image, index) => (
              <button
                key={index}
                className={cn(
                  'flex-shrink-0 aspect-square w-16 h-16 rounded-lg border-2 overflow-hidden transition-all duration-200',
                  index === currentImageIndex
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-border hover:border-primary/50'
                )}
                onClick={() => goToImage(index)}
                aria-label={`View image ${index + 1}`}
              >
                <ProductImage
                  image={image}
                  alt={`${productTitle} thumbnail ${index + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={toggleZoom}
        >
          <div
            className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <Button
              variant="outline"
              size="sm"
              className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm"
              onClick={toggleZoom}
              aria-label="Close zoom"
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Zoomed Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <ProductImage
                image={currentImage}
                alt={`${productTitle} - Zoomed Image ${currentImageIndex + 1}`}
                width={1200}
                height={1200}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Navigation in Zoom Mode */}
            {allImages.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    goToPrevious()
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    goToNext()
                  }}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Image Counter */}
            {allImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                {currentImageIndex + 1} / {allImages.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

// Skeleton for loading state
export function ProductGallerySkeleton({
  showThumbnails = true,
  className,
}: {
  showThumbnails?: boolean
  className?: string
}) {
  return (
    <div className={cn('space-y-4', className)}>
      {/* Main Image Skeleton */}
      <div className="aspect-square bg-muted rounded-lg animate-pulse" />
      
      {/* Thumbnails Skeleton */}
      {showThumbnails && (
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-16 h-16 bg-muted rounded-lg animate-pulse"
            />
          ))}
        </div>
      )}
    </div>
  )
}