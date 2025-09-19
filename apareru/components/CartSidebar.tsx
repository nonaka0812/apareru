'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { state, dispatch } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // チェックアウト処理
    setTimeout(() => {
      setIsCheckingOut(false)
      onClose()
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* オーバーレイ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* サイドバー */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-primary-900 shadow-xl z-50 flex flex-col"
          >
            {/* ヘッダー */}
            <div className="flex items-center justify-between p-6 border-b border-primary-200 dark:border-primary-700">
              <h2 className="text-xl font-display font-semibold text-primary-900 dark:text-primary-100">
                ショッピングカート
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-primary-100 dark:hover:bg-primary-800 rounded-full transition-colors duration-200"
              >
                <X size={20} className="text-primary-600 dark:text-primary-400" />
              </motion.button>
            </div>

            {/* カートアイテム */}
            <div className="flex-1 overflow-y-auto p-6">
              {state.items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag size={48} className="mx-auto text-primary-300 dark:text-primary-600 mb-4" />
                  <p className="text-primary-500 dark:text-primary-400 mb-4">
                    カートに商品がありません
                  </p>
                  <Link href="/shop">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClose}
                      className="btn-primary"
                    >
                      ショッピングを始める
                    </motion.button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.color}-${item.size}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex space-x-4 p-4 bg-primary-50 dark:bg-primary-800 rounded-lg"
                    >
                      {/* 商品画像 */}
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>

                      {/* 商品情報 */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-primary-900 dark:text-primary-100 truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-primary-500 dark:text-primary-400">
                          カラー: {item.color} / サイズ: {item.size}
                        </p>
                        <p className="text-sm font-semibold text-primary-900 dark:text-primary-100 mt-1">
                          ¥{item.price.toLocaleString()}
                        </p>

                        {/* 数量調整 */}
                        <div className="flex items-center space-x-2 mt-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center border border-primary-300 dark:border-primary-600 rounded hover:bg-primary-100 dark:hover:bg-primary-700"
                          >
                            <Minus size={12} />
                          </motion.button>
                          <span className="text-sm text-primary-900 dark:text-primary-100 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center border border-primary-300 dark:border-primary-600 rounded hover:bg-primary-100 dark:hover:bg-primary-700"
                          >
                            <Plus size={12} />
                          </motion.button>
                        </div>
                      </div>

                      {/* 削除ボタン */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-primary-400 hover:text-red-500 transition-colors duration-200"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* フッター */}
            {state.items.length > 0 && (
              <div className="border-t border-primary-200 dark:border-primary-700 p-6 space-y-4">
                {/* 合計 */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                    合計
                  </span>
                  <span className="text-2xl font-bold text-primary-900 dark:text-primary-100">
                    ¥{state.total.toLocaleString()}
                  </span>
                </div>

                {/* 送料情報 */}
                <div className="text-sm text-primary-600 dark:text-primary-400">
                  {state.total >= 5000 ? (
                    <span className="text-green-600 dark:text-green-400">
                      ✓ 送料無料
                    </span>
                  ) : (
                    <span>
                      あと¥{(5000 - state.total).toLocaleString()}で送料無料
                    </span>
                  )}
                </div>

                {/* チェックアウトボタン */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full py-4 px-6 rounded-none font-medium transition-all duration-200 ${
                    isCheckingOut
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'btn-primary'
                  }`}
                >
                  {isCheckingOut ? '処理中...' : 'チェックアウト'}
                </motion.button>

                <Link href="/cart">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="w-full btn-secondary"
                  >
                    カートを表示
                  </motion.button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
