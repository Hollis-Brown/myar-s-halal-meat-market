# Product Catalog with Sanity CMS and Next.js

A complete, production-ready product catalog implementation integrating Sanity CMS with Next.js, featuring advanced image optimization, comprehensive TypeScript support, and modern UI components.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Setup Instructions](#setup-instructions)
4. [Sanity Schema Design](#sanity-schema-design)
5. [GROQ Queries](#groq-queries)
6. [Frontend Components](#frontend-components)
7. [API Layer](#api-layer)
8. [Best Practices](#best-practices)
9. [Performance Optimization](#performance-optimization)
10. [Troubleshooting](#troubleshooting)

## Overview

This implementation provides a scalable, maintainable e-commerce product catalog that follows modern development best practices. It's designed for production use with proper error handling, loading states, accessibility, and SEO optimization.

### Technology Stack

- **Frontend**: Next.js 15+ with App Router
- **CMS**: Sanity CMS
- **Styling**: Tailwind CSS + Radix UI
- **State Management**: SWR for data fetching
- **TypeScript**: Full type safety throughout
- **Image Optimization**: Next.js Image + Sanity image transforms

## Features

### Core Features
- ✅ Complete product catalog with filtering and search
- ✅ Responsive image gallery with zoom functionality
- ✅ Advanced price formatting with currency support
- ✅ Rich text description rendering with Portable Text
- ✅ Real-time search with debouncing
- ✅ Category-based filtering
- ✅ Sale/discount badge system
- ✅ Stock status management
- ✅ Featured products highlighting

### Technical Features
- ✅ Full TypeScript implementation
- ✅ Progressive image loading with LQIP (Low Quality Image Placeholders)
- ✅ Comprehensive error handling
- ✅ Loading skeletons and states
- ✅ Accessibility (WCAG 2.1 compliant)
- ✅ SEO optimization with metadata
- ✅ Static generation support
- ✅ Edge caching with ISR

## Setup Instructions

### 1. Install Dependencies

```bash
npm install @sanity/client @sanity/image-url @portabletext/react @portabletext/types swr sanity @sanity/types
```

### 2. Environment Configuration

Create a `.env.local` file with your Sanity project details:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_api_token
```

### 3. Sanity Studio Setup

Create your Sanity schemas by adding the product and category schemas to your studio configuration:

```typescript
// sanity.config.ts
import { defineConfig } from 'sanity'
import { schemaTypes } from './schemas'

export default defineConfig({
  // ... other config
  schema: {
    types: schemaTypes,
  },
})
```

### 4. Add to Your Next.js App

The components are designed to work with the Next.js App Router. Simply import and use them in your pages:

```typescript
// app/products/page.tsx
import { ProductsPageContent } from './products-page-content'

export default function ProductsPage() {
  return <ProductsPageContent />
}
```

## Sanity Schema Design

### Product Schema Features

```typescript
// Key features of the product schema:
- title: Product name with validation
- slug: Auto-generated from title
- description: Rich text with Portable Text
- mainImage: Primary product image with alt text
- galleryImages: Additional product images
- price/salePrice: Flexible pricing in cents
- currency: Multi-currency support
- category: Reference to category document
- inStock: Inventory tracking
- featured: Homepage highlighting
```

### Category Schema Features

```typescript
// Category schema includes:
- title: Category name
- slug: URL-friendly identifier
- description: Category description
- image: Category thumbnail
```

### Best Practices Used

1. **Validation**: Comprehensive field validation
2. **SEO**: Proper slug generation and meta fields
3. **Images**: Hotspot and crop configuration
4. **Accessibility**: Required alt text for all images
5. **Performance**: Optimized field selection in projections

## GROQ Queries

### Query Architecture

Our GROQ queries are designed for performance and maintainability:

```typescript
// Reusable projections
const imageProjection = `{
  _type,
  asset->{_id, url, metadata},
  alt,
  caption,
  hotspot,
  crop
}`

// Example product query
const getProductBySlugQuery = `
*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  mainImage ${imageProjection},
  galleryImages[] ${imageProjection},
  price,
  salePrice,
  currency,
  category->{_id, title, slug},
  inStock,
  featured
}
`
```

### Query Features

- **Image Optimization**: Includes metadata for Next.js Image
- **Reference Resolution**: Automatically resolves category references
- **Draft Filtering**: Excludes draft documents in production
- **Performance**: Minimal field selection for listings

## Frontend Components

### Component Architecture

```
components/
├── product/
│   ├── product-card.tsx          # Product listing card
│   ├── product-price.tsx         # Price display with discounts
│   ├── product-image.tsx         # Optimized image component
│   ├── product-gallery.tsx       # Image gallery with zoom
│   └── product-description.tsx   # Portable text renderer
├── ui/
│   ├── skeleton.tsx              # Loading skeletons
│   ├── input.tsx                 # Form inputs
│   └── select.tsx                # Dropdown selects
```

### Key Components

#### ProductCard
```typescript
<ProductCard
  product={product}
  onAddToCart={handleAddToCart}
  onAddToWishlist={handleWishlist}
  variant="detailed"
  showQuickActions={true}
/>
```

#### ProductGallery
```typescript
<ProductGallery
  mainImage={product.mainImage}
  galleryImages={product.galleryImages}
  productTitle={product.title}
  showZoom={true}
  showThumbnails={true}
/>
```

#### ProductPrice
```typescript
<ProductPrice
  price={product.price}
  salePrice={product.salePrice}
  currency={product.currency}
  showSavings={true}
  size="lg"
/>
```

## API Layer

### Service Architecture

```typescript
// Centralized API service
export async function getProductBySlug(slug: string): Promise<Product | null> {
  return fetchFromSanity<Product | null>(
    getProductBySlugQuery,
    { slug },
    300 // 5 minute cache
  )
}
```

### Features

- **Error Handling**: Consistent error handling across all API calls
- **Caching**: Configurable cache strategies with SWR
- **Type Safety**: Full TypeScript support
- **Performance**: Optimized queries with minimal data transfer

### Custom Hooks

```typescript
// Easy-to-use React hooks
const { products, isLoading, error } = useProducts()
const { product } = useProduct(slug)
const { results } = useProductSearch(searchTerm)
```

## Best Practices

### Performance Optimization

1. **Image Optimization**
   ```typescript
   // Automatic WebP conversion with fallbacks
   const imageUrl = getProductImageUrl(image, 800, 800, 'webp')
   ```

2. **Progressive Loading**
   ```typescript
   // LQIP (Low Quality Image Placeholder)
   const placeholder = getLQIP(image)
   ```

3. **Efficient Queries**
   ```typescript
   // Minimal field selection for listings
   const productSummaryProjection = `{
     _id, title, slug, mainImage, price, salePrice
   }`
   ```

### Accessibility

- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance

### SEO Optimization

```typescript
// Dynamic metadata generation
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProductMetadata(params.slug)
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      images: [product.mainImage.asset.url],
    },
  }
}
```

### Error Handling

```typescript
// Graceful error handling with user feedback
if (error) {
  return (
    <div className="text-center">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <Button onClick={() => window.location.reload()}>
        Try Again
      </Button>
    </div>
  )
}
```

## Currency Support

### Multi-Currency Implementation

```typescript
// Comprehensive currency support
export function formatPrice(priceInCents: number, currency: string) {
  return new Intl.NumberFormat(CURRENCY_CONFIG[currency].locale, {
    style: 'currency',
    currency: currency,
  }).format(centsToPrice(priceInCents, currency))
}
```

### Supported Currencies

- USD (US Dollar)
- EUR (Euro)
- GBP (British Pound)
- CAD (Canadian Dollar)
- AUD (Australian Dollar)
- JPY (Japanese Yen)

## Performance Optimization

### Caching Strategy

```typescript
// SWR configuration for optimal performance
export const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: isProduction ? 300000 : 0, // 5 minutes in production
  dedupingInterval: 2000,
  errorRetryCount: 3,
}
```

### Image Optimization

```typescript
// Responsive image URLs for different screen sizes
export function getResponsiveImageUrls(source: SanityImageSource) {
  return {
    mobile: builder.image(source).width(640).format('webp').url(),
    tablet: builder.image(source).width(768).format('webp').url(),
    desktop: builder.image(source).width(1024).format('webp').url(),
  }
}
```

### Static Generation

```typescript
// Generate static paths for better performance
export async function generateStaticParams() {
  const paths = await getProductPaths()
  return paths.map((slug) => ({ slug }))
}
```

## Troubleshooting

### Common Issues

1. **Images not loading**
   - Check Sanity project ID and dataset configuration
   - Verify image assets exist in Sanity
   - Check CORS settings in Sanity

2. **TypeScript errors**
   - Ensure all Sanity packages are installed
   - Check that schema types match interface definitions
   - Verify environment variables are properly typed

3. **Performance issues**
   - Review GROQ query efficiency
   - Check image optimization settings
   - Verify caching configuration

### Debug Tools

```typescript
// Health check for Sanity connection
const { status, message } = await healthCheck()
console.log(`Sanity status: ${status} - ${message}`)
```

### Environment Validation

```typescript
// Validate required environment variables
if (!config.projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
}
```

## Advanced Usage

### Custom Product Filters

```typescript
// Implement custom filtering logic
const filteredProducts = useMemo(() => {
  return products?.filter(product => {
    if (priceRange) {
      const price = product.salePrice || product.price
      return price >= priceRange.min && price <= priceRange.max
    }
    return true
  })
}, [products, priceRange])
```

### Real-time Updates

```typescript
// Listen for real-time updates from Sanity
useEffect(() => {
  const subscription = sanityClient
    .listen('*[_type == "product"]')
    .subscribe(update => {
      mutate() // Refresh SWR cache
    })
  
  return () => subscription.unsubscribe()
}, [mutate])
```

## Production Checklist

- [ ] Environment variables configured
- [ ] Sanity schemas deployed
- [ ] Image optimization enabled
- [ ] Error boundaries implemented
- [ ] Performance monitoring setup
- [ ] SEO metadata configured
- [ ] Accessibility testing completed
- [ ] Cache strategies validated

## Support

For issues and questions:

1. Check the troubleshooting section above
2. Review Sanity documentation: https://www.sanity.io/docs
3. Next.js documentation: https://nextjs.org/docs
4. TypeScript best practices: https://www.typescriptlang.org/docs/

This implementation provides a solid foundation for any e-commerce product catalog with room for customization and extension based on specific business requirements.