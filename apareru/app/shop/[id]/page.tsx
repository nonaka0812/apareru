'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import ProductImageSlider from '@/components/ProductImageSlider'
import ProductInfo from '@/components/ProductInfo'
import SizeGuide from '@/components/SizeGuide'
import RelatedProducts from '@/components/RelatedProducts'

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const [selectedColor, setSelectedColor] = useState('black')
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)

  // サンプル商品データ
  const product = {
    id: productId,
    name: 'ストリートフーディー',
    price: 8900,
    originalPrice: 12000,
    description: 'ストリート感あふれるフーディー。着心地の良いコットン素材を使用し、カジュアルからストリートまで幅広くコーディネートできます。',
    images: [
      '/api/placeholder/600/600',
      '/api/placeholder/600/600',
      '/api/placeholder/600/600',
      '/api/placeholder/600/600',
    ],
    colors: [
      { name: 'black', label: 'ブラック', hex: '#000000' },
      { name: 'white', label: 'ホワイト', hex: '#ffffff' },
      { name: 'gray', label: 'グレー', hex: '#6b7280' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'トップス',
    tags: ['ストリート', 'カジュアル', 'フーディー'],
    inStock: true,
  }

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
        >
          <ProductImageSlider images={product.images} />
          <ProductInfo
            product={product}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <SizeGuide />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <RelatedProducts category={product.category} currentProductId={product.id} />
        </motion.div>
      </div>
    </div>
  )
}
