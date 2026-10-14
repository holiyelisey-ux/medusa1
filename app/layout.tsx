import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  title: 'Медузы: три обитателя глубин — презентация по биологии',
  description:
    'Интерактивная презентация о трёх видах сцифоидных медуз: ушастой медузе, морской крапиве и львиной гриве. Строение, классификация, жизненный цикл и факты.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#04121a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
