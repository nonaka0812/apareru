'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

export default function NewsSection() {
  const newsItems = [
    {
      id: 1,
      title: '2024年春夏コレクション発売開始',
      excerpt: '新作アイテムが続々と入荷中。ストリート感あふれるデザインをお楽しみください。',
      image: '/api/placeholder/400/250',
      date: '2024-01-15',
      category: 'ニュース',
    },
    {
      id: 2,
      title: 'Instagramでフォローして最新情報をチェック',
      excerpt: 'SNSで最新のコーディネートやスタイリング情報を発信中。',
      image: '/api/placeholder/400/250',
      date: '2024-01-10',
      category: 'SNS',
    },
    {
      id: 3,
      title: 'サイズガイドを更新しました',
      excerpt: 'より正確なサイズ感をお伝えするため、サイズガイドを刷新しました。',
      image: '/api/placeholder/400/250',
      date: '2024-01-05',
      category: 'お知らせ',
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

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
            ブランドニュース
          </h2>
          <p className="text-lg text-primary-600 dark:text-primary-400 max-w-2xl mx-auto">
            最新のコレクション情報やブランドニュースをお届け
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/news/${item.id}`}>
                <div className="bg-white dark:bg-primary-800 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* 画像 */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* カテゴリーバッジ */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent-500 text-white px-3 py-1 text-sm font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* コンテンツ */}
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-sm text-primary-500 dark:text-primary-400 mb-3">
                      <Calendar size={16} />
                      <span>{formatDate(item.date)}</span>
                    </div>
                    
                    <h3 className="text-xl font-display font-semibold text-primary-900 dark:text-primary-100 mb-3 group-hover:text-accent-500 transition-colors duration-200">
                      {item.title}
                    </h3>
                    
                    <p className="text-primary-600 dark:text-primary-400 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/news">
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2 mx-auto"
            >
              <span>すべてのニュースを見る</span>
              <ArrowRight size={20} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
