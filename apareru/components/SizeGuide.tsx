'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function SizeGuide() {
  const sizeData = {
    tops: {
      title: 'トップス サイズガイド',
      measurements: [
        { size: 'XS', chest: '86-90', length: '66', shoulder: '44' },
        { size: 'S', chest: '90-94', length: '68', shoulder: '46' },
        { size: 'M', chest: '94-98', length: '70', shoulder: '48' },
        { size: 'L', chest: '98-102', length: '72', shoulder: '50' },
        { size: 'XL', chest: '102-106', length: '74', shoulder: '52' },
      ],
      note: '※測定方法：胸囲は脇の下の一番太い部分を水平に測定',
    },
    bottoms: {
      title: 'ボトムス サイズガイド',
      measurements: [
        { size: '28', waist: '71-73', hip: '89-91', inseam: '78' },
        { size: '30', waist: '76-78', hip: '94-96', inseam: '79' },
        { size: '32', waist: '81-83', hip: '99-101', inseam: '80' },
        { size: '34', waist: '86-88', hip: '104-106', inseam: '81' },
        { size: '36', waist: '91-93', hip: '109-111', inseam: '82' },
      ],
      note: '※測定方法：ウエストは腰の一番細い部分、ヒップはお尻の一番太い部分を水平に測定',
    },
    shoes: {
      title: 'シューズ サイズガイド',
      measurements: [
        { size: '25', cm: '25.0', us: '7', uk: '6' },
        { size: '26', cm: '26.0', us: '8', uk: '7' },
        { size: '27', cm: '27.0', us: '9', uk: '8' },
        { size: '28', cm: '28.0', us: '10', uk: '9' },
        { size: '29', cm: '29.0', us: '11', uk: '10' },
      ],
      note: '※足の長さを測定してサイズを選択してください',
    },
  }

  return (
    <div className="bg-primary-50 dark:bg-primary-800 rounded-lg p-8">
      <h2 className="text-2xl font-display font-bold text-primary-900 dark:text-primary-100 mb-6">
        サイズガイド
      </h2>

      <div className="space-y-8">
        {Object.entries(sizeData).map(([category, data], index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3 className="text-xl font-display font-semibold text-primary-900 dark:text-primary-100 mb-4">
              {data.title}
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-primary-200 dark:border-primary-700">
                <thead>
                  <tr className="bg-primary-100 dark:bg-primary-700">
                    <th className="border border-primary-200 dark:border-primary-700 px-4 py-3 text-left text-primary-900 dark:text-primary-100 font-medium">
                      サイズ
                    </th>
                    {category === 'tops' && (
                      <>
                        <th className="border border-primary-200 dark:border-primary-700 px-4 py-3 text-left text-primary-900 dark:text-primary-100 font-medium">
                          胸囲 (cm)
                        </th>
                        <th className="border border-primary-200 dark:border-primary-700 px-4 py-3 text-left text-primary-900 dark:text-primary-100 font-medium">
                          着丈 (cm)
                        </th>
                        <th className="border border-primary-200 dark:border-primary-700 px-4 py-3 text-left text-primary-900 dark:text-primary-100 font-medium">
                          肩幅 (cm)
                        </th>
                      </>
                    )}
                    {category === 'bottoms' && (
                      <>
                        <th className="border border-primary-200 dark:border-primary-700 px-4 py-3 text-left text-primary-900 dark:text-primary-100 font-medium">
                          ウエスト (cm)
                        </th>
                        <th className="border border-primary-200 dark:border-primary-700 px-4 py-3 text-left text-primary-900 dark:text-primary-100 font-medium">
                          ヒップ (cm)
                        </th>
                        <th className="border border-primary-200 dark:border-primary-700 px-4 py-3 text-left text-primary-900 dark:text-primary-100 font-medium">
                          股下 (cm)
                        </th>
                      </>
                    )}
                    {category === 'shoes' && (
                      <>
                        <th className="border border-primary-200 dark:border-primary-700 px-4 py-3 text-left text-primary-900 dark:text-primary-100 font-medium">
                          足長 (cm)
                        </th>
                        <th className="border border-primary-200 dark:border-primary-700 px-4 py-3 text-left text-primary-900 dark:text-primary-100 font-medium">
                          US
                        </th>
                        <th className="border border-primary-200 dark:border-primary-700 px-4 py-3 text-left text-primary-900 dark:text-primary-100 font-medium">
                          UK
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.measurements.map((measurement, idx) => (
                    <tr key={idx} className="hover:bg-primary-50 dark:hover:bg-primary-700/50">
                      <td className="border border-primary-200 dark:border-primary-700 px-4 py-3 text-primary-900 dark:text-primary-100 font-medium">
                        {measurement.size}
                      </td>
                      {category === 'tops' && (
                        <>
                          <td className="border border-primary-200 dark:border-primary-700 px-4 py-3 text-primary-700 dark:text-primary-300">
                            {measurement.chest}
                          </td>
                          <td className="border border-primary-200 dark:border-primary-700 px-4 py-3 text-primary-700 dark:text-primary-300">
                            {measurement.length}
                          </td>
                          <td className="border border-primary-200 dark:border-primary-700 px-4 py-3 text-primary-700 dark:text-primary-300">
                            {measurement.shoulder}
                          </td>
                        </>
                      )}
                      {category === 'bottoms' && (
                        <>
                          <td className="border border-primary-200 dark:border-primary-700 px-4 py-3 text-primary-700 dark:text-primary-300">
                            {measurement.waist}
                          </td>
                          <td className="border border-primary-200 dark:border-primary-700 px-4 py-3 text-primary-700 dark:text-primary-300">
                            {measurement.hip}
                          </td>
                          <td className="border border-primary-200 dark:border-primary-700 px-4 py-3 text-primary-700 dark:text-primary-300">
                            {measurement.inseam}
                          </td>
                        </>
                      )}
                      {category === 'shoes' && (
                        <>
                          <td className="border border-primary-200 dark:border-primary-700 px-4 py-3 text-primary-700 dark:text-primary-300">
                            {measurement.cm}
                          </td>
                          <td className="border border-primary-200 dark:border-primary-700 px-4 py-3 text-primary-700 dark:text-primary-300">
                            {measurement.us}
                          </td>
                          <td className="border border-primary-200 dark:border-primary-700 px-4 py-3 text-primary-700 dark:text-primary-300">
                            {measurement.uk}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <p className="text-sm text-primary-600 dark:text-primary-400 mt-3">
              {data.note}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 p-6 bg-accent-50 dark:bg-accent-900/20 rounded-lg"
      >
        <h4 className="text-lg font-display font-semibold text-primary-900 dark:text-primary-100 mb-3">
          サイズ選びのコツ
        </h4>
        <ul className="space-y-2 text-sm text-primary-700 dark:text-primary-300">
          <li>• 普段着ている服のサイズを参考にしてください</li>
          <li>• サイズが分からない場合は、お気軽にお問い合わせください</li>
          <li>• サイズ交換は無料で承っております</li>
          <li>• 測定方法が分からない場合は、動画ガイドをご覧ください</li>
        </ul>
      </motion.div>
    </div>
  )
}
