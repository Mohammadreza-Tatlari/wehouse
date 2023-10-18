import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import Modal from './components/modals/Modal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wehouse',
  description: 'Residential Marketing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
        <Navbar />
        {/* Modal cause any modalation such as login renting or pop up actions */}
        <Modal actionLabel='Submit' isOpen title='Hardcoded Title for modal demostration' />
        </ClientOnly>
        {children}
        </body>
    </html>
  )
}
