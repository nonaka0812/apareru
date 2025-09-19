'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag } from 'lucide-react'

interface RelatedProductsProps {
  category: string
  currentProductId: string
}

export default function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
  // サンプルの関連商品データ
  const relatedProducts = [
    {
      id: 2,
      name: 'オーバーサイズTシャツ',
      price: 4500,
      image: '/api/placeholder/300/400',
      category: 'トップス',
      isNew: false,
      isSale: false,
    },
    {
      id: 3,
      name: 'カーゴパンツ',
      price: 12000,
      image: '/api/placeholder/300/400',
      category: 'ボトムス',
      isNew: true,
      isSale: false,
    },
    {
      id: 4,
      name: 'デニムジャケット',
      price: 18000,
      originalPrice: 22000,
      image: '/api/placeholder/300/400',
      category: 'トップス',
      isNew: false,
      isSale: true,
    },
    {
      id: 5,
      name: 'スニーカー',
      price: 15000,
      image: '/api/placeholder/300/400',
      category: 'シューズ',
      isNew: true,
      isSale: false,
    },
  ]

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 dark:text-primary-100 mb-4">
          関連商品
        </h2>
        <p className="text-lg text-primary-600 dark:text-primary-400">
          一緒にコーディネートしたいアイテム
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <Link href={`/shop/${product.id}`}>
              <div className="bg-white dark:bg-primary-800 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* 商品画像 */}
                <div className="relative aspect-[3/4] overflow-hidden">
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
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-sm text-primary-500 dark:text-primary-400">
                      {product.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-display font-semibold text-primary-900 dark:text-primary-100 mb-2 group-hover:text-accent-500 transition-colors duration-200">
                    {product.name}
                  </h3>
                  
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
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
