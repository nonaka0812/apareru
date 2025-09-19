'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

export default function CartPage() {
  const { state, dispatch } = useCart()

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/shop" className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-100 transition-colors duration-200 mb-6">
            <ArrowLeft size={20} />
            <span>ショップに戻る</span>
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-900 dark:text-primary-100 mb-4">
            ショッピングカート
          </h1>
          <p className="text-lg text-primary-600 dark:text-primary-400">
            {state.itemCount}点の商品
          </p>
        </motion.div>

        {state.items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-20"
          >
            <ShoppingBag size={80} className="mx-auto text-primary-300 dark:text-primary-600 mb-6" />
            <h2 className="text-2xl font-display font-semibold text-primary-900 dark:text-primary-100 mb-4">
              カートに商品がありません
            </h2>
            <p className="text-primary-600 dark:text-primary-400 mb-8">
              お気に入りの商品をカートに追加してください
            </p>
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
              >
                ショッピングを始める
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* カートアイテム一覧 */}
            <div className="lg:col-span-2 space-y-6">
              {state.items.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.color}-${item.size}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-primary-800 rounded-lg shadow-lg p-6"
                >
                  <div className="flex space-x-6">
                    {/* 商品画像 */}
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>

                    {/* 商品情報 */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-display font-semibold text-primary-900 dark:text-primary-100 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-primary-600 dark:text-primary-400 mb-2">
                        カラー: {item.color} / サイズ: {item.size}
                      </p>
                      <p className="text-2xl font-bold text-primary-900 dark:text-primary-100 mb-4">
                        ¥{item.price.toLocaleString()}
                      </p>

                      {/* 数量調整 */}
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border border-primary-300 dark:border-primary-600 rounded hover:bg-primary-100 dark:hover:bg-primary-700"
                          >
                            <Minus size={16} />
                          </motion.button>
                          <span className="text-lg text-primary-900 dark:text-primary-100 min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-primary-300 dark:border-primary-600 rounded hover:bg-primary-100 dark:hover:bg-primary-700"
                          >
                            <Plus size={16} />
                          </motion.button>
                        </div>

                        <div className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                          小計: ¥{(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* 削除ボタン */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeItem(item.id)}
                      className="p-3 text-primary-400 hover:text-red-500 transition-colors duration-200"
                    >
                      <Trash2 size={20} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}

              {/* カートを空にするボタン */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearCart}
                  className="text-primary-500 hover:text-red-500 transition-colors duration-200"
                >
                  カートを空にする
                </motion.button>
              </motion.div>
            </div>

            {/* 注文サマリー */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white dark:bg-primary-800 rounded-lg shadow-lg p-6 sticky top-8"
              >
                <h3 className="text-xl font-display font-semibold text-primary-900 dark:text-primary-100 mb-6">
                  注文サマリー
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-primary-600 dark:text-primary-400">
                      商品合計 ({state.itemCount}点)
                    </span>
                    <span className="text-primary-900 dark:text-primary-100">
                      ¥{state.total.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-primary-600 dark:text-primary-400">
                      送料
                    </span>
                    <span className="text-primary-900 dark:text-primary-100">
                      {state.total >= 5000 ? '無料' : '¥500'}
                    </span>
                  </div>

                  <div className="border-t border-primary-200 dark:border-primary-700 pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-primary-900 dark:text-primary-100">
                        合計
                      </span>
                      <span className="text-primary-900 dark:text-primary-100">
                        ¥{(state.total + (state.total >= 5000 ? 0 : 500)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 送料無料までの金額 */}
                {state.total < 5000 && (
                  <div className="bg-accent-50 dark:bg-accent-900/20 rounded-lg p-4 mb-6">
                    <p className="text-sm text-accent-700 dark:text-accent-300">
                      あと¥{(5000 - state.total).toLocaleString()}で送料無料！
                    </p>
                  </div>
                )}

                {/* チェックアウトボタン */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary text-lg py-4 mb-4"
                >
                  チェックアウト
                </motion.button>

                <Link href="/shop">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-secondary text-lg py-4"
                  >
                    買い物を続ける
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
