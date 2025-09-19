'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { TrendingUp, Star } from 'lucide-react'

export default function RankingSection() {
  const rankingItems = [
    {
      id: 1,
      name: 'オーバーサイズTシャツ',
      price: 4500,
      image: '/api/placeholder/300/400',
      category: 'トップス',
      rank: 1,
      sales: 156,
    },
    {
      id: 2,
      name: 'カーゴパンツ',
      price: 12000,
      image: '/api/placeholder/300/400',
      category: 'ボトムス',
      rank: 2,
      sales: 134,
    },
    {
      id: 3,
      name: 'バケットハット',
      price: 3500,
      image: '/api/placeholder/300/400',
      category: 'アクセサリー',
      rank: 3,
      sales: 98,
    },
  ]

  return (
    <section className="py-20 bg-primary-50 dark:bg-primary-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <TrendingUp className="text-accent-500" size={32} />
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-900 dark:text-primary-100">
              ランキング
            </h2>
          </div>
          <p className="text-lg text-primary-600 dark:text-primary-400 max-w-2xl mx-auto">
            今最も人気のアイテムTOP3
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rankingItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              <Link href={`/shop/${item.id}`}>
                <div className="relative bg-white dark:bg-primary-900 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* ランキングバッジ */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                      item.rank === 1 ? 'bg-yellow-500' :
                      item.rank === 2 ? 'bg-gray-400' :
                      'bg-amber-600'
                    }`}>
                      {item.rank}
                    </div>
                  </div>

                  {/* 商品画像 */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
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
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-primary-500 dark:text-primary-400">
                        {item.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-400 fill-current" size={16} />
                        <span className="text-sm text-primary-600 dark:text-primary-400">
                          {item.sales}件の売上
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-display font-semibold text-primary-900 dark:text-primary-100 mb-2">
                      {item.name}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary-900 dark:text-primary-100">
                        ¥{item.price.toLocaleString()}
                      </span>
                      <div className="text-sm text-accent-500 font-medium">
                        #{item.rank}位
                      </div>
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
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/shop?sort=popular">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4"
            >
              人気商品をもっと見る
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
