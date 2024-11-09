import type { Metadata } from 'next'
import { Press_Start_2P } from 'next/font/google'
import './globals.css'
import { WalletProvider } from './providers'
import { Footer } from '@/components/footer'

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p'
})

export const metadata: Metadata = {
  title: '8BET',
  description: 'Skill-based wagering platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${pressStart2P.variable} bg-black min-h-screen`}>
        <WalletProvider>
          <div className="min-h-screen flex flex-col bg-black">
            {children}
            <Footer />
          </div>
        </WalletProvider>
      </body>
    </html>
  )
}
