'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, User, Search, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCart } from '@/contexts/CartContext'
import CartSidebar from '@/components/CartSidebar'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { state } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Lookbook', href: '/lookbook' },
    { name: 'News', href: '/news' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-primary-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* ロゴ */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl md:text-3xl font-display font-bold text-primary-900 dark:text-primary-100"
            >
              APARERU
            </motion.div>
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-primary-700 dark:text-primary-300 hover:text-primary-900 dark:hover:text-primary-100 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* 右側のアイコン */}
          <div className="flex items-center space-x-4">
            {/* 検索 */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-primary-700 dark:text-primary-300 hover:text-primary-900 dark:hover:text-primary-100 transition-colors duration-200"
            >
              <Search size={20} />
            </motion.button>

            {/* ダークモード切り替え */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-primary-700 dark:text-primary-300 hover:text-primary-900 dark:hover:text-primary-100 transition-colors duration-200"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* ユーザー */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-primary-700 dark:text-primary-300 hover:text-primary-900 dark:hover:text-primary-100 transition-colors duration-200"
            >
              <User size={20} />
            </motion.button>

            {/* カート */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-primary-700 dark:text-primary-300 hover:text-primary-900 dark:hover:text-primary-100 transition-colors duration-200 relative"
            >
              <ShoppingBag size={20} />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.itemCount}
                </span>
              )}
            </motion.button>

            {/* モバイルメニューボタン */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-primary-700 dark:text-primary-300 hover:text-primary-900 dark:hover:text-primary-100 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* モバイルメニュー */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white dark:bg-primary-800 border-t border-primary-200 dark:border-primary-700"
            >
              <nav className="py-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-primary-700 dark:text-primary-300 hover:text-primary-900 dark:hover:text-primary-100 hover:bg-primary-50 dark:hover:bg-primary-700 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* カートサイドバー */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </motion.header>
  )
}
