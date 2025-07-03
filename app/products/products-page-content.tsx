'use client'

import React, { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ProductCard, ProductCardSkeleton, ProductGrid } from '@/components/product/product-card'
import { useProducts, useCategories, useProductSearch, useDebouncedSearch, useFavorites } from '@/hooks/use-products'
import { cn } from '@/lib/utils'
import { Search, Filter, SortAsc, SortDesc, Grid, List, Heart } from 'lucide-react'

type SortOption = 'newest' | 'oldest' | 'price-low' | 'price-high' | 'name-az' | 'name-za'
type ViewMode = 'grid' | 'list'

export function ProductsPageContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [showOnlyInStock, setShowOnlyInStock] = useState(false)
  const [showOnlyOnSale, setShowOnlyOnSale] = useState(false)

  const debouncedSearchTerm = useDebouncedSearch(searchTerm, 300)
  
  // Fetch data
  const { products: allProducts, isLoading: isLoadingProducts, error: productsError } = useProducts()
  const { categories, isLoading: isLoadingCategories } = useCategories()
  const { results: searchResults, isLoading: isSearching } = useProductSearch(
    debouncedSearchTerm, 
    debouncedSearchTerm.length >= 2
  )
  const { toggleFavorite, isFavorite } = useFavorites()

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let products = debouncedSearchTerm.length >= 2 ? searchResults : allProducts
    
    if (!products) return []

    // Filter by category
    if (selectedCategory !== 'all') {
      products = products.filter(product => 
        product.category?._id === selectedCategory
      )
    }

    // Filter by stock status
    if (showOnlyInStock) {
      products = products.filter(product => product.inStock)
    }

    // Filter by sale status
    if (showOnlyOnSale) {
      products = products.filter(product => 
        product.salePrice && product.salePrice < product.price
      )
    }

    // Sort products
    const sortedProducts = [...products].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        case 'price-low':
          const priceA = a.salePrice || a.price
          const priceB = b.salePrice || b.price
          return priceA - priceB
        case 'price-high':
          const priceA2 = a.salePrice || a.price
          const priceB2 = b.salePrice || b.price
          return priceB2 - priceA2
        case 'name-az':
          return a.title.localeCompare(b.title)
        case 'name-za':
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

    return sortedProducts
  }, [allProducts, searchResults, debouncedSearchTerm, selectedCategory, showOnlyInStock, showOnlyOnSale, sortBy])

  const isLoading = isLoadingProducts || isSearching
  const hasActiveFilters = selectedCategory !== 'all' || showOnlyInStock || showOnlyOnSale || debouncedSearchTerm.length > 0

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setShowOnlyInStock(false)
    setShowOnlyOnSale(false)
  }

  const handleAddToCart = (productId: string) => {
    // Implementation would depend on your cart system
    console.log('Add to cart:', productId)
  }

  const handleQuickView = (productId: string) => {
    // Implementation would open a modal or navigate to product page
    console.log('Quick view:', productId)
  }

  if (productsError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">Error Loading Products</h1>
          <p className="text-muted-foreground mb-4">{productsError.message}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Products</h1>
        <p className="text-muted-foreground">
          Discover our complete collection of premium products
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     <Input
             placeholder="Search products..."
             value={searchTerm}
             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
             className="pl-10"
           />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories?.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort Options */}
          <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name-az">Name: A to Z</SelectItem>
              <SelectItem value="name-za">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter Buttons */}
          <Button
            variant={showOnlyInStock ? "default" : "outline"}
            size="sm"
            onClick={() => setShowOnlyInStock(!showOnlyInStock)}
          >
            <Filter className="h-4 w-4 mr-2" />
            In Stock Only
          </Button>

          <Button
            variant={showOnlyOnSale ? "default" : "outline"}
            size="sm"
            onClick={() => setShowOnlyOnSale(!showOnlyOnSale)}
          >
            <Badge className="h-4 w-4 mr-2" />
            On Sale Only
          </Button>

          {/* View Mode Toggle */}
          <div className="flex ml-auto">
            <Button
              variant={viewMode === 'grid' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {debouncedSearchTerm && (
              <Badge variant="secondary">
                Search: "{debouncedSearchTerm}"
              </Badge>
            )}
            {selectedCategory !== 'all' && (
              <Badge variant="secondary">
                Category: {categories?.find(c => c._id === selectedCategory)?.title}
              </Badge>
            )}
            {showOnlyInStock && (
              <Badge variant="secondary">In Stock</Badge>
            )}
            {showOnlyOnSale && (
              <Badge variant="secondary">On Sale</Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {isLoading ? (
            'Loading products...'
          ) : (
            `Showing ${filteredAndSortedProducts.length} product${filteredAndSortedProducts.length !== 1 ? 's' : ''}`
          )}
        </p>
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            Loading...
          </div>
        )}
      </div>

      {/* Products Grid/List */}
      {isLoading ? (
        <ProductGrid className={cn(viewMode === 'list' && 'grid-cols-1 gap-4')}>
          {Array.from({ length: 12 }).map((_, index) => (
            <ProductCardSkeleton key={index} variant={viewMode === 'list' ? 'detailed' : 'default'} />
          ))}
        </ProductGrid>
      ) : filteredAndSortedProducts.length > 0 ? (
        <ProductGrid className={cn(viewMode === 'list' && 'grid-cols-1 gap-4')}>
          {filteredAndSortedProducts.map((product, index) => (
            <ProductCard
              key={product._id}
              product={product}
              priority={index < 8}
              variant={viewMode === 'list' ? 'detailed' : 'default'}
              onAddToCart={handleAddToCart}
              onAddToWishlist={toggleFavorite}
              onQuickView={handleQuickView}
              className={cn(
                viewMode === 'list' && 'flex-row items-center'
              )}
            />
          ))}
        </ProductGrid>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              {hasActiveFilters
                ? "Try adjusting your filters or search terms"
                : "No products are available at the moment"
              }
            </p>
            {hasActiveFilters && (
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}