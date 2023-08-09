import './globals.css'
import type { Metadata } from 'next'
import Header from './components/Header'
import Footer from './components/Footer'

export const metadata: Metadata = {
  title: 'Funko App',
  description: 'Funko catalog and trade App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-screen">
      <body className="flex flex-col h-screen">
        <Header />
        <main className={'flex flex-col grow overflow-auto'}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
