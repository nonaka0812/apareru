'use client'

import { motion } from 'framer-motion'
import { X, Filter } from 'lucide-react'

interface FilterSidebarProps {
  filters: {
    category: string
    price: string
    color: string
    size: string
  }
  setFilters: (filters: any) => void
}

export default function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const categories = [
    { value: 'all', label: 'すべて' },
    { value: 'tops', label: 'トップス' },
    { value: 'bottoms', label: 'ボトムス' },
    { value: 'shoes', label: 'シューズ' },
    { value: 'accessories', label: 'アクセサリー' },
  ]

  const priceRanges = [
    { value: 'all', label: 'すべて' },
    { value: '0-5000', label: '¥5,000以下' },
    { value: '5000-10000', label: '¥5,000 - ¥10,000' },
    { value: '10000-20000', label: '¥10,000 - ¥20,000' },
    { value: '20000-', label: '¥20,000以上' },
  ]

  const colors = [
    { value: 'all', label: 'すべて' },
    { value: 'black', label: 'ブラック' },
    { value: 'white', label: 'ホワイト' },
    { value: 'gray', label: 'グレー' },
    { value: 'blue', label: 'ブルー' },
    { value: 'red', label: 'レッド' },
    { value: 'green', label: 'グリーン' },
  ]

  const sizes = [
    { value: 'all', label: 'すべて' },
    { value: 'XS', label: 'XS' },
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' },
    { value: '25', label: '25' },
    { value: '26', label: '26' },
    { value: '27', label: '27' },
    { value: '28', label: '28' },
    { value: '29', label: '29' },
    { value: 'Free', label: 'Free' },
  ]

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev: any) => ({
      ...prev,
      [key]: value,
    }))
  }

  const clearFilters = () => {
    setFilters({
      category: 'all',
      price: 'all',
      color: 'all',
      size: 'all',
    })
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== 'all')

  return (
    <div className="bg-white dark:bg-primary-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-display font-semibold text-primary-900 dark:text-primary-100 flex items-center">
          <Filter size={20} className="mr-2" />
          フィルター
        </h3>
        {hasActiveFilters && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearFilters}
            className="text-sm text-accent-500 hover:text-accent-600 transition-colors duration-200"
          >
            クリア
          </motion.button>
        )}
      </div>

      <div className="space-y-6">
        {/* カテゴリー */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="text-md font-medium text-primary-900 dark:text-primary-100 mb-3">
            カテゴリー
          </h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category.value}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="category"
                  value={category.value}
                  checked={filters.category === category.value}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-4 h-4 text-accent-500 focus:ring-accent-500 focus:ring-2"
                />
                <span className="text-primary-700 dark:text-primary-300">
                  {category.label}
                </span>
              </label>
            ))}
          </div>
        </motion.div>

        {/* 価格帯 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h4 className="text-md font-medium text-primary-900 dark:text-primary-100 mb-3">
            価格帯
          </h4>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label
                key={range.value}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="price"
                  value={range.value}
                  checked={filters.price === range.value}
                  onChange={(e) => handleFilterChange('price', e.target.value)}
                  className="w-4 h-4 text-accent-500 focus:ring-accent-500 focus:ring-2"
                />
                <span className="text-primary-700 dark:text-primary-300">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        </motion.div>

        {/* 色 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h4 className="text-md font-medium text-primary-900 dark:text-primary-100 mb-3">
            色
          </h4>
          <div className="space-y-2">
            {colors.map((color) => (
              <label
                key={color.value}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="color"
                  value={color.value}
                  checked={filters.color === color.value}
                  onChange={(e) => handleFilterChange('color', e.target.value)}
                  className="w-4 h-4 text-accent-500 focus:ring-accent-500 focus:ring-2"
                />
                <span className="text-primary-700 dark:text-primary-300">
                  {color.label}
                </span>
              </label>
            ))}
          </div>
        </motion.div>

        {/* サイズ */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h4 className="text-md font-medium text-primary-900 dark:text-primary-100 mb-3">
            サイズ
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <label
                key={size.value}
                className="flex items-center justify-center space-x-2 cursor-pointer p-2 border border-primary-200 dark:border-primary-600 rounded hover:bg-primary-50 dark:hover:bg-primary-700 transition-colors duration-200"
              >
                <input
                  type="radio"
                  name="size"
                  value={size.value}
                  checked={filters.size === size.value}
                  onChange={(e) => handleFilterChange('size', e.target.value)}
                  className="w-4 h-4 text-accent-500 focus:ring-accent-500 focus:ring-2"
                />
                <span className="text-sm text-primary-700 dark:text-primary-300">
                  {size.label}
                </span>
              </label>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
