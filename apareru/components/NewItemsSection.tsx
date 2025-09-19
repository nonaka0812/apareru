'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart } from 'lucide-react'

export default function NewItemsSection() {
  const newItems = [
    {
      id: 1,
      name: 'ストリートフーディー',
      price: 8900,
      originalPrice: 12000,
      image: '/api/placeholder/400/500',
      category: 'トップス',
      isNew: true,
    },
    {
      id: 2,
      name: 'カーディガン',
      price: 12000,
      originalPrice: null,
      image: '/api/placeholder/400/500',
      category: 'トップス',
      isNew: true,
    },
    {
      id: 3,
      name: 'デニムパンツ',
      price: 15000,
      originalPrice: null,
      image: '/api/placeholder/400/500',
      category: 'ボトムス',
      isNew: true,
    },
    {
      id: 4,
      name: 'スニーカー',
      price: 18000,
      originalPrice: null,
      image: '/api/placeholder/400/500',
      category: 'シューズ',
      isNew: true,
    },
  ]

  return (
    <section className="py-20 bg-white dark:bg-primary-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-900 dark:text-primary-100 mb-4">
            新作アイテム
          </h2>
          <p className="text-lg text-primary-600 dark:text-primary-400 max-w-2xl mx-auto">
            最新のストリートファッションアイテムを厳選してお届け
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {newItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <Link href={`/shop/${item.id}`}>
                <div className="relative overflow-hidden bg-white dark:bg-primary-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {/* 商品画像 */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* 新着バッジ */}
                    {item.isNew && (
                      <div className="absolute top-4 left-4 bg-accent-500 text-white px-3 py-1 text-sm font-medium">
                        NEW
                      </div>
                    )}

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
                        className="bg-white text-primary-900 px-6 py-3 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        詳細を見る
                      </motion.button>
                    </div>
                  </div>

                  {/* 商品情報 */}
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-sm text-primary-500 dark:text-primary-400">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-display font-semibold text-primary-900 dark:text-primary-100 mb-2">
                      {item.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-primary-900 dark:text-primary-100">
                        ¥{item.price.toLocaleString()}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-primary-500 line-through">
                          ¥{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2 mx-auto"
            >
              <span>すべての商品を見る</span>
              <ArrowRight size={20} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
