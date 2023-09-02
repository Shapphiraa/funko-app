'use client'

import { useState } from 'react'
import Alert from './app/components/Alert'
import AppContext from './AppContext'
// import Loader from './library/Loader'

const { Provider } = AppContext

export default function App({ children }: { children: React.ReactNode }) {
  const [feedback, setFeedback] = useState<{
    message: string
  } | null>(null)
  // const [loader, setLoader] = useState(false)

  const handleAcceptAlert = () => {
    setFeedback(null)
  }

  const alert = (message: string) => setFeedback({ message })

  // const freeze = () => setLoader(true)

  // const unfreeze = () => setLoader(false)

  return (
    <Provider
      value={{
        alert,
      }}
    >
      {children}
      {feedback && (
        <Alert message={feedback.message} onAccept={handleAcceptAlert} />
      )}
      {/* {loader && <Loader />} */}
    </Provider>
  )
}
