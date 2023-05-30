import { useState, useEffect } from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import { context, setTheme, getTheme } from './ui'
import Alert from './components/modals/Alert'
import Context from './Context'
import Loader from './library/Loader'

export default function App () {
  const [view, setView] = useState(context.userId ? 'home' : 'login')
  const [feedback, setFeedback] = useState(null)
  const [loader, setLoader] = useState(false)

  useEffect(() => setTheme(getTheme()), [])

  const handleGoToRegister = () => {
    setView('register')
  }

  const handleGoToLogin = () => {
    setView('login')
  }

  const handleGoToHome = () => {
    setView('home')
  }

  const handleAcceptAlert = () => {
    setFeedback(null)
  }

  const alert = (message, level = 'info') => setFeedback({ message, level })

  const freeze = () => setLoader(true)

  const unfreeze = () => setLoader(false)

  // Con el Context.Provider podemos utilizar lo que pongamos de forma general en los demás componentes sin pasar por props
  return (
    <Context.Provider value={{ alert, freeze, unfreeze }}>
      {view === 'login' &&
        <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} />}
      {view === 'register' &&
        <Register onLoginClick={handleGoToLogin} onUserRegisteredIn={handleGoToLogin} />}
      {view === 'home' &&
        <Home onLogOut={handleGoToLogin} />}
      {feedback && <Alert message={feedback.message} level={feedback.level} onAccept={handleAcceptAlert} />}
      {loader && <Loader />}
    </Context.Provider>
  )
}
