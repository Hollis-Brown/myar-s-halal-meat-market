import React from 'react'
import { Metadata } from 'next'
import { ProductsPageContent } from './products-page-content'

export const metadata: Metadata = {
  title: 'Products | Your Store',
  description: 'Browse our complete collection of products with advanced filtering and search capabilities.',
  openGraph: {
    title: 'Products | Your Store',
    description: 'Browse our complete collection of products with advanced filtering and search capabilities.',
    type: 'website',
  },
}

export default function ProductsPage() {
  return <ProductsPageContent />
}