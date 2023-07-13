import { useState, useEffect } from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import { setTheme, getTheme } from './ui'
import Alert from './components/modals/Alert'
import AppContext from './AppContext'
import Loader from './library/Loader'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { isUserLoggedIn } from './logic'

const { Provider } = AppContext

export default function App() {
  const [feedback, setFeedback] = useState(null)
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  useEffect(() => setTheme(getTheme()), [])

  const handleAcceptAlert = () => {
    setFeedback(null)
  }

  const alert = (message, level = 'info') => setFeedback({ message, level })

  const freeze = () => setLoader(true)

  const unfreeze = () => setLoader(false)

  // Con el Context.Provider podemos utilizar lo que pongamos de forma general en los demás componentes sin pasar por props
  return (
    <Provider value={{ alert, freeze, unfreeze, navigate }}>
      <Routes>
        <Route
          path="/login"
          element={isUserLoggedIn() ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isUserLoggedIn() ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/"
          element={isUserLoggedIn() ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>

      {feedback && (
        <Alert
          message={feedback.message}
          level={feedback.level}
          onAccept={handleAcceptAlert}
        />
      )}
      {loader && <Loader />}
    </Provider>
  )
}
