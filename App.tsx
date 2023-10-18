'use client'

import { useState } from 'react'
import Alert from './app/components/Alert'
import AppContext from './AppContext'
import { NextUIProvider } from '@nextui-org/react'

const { Provider } = AppContext

export default function App({ children }: { children: React.ReactNode }) {
  const [feedback, setFeedback] = useState<{
    message: string
  } | null>(null)

  const handleAcceptAlert = () => {
    setFeedback(null)
  }

  const alert = (message: string) => setFeedback({ message })

  return (
    <NextUIProvider>
      <Provider
        value={{
          alert,
        }}
      >
        {children}
        {feedback && (
          <Alert message={feedback.message} onAccept={handleAcceptAlert} />
        )}
      </Provider>
    </NextUIProvider>
  )
}
