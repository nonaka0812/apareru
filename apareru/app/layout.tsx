import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'
import { CartProvider } from '@/contexts/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'APARERU - ストリート系アパレルブランド',
  description: '最新のストリートファッションを提案するアパレルブランド。トレンド感とSNS映えを重視したアイテムを展開。',
  keywords: 'ストリートファッション, アパレル, ファッション, トレンド, 10代, 20代',
  authors: [{ name: 'APARERU' }],
  openGraph: {
    title: 'APARERU - ストリート系アパレルブランド',
    description: '最新のストリートファッションを提案するアパレルブランド',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APARERU - ストリート系アパレルブランド',
    description: '最新のストリートファッションを提案するアパレルブランド',
  },
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
