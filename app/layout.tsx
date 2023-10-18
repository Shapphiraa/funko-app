import './globals.css'
import type { Metadata } from 'next'
import Header from './components/Header'
import Footer from './components/Footer'
import Loading from './loading'
import { Suspense } from 'react'
import App from '@/App'

export const metadata: Metadata = {
  title: 'Funko',
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
          <main className="flex flex-col grow overflow-auto">
            <App>{children}</App>
          </main>
        </Suspense>
        <Footer />
      </body>
    </html>
  )
}
