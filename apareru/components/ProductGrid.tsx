'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, Star } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  colors: string[]
  sizes: string[]
  rating: number
  reviewCount: number
  isNew: boolean
  isSale: boolean
  inStock: boolean
}

interface ProductGridProps {
  filters: {
    category: string
    price: string
    color: string
    size: string
  }
}

export default function ProductGrid({ filters }: ProductGridProps) {
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // サンプル商品データ
  const products: Product[] = [
    {
      id: 1,
      name: 'ストリートフーディー',
      price: 8900,
      originalPrice: 12000,
      image: '/api/placeholder/400/500',
      category: 'tops',
      colors: ['black', 'white', 'gray'],
      sizes: ['S', 'M', 'L', 'XL'],
      rating: 4.5,
      reviewCount: 24,
      isNew: true,
      isSale: true,
      inStock: true,
    },
    {
      id: 2,
      name: 'オーバーサイズTシャツ',
      price: 4500,
      image: '/api/placeholder/400/500',
      category: 'tops',
      colors: ['black', 'white'],
      sizes: ['S', 'M', 'L'],
      rating: 4.8,
      reviewCount: 156,
      isNew: false,
      isSale: false,
      inStock: true,
    },
    {
      id: 3,
      name: 'カーゴパンツ',
      price: 12000,
      image: '/api/placeholder/400/500',
      category: 'bottoms',
      colors: ['black', 'olive'],
      sizes: ['28', '30', '32', '34'],
      rating: 4.3,
      reviewCount: 89,
      isNew: true,
      isSale: false,
      inStock: true,
    },
    {
      id: 4,
      name: 'デニムジャケット',
      price: 18000,
      image: '/api/placeholder/400/500',
      category: 'tops',
      colors: ['blue', 'black'],
      sizes: ['S', 'M', 'L', 'XL'],
      rating: 4.6,
      reviewCount: 67,
      isNew: false,
      isSale: true,
      inStock: true,
    },
    {
      id: 5,
      name: 'スニーカー',
      price: 15000,
      image: '/api/placeholder/400/500',
      category: 'shoes',
      colors: ['white', 'black'],
      sizes: ['25', '26', '27', '28', '29'],
      rating: 4.7,
      reviewCount: 134,
      isNew: true,
      isSale: false,
      inStock: true,
    },
    {
      id: 6,
      name: 'バケットハット',
      price: 3500,
      image: '/api/placeholder/400/500',
      category: 'accessories',
      colors: ['black', 'beige'],
      sizes: ['Free'],
      rating: 4.4,
      reviewCount: 45,
      isNew: false,
      isSale: false,
      inStock: false,
    },
  ]

  // フィルタリングとソート
  const filteredProducts = useMemo(() => {
    let filtered = products

    // カテゴリーフィルター
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category)
    }

    // 価格フィルター
    if (filters.price !== 'all') {
      const [min, max] = filters.price.split('-').map(Number)
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max
        } else {
          return product.price >= min
        }
      })
    }

    // 色フィルター
    if (filters.color !== 'all') {
      filtered = filtered.filter(product => product.colors.includes(filters.color))
    }

    // サイズフィルター
    if (filters.size !== 'all') {
      filtered = filtered.filter(product => product.sizes.includes(filters.size))
    }

    // ソート
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
      default:
        filtered.sort((a, b) => b.id - a.id)
        break
    }

    return filtered
  }, [filters, sortBy])

  return (
    <div>
      {/* ツールバー */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <span className="text-primary-600 dark:text-primary-400">
            {filteredProducts.length}件の商品
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {/* ソート */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field w-auto"
          >
            <option value="newest">新着順</option>
            <option value="price-low">価格の安い順</option>
            <option value="price-high">価格の高い順</option>
            <option value="rating">評価の高い順</option>
          </select>

          {/* 表示モード */}
          <div className="flex border border-primary-300 dark:border-primary-600">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-primary-900 text-white' : 'text-primary-600 dark:text-primary-400'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-primary-900 text-white' : 'text-primary-600 dark:text-primary-400'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 商品グリッド */}
      <div className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'space-y-6'
      }>
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group ${viewMode === 'list' ? 'flex' : ''}`}
          >
            <Link href={`/shop/${product.id}`}>
              <div className={`bg-white dark:bg-primary-800 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                viewMode === 'list' ? 'flex w-full' : ''
              }`}>
                {/* 商品画像 */}
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'w-48 h-48' : 'aspect-[4/5]'
                }`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* バッジ */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {product.isNew && (
                      <span className="bg-accent-500 text-white px-2 py-1 text-xs font-medium">
                        NEW
                      </span>
                    )}
                    {product.isSale && (
                      <span className="bg-red-500 text-white px-2 py-1 text-xs font-medium">
                        SALE
                      </span>
                    )}
                    {!product.inStock && (
                      <span className="bg-gray-500 text-white px-2 py-1 text-xs font-medium">
                        SOLD OUT
                      </span>
                    )}
                  </div>

                  {/* お気に入りボタン */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Heart size={16} className="text-primary-900" />
                  </motion.button>

                  {/* ホバー時のオーバーレイ */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-primary-900 px-4 py-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center space-x-2"
                    >
                      <ShoppingBag size={16} />
                      <span>カートに追加</span>
                    </motion.button>
                  </div>
                </div>

                {/* 商品情報 */}
                <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="mb-2">
                    <span className="text-sm text-primary-500 dark:text-primary-400">
                      {product.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-display font-semibold text-primary-900 dark:text-primary-100 mb-2 group-hover:text-accent-500 transition-colors duration-200">
                    {product.name}
                  </h3>
                  
                  {/* 評価 */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-primary-500 dark:text-primary-400">
                      ({product.reviewCount})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-primary-900 dark:text-primary-100">
                        ¥{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-primary-500 line-through">
                          ¥{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* ページネーション */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-primary-500 dark:text-primary-400 text-lg">
            該当する商品が見つかりませんでした
          </p>
        </div>
      )}
    </div>
  )
}
