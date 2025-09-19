'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductGrid from '@/components/ProductGrid'
import FilterSidebar from '@/components/FilterSidebar'

export default function ShopPage() {
  const [filters, setFilters] = useState({
    category: 'all',
    price: 'all',
    color: 'all',
    size: 'all',
  })

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-900 dark:text-primary-100 mb-4">
            SHOP
          </h1>
          <p className="text-lg text-primary-600 dark:text-primary-400">
            最新のストリートファッションアイテム
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>
          <div className="lg:w-3/4">
            <ProductGrid filters={filters} />
          </div>
        </div>
      </div>
    </div>
  )
}
