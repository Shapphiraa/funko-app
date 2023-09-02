import './globals.css'
import type { Metadata } from 'next'
import Header from './components/Header'
import Footer from './components/Footer'
import Loading from './loading'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Funko App',
  description: 'Funko POP! catalog and trade App',
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
        <Suspense fallback={<Loading />}>
          <main className={'flex flex-col grow overflow-auto'}>{children}</main>
        </Suspense>
        <Footer />
      </body>
    </html>
  )
}
