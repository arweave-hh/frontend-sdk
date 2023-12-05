import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Montserrat } from 'next/font/google'
import { ArweaveWalletKit } from "arweave-wallet-kit";


const montserrat = Montserrat({
  weight: ['400','500','600','700','800'],
  subsets: ['latin'],
})


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ArweaveWalletKit>
    <html lang="en">
      <body className={montserrat.className}>
        {children}</body>
    </html>
    </ArweaveWalletKit>
  )
}
