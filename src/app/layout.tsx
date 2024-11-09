import { Press_Start_2P } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Footer } from '@/components/footer'

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p',
  preload: true,
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={pressStart2P.variable}>
      <body className="font-press-start-2p flex flex-col min-h-screen">
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
