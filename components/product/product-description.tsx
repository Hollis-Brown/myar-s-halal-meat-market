'use client'

import React from 'react'
import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import {cn} from '@/lib/utils'

interface ProductDescriptionProps {
  description: PortableTextBlock[]
  className?: string
  variant?: 'default' | 'compact' | 'detailed'
}

// Custom components for portable text rendering
const portableTextComponents = {
  block: {
    normal: ({children}: {children?: React.ReactNode}) => (
      <p className="mb-4 text-muted-foreground leading-relaxed">{children}</p>
    ),
    h2: ({children}: {children?: React.ReactNode}) => (
      <h2 className="text-2xl font-bold mb-4 text-foreground">{children}</h2>
    ),
    h3: ({children}: {children?: React.ReactNode}) => (
      <h3 className="text-xl font-semibold mb-3 text-foreground">{children}</h3>
    ),
    h4: ({children}: {children?: React.ReactNode}) => (
      <h4 className="text-lg font-semibold mb-2 text-foreground">{children}</h4>
    ),
    blockquote: ({children}: {children?: React.ReactNode}) => (
      <blockquote className="border-l-4 border-primary pl-4 py-2 mb-4 italic text-muted-foreground bg-muted/30 rounded-r">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}: {children?: React.ReactNode}) => (
      <ul className="mb-4 space-y-2 list-disc list-inside text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({children}: {children?: React.ReactNode}) => (
      <ol className="mb-4 space-y-2 list-decimal list-inside text-muted-foreground">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({children}: {children?: React.ReactNode}) => (
      <li className="ml-4">{children}</li>
    ),
    number: ({children}: {children?: React.ReactNode}) => (
      <li className="ml-4">{children}</li>
    ),
  },
  marks: {
    strong: ({children}: {children?: React.ReactNode}) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({children}: {children?: React.ReactNode}) => (
      <em className="italic">{children}</em>
    ),
    underline: ({children}: {children?: React.ReactNode}) => (
      <span className="underline">{children}</span>
    ),
    code: ({children}: {children?: React.ReactNode}) => (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground">
        {children}
      </code>
    ),
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode
      value?: {href?: string}
    }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
      >
        {children}
      </a>
    ),
  },
}

// Compact variant components with smaller spacing
const compactPortableTextComponents = {
  ...portableTextComponents,
  block: {
    ...portableTextComponents.block,
    normal: ({children}: {children?: React.ReactNode}) => (
      <p className="mb-2 text-sm text-muted-foreground leading-relaxed">{children}</p>
    ),
    h2: ({children}: {children?: React.ReactNode}) => (
      <h2 className="text-lg font-bold mb-2 text-foreground">{children}</h2>
    ),
    h3: ({children}: {children?: React.ReactNode}) => (
      <h3 className="text-base font-semibold mb-2 text-foreground">{children}</h3>
    ),
    h4: ({children}: {children?: React.ReactNode}) => (
      <h4 className="text-sm font-semibold mb-1 text-foreground">{children}</h4>
    ),
    blockquote: ({children}: {children?: React.ReactNode}) => (
      <blockquote className="border-l-2 border-primary pl-3 py-1 mb-2 italic text-sm text-muted-foreground bg-muted/30 rounded-r">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}: {children?: React.ReactNode}) => (
      <ul className="mb-2 space-y-1 list-disc list-inside text-sm text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({children}: {children?: React.ReactNode}) => (
      <ol className="mb-2 space-y-1 list-decimal list-inside text-sm text-muted-foreground">
        {children}
      </ol>
    ),
  },
}

export function ProductDescription({
  description,
  className,
  variant = 'default',
}: ProductDescriptionProps) {
  if (!description || description.length === 0) {
    return (
      <div className={cn('text-muted-foreground italic', className)}>
        No description available for this product.
      </div>
    )
  }

  const components = variant === 'compact' ? compactPortableTextComponents : portableTextComponents

  return (
    <div 
      className={cn(
        'prose prose-sm max-w-none',
        variant === 'compact' && 'prose-xs',
        variant === 'detailed' && 'prose-base',
        className
      )}
    >
      <PortableText
        value={description}
        components={components}
      />
    </div>
  )
}

// Component for showing a truncated description with "read more" functionality
export function ProductDescriptionPreview({
  description,
  maxLength = 150,
  showReadMore = true,
  className,
  onReadMore,
}: {
  description: PortableTextBlock[]
  maxLength?: number
  showReadMore?: boolean
  className?: string
  onReadMore?: () => void
}) {
  if (!description || description.length === 0) {
    return null
  }

  // Extract plain text from portable text for preview
  const getPlainText = (blocks: PortableTextBlock[]): string => {
    return blocks
      .map((block) => {
        if (block._type === 'block' && block.children) {
          return block.children
            .map((child: any) => child.text || '')
            .join('')
        }
        return ''
      })
      .join(' ')
      .trim()
  }

  const plainText = getPlainText(description)
  const isTruncated = plainText.length > maxLength
  const displayText = isTruncated ? `${plainText.slice(0, maxLength)}...` : plainText

  return (
    <div className={cn('text-sm text-muted-foreground leading-relaxed', className)}>
      <p>{displayText}</p>
      {isTruncated && showReadMore && (
        <button
          onClick={onReadMore}
          className="mt-2 text-primary hover:text-primary/80 text-sm font-medium underline underline-offset-2 transition-colors"
          aria-label="Read full description"
        >
          Read more
        </button>
      )}
    </div>
  )
}

// Skeleton for loading state
export function ProductDescriptionSkeleton({
  lines = 3,
  className,
}: {
  lines?: number
  className?: string
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({length: lines}).map((_, index) => (
        <div
          key={index}
          className={cn(
            'h-4 bg-muted rounded animate-pulse',
            index === lines - 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  )
}

// Component for rendering description in a modal or expanded view
export function ProductDescriptionModal({
  description,
  title,
  onClose,
  isOpen,
}: {
  description: PortableTextBlock[]
  title: string
  onClose: () => void
  isOpen: boolean
}) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-background rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close description"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          <ProductDescription
            description={description}
            variant="detailed"
          />
        </div>
      </div>
    </div>
  )
}