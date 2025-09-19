'use client'

import { motion } from 'framer-motion'
import HeroSection from '@/components/HeroSection'
import NewItemsSection from '@/components/NewItemsSection'
import RankingSection from '@/components/RankingSection'
import NewsSection from '@/components/NewsSection'
import InstagramFeed from '@/components/InstagramFeed'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-20 py-20"
      >
        <NewItemsSection />
        <RankingSection />
        <NewsSection />
        <InstagramFeed />
      </motion.div>
    </div>
  )
}
