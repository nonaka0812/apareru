'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Instagram, ExternalLink } from 'lucide-react'

export default function InstagramFeed() {
  // サンプルのInstagram投稿データ
  const instagramPosts = [
    {
      id: 1,
      image: '/api/placeholder/300/300',
      caption: '新作コーディネート #apareru #streetfashion',
      likes: 1248,
      comments: 89,
      url: 'https://instagram.com/p/sample1',
    },
    {
      id: 2,
      image: '/api/placeholder/300/300',
      caption: 'ストリートスタイル #apareru #ootd',
      likes: 2156,
      comments: 156,
      url: 'https://instagram.com/p/sample2',
    },
    {
      id: 3,
      image: '/api/placeholder/300/300',
      caption: '最新コレクション #apareru #newcollection',
      likes: 3421,
      comments: 234,
      url: 'https://instagram.com/p/sample3',
    },
    {
      id: 4,
      image: '/api/placeholder/300/300',
      caption: 'スタイリングアイデア #apareru #fashion',
      likes: 1876,
      comments: 98,
      url: 'https://instagram.com/p/sample4',
    },
    {
      id: 5,
      image: '/api/placeholder/300/300',
      caption: 'カジュアルコーデ #apareru #casual',
      likes: 987,
      comments: 67,
      url: 'https://instagram.com/p/sample5',
    },
    {
      id: 6,
      image: '/api/placeholder/300/300',
      caption: 'トレンドアイテム #apareru #trend',
      likes: 1567,
      comments: 123,
      url: 'https://instagram.com/p/sample6',
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
            <Instagram className="text-pink-500" size={32} />
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-900 dark:text-primary-100">
              Instagram
            </h2>
          </div>
          <p className="text-lg text-primary-600 dark:text-primary-400 max-w-2xl mx-auto">
            最新のコーディネートやスタイリングをInstagramでチェック
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden"
            >
              <Link
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={post.image}
                    alt={post.caption}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* ホバー時のオーバーレイ */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Instagram size={32} className="mx-auto mb-2" />
                      <div className="text-sm font-medium">
                        {post.likes.toLocaleString()}いいね
                      </div>
                    </div>
                  </div>

                  {/* 外部リンクアイコン */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ExternalLink size={16} className="text-white" />
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
          className="text-center"
        >
          <Link
            href="https://instagram.com/apareru"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 text-lg font-medium flex items-center space-x-2 mx-auto"
            >
              <Instagram size={20} />
              <span>Instagramでフォロー</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
