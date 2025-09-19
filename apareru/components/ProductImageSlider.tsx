'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

interface ProductImageSliderProps {
  images: string[]
}

export default function ProductImageSlider({ images }: ProductImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="space-y-4">
      {/* メイン画像 */}
      <div className="relative aspect-square overflow-hidden bg-white dark:bg-primary-800 rounded-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={images[currentIndex]}
              alt={`商品画像 ${currentIndex + 1}`}
              fill
              className={`object-cover cursor-zoom-in transition-transform duration-300 ${
                isZoomed ? 'scale-150' : 'hover:scale-105'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            />
            
            {/* ズームアイコン */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg"
            >
              <ZoomIn size={20} className="text-primary-900" />
            </motion.button>

            {/* ナビゲーションボタン */}
            {images.length > 1 && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg"
                >
                  <ChevronLeft size={20} className="text-primary-900" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg"
                >
                  <ChevronRight size={20} className="text-primary-900" />
                </motion.button>
              </>
            )}

            {/* 画像インデックス */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* サムネイル画像 */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => goToImage(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                currentIndex === index
                  ? 'border-accent-500 ring-2 ring-accent-200'
                  : 'border-primary-200 dark:border-primary-600 hover:border-primary-400'
              }`}
            >
              <Image
                src={image}
                alt={`サムネイル ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.button>
          ))}
        </div>
      )}

      {/* ズームモーダル */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[currentIndex]}
                alt={`ズーム画像 ${currentIndex + 1}`}
                width={800}
                height={800}
                className="object-contain max-h-[80vh]"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg"
              >
                <X size={24} className="text-primary-900" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
