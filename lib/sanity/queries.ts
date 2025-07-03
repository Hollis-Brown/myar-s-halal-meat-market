// Base image projection for consistent image data
const imageProjection = `{
  _type,
  asset->{
    _id,
    url,
    metadata {
      dimensions,
      lqip
    }
  },
  alt,
  caption,
  hotspot,
  crop
}`

// Base category projection
const categoryProjection = `{
  _id,
  title,
  slug,
  description,
  image ${imageProjection}
}`

// Minimal product projection for listings
const productSummaryProjection = `{
  _id,
  _type,
  title,
  slug,
  mainImage ${imageProjection},
  price,
  salePrice,
  currency,
  inStock,
  featured,
  publishedAt
}`

// Full product projection for detail pages
const productDetailProjection = `{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  description,
  mainImage ${imageProjection},
  galleryImages[] ${imageProjection},
  price,
  salePrice,
  currency,
  category-> ${categoryProjection},
  tags,
  inStock,
  featured,
  publishedAt
}`

/**
 * Get all products with pagination and filtering
 */
export const getAllProductsQuery = `
*[_type == "product" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
  ${productSummaryProjection}
}
`

/**
 * Get featured products for homepage
 */
export const getFeaturedProductsQuery = `
*[_type == "product" && featured == true && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...8] {
  ${productSummaryProjection}
}
`

/**
 * Get products with pagination
 */
export const getProductsWithPaginationQuery = `{
  "products": *[_type == "product" && !(_id in path("drafts.**"))] | order(publishedAt desc) [$start...$end] {
    ${productSummaryProjection}
  },
  "total": count(*[_type == "product" && !(_id in path("drafts.**"))])
}`

/**
 * Get single product by slug
 */
export const getProductBySlugQuery = `
*[_type == "product" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
  ${productDetailProjection}
}
`

/**
 * Get products by category
 */
export const getProductsByCategoryQuery = `
*[_type == "product" && category->slug.current == $categorySlug && !(_id in path("drafts.**"))] | order(publishedAt desc) {
  ${productSummaryProjection}
}
`

/**
 * Get products by search term
 */
export const searchProductsQuery = `
*[_type == "product" && !(_id in path("drafts.**")) && (
  title match $searchTerm + "*" ||
  pt::text(description) match $searchTerm + "*" ||
  category->title match $searchTerm + "*"
)] | order(publishedAt desc) {
  ${productSummaryProjection}
}
`

/**
 * Get products on sale
 */
export const getSaleProductsQuery = `
*[_type == "product" && defined(salePrice) && salePrice < price && !(_id in path("drafts.**"))] | order(publishedAt desc) {
  ${productSummaryProjection}
}
`

/**
 * Get related products (same category, excluding current product)
 */
export const getRelatedProductsQuery = `
*[_type == "product" && category._ref == $categoryId && _id != $currentProductId && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...4] {
  ${productSummaryProjection}
}
`

/**
 * Get all categories
 */
export const getAllCategoriesQuery = `
*[_type == "category" && !(_id in path("drafts.**"))] | order(title asc) {
  ${categoryProjection}
}
`

/**
 * Get category by slug
 */
export const getCategoryBySlugQuery = `
*[_type == "category" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
  ${categoryProjection}
}
`

/**
 * Get product paths for static generation
 */
export const getProductPathsQuery = `
*[_type == "product" && defined(slug.current) && !(_id in path("drafts.**"))][].slug.current
`

/**
 * Get category paths for static generation
 */
export const getCategoryPathsQuery = `
*[_type == "category" && defined(slug.current) && !(_id in path("drafts.**"))][].slug.current
`

/**
 * Get products with filters (price range, in stock, etc.)
 */
export const getFilteredProductsQuery = `{
  "products": *[_type == "product" && !(_id in path("drafts.**"))
    ${`&& ($minPrice == null || price >= $minPrice)`}
    ${`&& ($maxPrice == null || price <= $maxPrice)`}
    ${`&& ($inStockOnly == false || inStock == true)`}
    ${`&& ($categoryId == null || category._ref == $categoryId)`}
  ] | order(coalesce(salePrice, price) asc) [$start...$end] {
    ${productSummaryProjection}
  },
  "total": count(*[_type == "product" && !(_id in path("drafts.**"))
    ${`&& ($minPrice == null || price >= $minPrice)`}
    ${`&& ($maxPrice == null || price <= $maxPrice)`}
    ${`&& ($inStockOnly == false || inStock == true)`}
    ${`&& ($categoryId == null || category._ref == $categoryId)`}
  ])
}`

/**
 * Get homepage data (featured products + categories)
 */
export const getHomepageDataQuery = `{
  "featuredProducts": *[_type == "product" && featured == true && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...8] {
    ${productSummaryProjection}
  },
  "categories": *[_type == "category" && !(_id in path("drafts.**"))] | order(title asc) [0...6] {
    ${categoryProjection}
  },
  "saleProducts": *[_type == "product" && defined(salePrice) && salePrice < price && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...4] {
    ${productSummaryProjection}
  }
}`

/**
 * Get product metadata for SEO
 */
export const getProductMetadataQuery = `
*[_type == "product" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
  title,
  "description": pt::text(description)[0...160],
  mainImage {
    asset->{
      url,
      metadata {
        dimensions
      }
    },
    alt
  },
  price,
  salePrice,
  currency,
  inStock,
  category->{
    title
  },
  publishedAt
}
`