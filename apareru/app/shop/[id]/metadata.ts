import { Metadata } from 'next'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const productId = params.id

  // 実際のアプリケーションでは、ここで商品データを取得
  const product = {
    name: 'ストリートフーディー',
    description: 'ストリート感あふれるフーディー。着心地の良いコットン素材を使用し、カジュアルからストリートまで幅広くコーディネートできます。',
    price: 8900,
    image: '/api/placeholder/1200/630',
  }

  return {
    title: `${product.name} | APARERU`,
    description: product.description,
    keywords: 'ストリートファッション, フーディー, アパレル, ファッション, トレンド',
    openGraph: {
      title: `${product.name} | APARERU`,
      description: product.description,
      type: 'product',
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | APARERU`,
      description: product.description,
      images: [product.image],
    },
  }
}
