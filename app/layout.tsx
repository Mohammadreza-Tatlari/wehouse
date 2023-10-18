import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'

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
        <ToasterProvider />
        <Navbar />
        {/* modals are highly interactive. keep it in ClientOnly wrapper */}
        <RegisterModal />
        {/* <Modal actionLabel='Submit' isOpen title='Hardcoded Title for modal demostration' /> */}
        </ClientOnly>
        {children}
        </body>
    </html>
  )
}
