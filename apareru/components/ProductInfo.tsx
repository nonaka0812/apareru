'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Share2, ShoppingBag, Star, Truck, Shield, RotateCcw } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  colors: Array<{ name: string; label: string; hex: string }>
  sizes: string[]
  category: string
  tags: string[]
  inStock: boolean
}

interface ProductInfoProps {
  product: Product
  selectedColor: string
  setSelectedColor: (color: string) => void
  selectedSize: string
  setSelectedSize: (size: string) => void
  quantity: number
  setQuantity: (quantity: number) => void
}

export default function ProductInfo({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
}: ProductInfoProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const { dispatch } = useCart()

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: '/api/placeholder/400/500', // 実際の画像URLに置き換え
        color: selectedColor,
        size: selectedSize,
      },
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log('シェアがキャンセルされました')
      }
    } else {
      // フォールバック: URLをクリップボードにコピー
      navigator.clipboard.writeText(window.location.href)
      alert('URLをクリップボードにコピーしました')
    }
  }

  return (
    <div className="space-y-6">
      {/* 商品名と価格 */}
      <div>
        <div className="mb-2">
          <span className="text-sm text-primary-500 dark:text-primary-400">
            {product.category}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-900 dark:text-primary-100 mb-4">
          {product.name}
        </h1>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-primary-900 dark:text-primary-100">
              ¥{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-primary-500 line-through">
                ¥{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          {product.originalPrice && (
            <span className="bg-accent-500 text-white px-3 py-1 text-sm font-medium">
              セール中
            </span>
          )}
        </div>

        {/* 評価 */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className="text-yellow-400 fill-current"
              />
            ))}
          </div>
          <span className="text-sm text-primary-600 dark:text-primary-400">
            (24件のレビュー)
          </span>
        </div>
      </div>

      {/* 商品説明 */}
      <div>
        <h3 className="text-lg font-display font-semibold text-primary-900 dark:text-primary-100 mb-3">
          商品説明
        </h3>
        <p className="text-primary-700 dark:text-primary-300 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* カラー選択 */}
      <div>
        <h3 className="text-lg font-display font-semibold text-primary-900 dark:text-primary-100 mb-3">
          カラー
        </h3>
        <div className="flex space-x-3">
          {product.colors.map((color) => (
            <motion.button
              key={color.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedColor(color.name)}
              className={`relative w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                selectedColor === color.name
                  ? 'border-accent-500 ring-2 ring-accent-200'
                  : 'border-primary-300 dark:border-primary-600 hover:border-primary-500'
              }`}
              style={{ backgroundColor: color.hex }}
            >
              {selectedColor === color.name && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
        <p className="text-sm text-primary-600 dark:text-primary-400 mt-2">
          選択中: {product.colors.find(c => c.name === selectedColor)?.label}
        </p>
      </div>

      {/* サイズ選択 */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-display font-semibold text-primary-900 dark:text-primary-100">
            サイズ
          </h3>
          <button
            onClick={() => setShowSizeGuide(!showSizeGuide)}
            className="text-sm text-accent-500 hover:text-accent-600 transition-colors duration-200"
          >
            サイズガイド
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {product.sizes.map((size) => (
            <motion.button
              key={size}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSize(size)}
              className={`p-3 text-center border-2 rounded transition-all duration-200 ${
                selectedSize === size
                  ? 'border-accent-500 bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300'
                  : 'border-primary-300 dark:border-primary-600 hover:border-primary-500 text-primary-700 dark:text-primary-300'
              }`}
            >
              {size}
            </motion.button>
          ))}
        </div>
      </div>

      {/* 数量選択 */}
      <div>
        <h3 className="text-lg font-display font-semibold text-primary-900 dark:text-primary-100 mb-3">
          数量
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-primary-300 dark:border-primary-600 rounded">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 hover:bg-primary-50 dark:hover:bg-primary-700 transition-colors duration-200"
            >
              -
            </motion.button>
            <span className="px-4 py-2 text-primary-900 dark:text-primary-100">
              {quantity}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 hover:bg-primary-50 dark:hover:bg-primary-700 transition-colors duration-200"
            >
              +
            </motion.button>
          </div>
        </div>
      </div>

      {/* アクションボタン */}
      <div className="space-y-4">
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-none font-medium transition-all duration-200 ${
              product.inStock
                ? 'btn-primary'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingBag size={20} />
            <span>{product.inStock ? 'カートに追加' : '在庫切れ'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`p-4 border-2 rounded-none transition-all duration-200 ${
              isWishlisted
                ? 'border-accent-500 bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300'
                : 'border-primary-300 dark:border-primary-600 hover:border-primary-500 text-primary-700 dark:text-primary-300'
            }`}
          >
            <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="p-4 border-2 border-primary-300 dark:border-primary-600 hover:border-primary-500 text-primary-700 dark:text-primary-300 rounded-none transition-all duration-200"
          >
            <Share2 size={20} />
          </motion.button>
        </div>

        {/* 配送・返品情報 */}
        <div className="space-y-3 pt-4 border-t border-primary-200 dark:border-primary-700">
          <div className="flex items-center space-x-3 text-sm text-primary-600 dark:text-primary-400">
            <Truck size={16} />
            <span>送料無料（¥5,000以上のご注文）</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-primary-600 dark:text-primary-400">
            <Shield size={16} />
            <span>30日間の返品保証</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-primary-600 dark:text-primary-400">
            <RotateCcw size={16} />
            <span>無料サイズ交換</span>
          </div>
        </div>
      </div>

      {/* タグ */}
      <div>
        <h3 className="text-lg font-display font-semibold text-primary-900 dark:text-primary-100 mb-3">
          タグ
        </h3>
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary-100 dark:bg-primary-700 text-primary-700 dark:text-primary-300 text-sm rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
