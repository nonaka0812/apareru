'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    shop: [
      { name: '新作アイテム', href: '/shop?filter=new' },
      { name: 'トップス', href: '/shop?category=tops' },
      { name: 'ボトムス', href: '/shop?category=bottoms' },
      { name: 'アクセサリー', href: '/shop?category=accessories' },
      { name: 'セール', href: '/shop?filter=sale' },
    ],
    support: [
      { name: 'サイズガイド', href: '/size-guide' },
      { name: '配送について', href: '/shipping' },
      { name: '返品・交換', href: '/returns' },
      { name: 'よくある質問', href: '/faq' },
      { name: 'お問い合わせ', href: '/contact' },
    ],
    company: [
      { name: 'ブランドについて', href: '/about' },
      { name: '採用情報', href: '/careers' },
      { name: 'プライバシーポリシー', href: '/privacy' },
      { name: '利用規約', href: '/terms' },
      { name: '特定商取引法', href: '/legal' },
    ],
  }

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/apareru',
      icon: Instagram,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/apareru',
      icon: Twitter,
    },
    {
      name: 'Email',
      href: 'mailto:info@apareru.com',
      icon: Mail,
    },
  ]

  return (
    <footer className="bg-primary-900 text-primary-100">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* ブランド情報 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <h3 className="text-2xl font-display font-bold mb-4">APARERU</h3>
            <p className="text-primary-300 mb-6 leading-relaxed">
              ストリートファッションの新しい可能性を追求し、
              10代〜20代前半に向けたトレンド感あふれるアイテムを展開しています。
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-primary-300">
                <MapPin size={16} />
                <span>東京都渋谷区恵比寿1-2-3</span>
              </div>
              <div className="flex items-center space-x-3 text-primary-300">
                <Phone size={16} />
                <span>03-1234-5678</span>
              </div>
            </div>
          </motion.div>

          {/* ショップ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-display font-semibold mb-4">ショップ</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* サポート */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-display font-semibold mb-4">サポート</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 会社情報 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-display font-semibold mb-4">会社情報</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ニュースレター */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-primary-800 rounded-lg p-8 mb-12"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-2xl font-display font-semibold mb-4">
              最新情報をお届け
            </h4>
            <p className="text-primary-300 mb-6">
              新作アイテムやセール情報、ストリートファッションのトレンドを
              いち早くお知らせします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="メールアドレスを入力"
                className="flex-1 px-4 py-3 bg-white text-primary-900 rounded-none focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-accent whitespace-nowrap"
              >
                購読する
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* SNSリンクとコピーライト */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-primary-700 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-primary-300 hover:text-white transition-colors duration-200"
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
            <p className="text-primary-400 text-sm">
              © {currentYear} APARERU. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
