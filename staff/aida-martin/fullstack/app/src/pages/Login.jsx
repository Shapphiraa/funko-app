import './Login.css'
import { useAppContext } from '../hooks'
import { context } from '../ui'
import authenticateUser from '../logic/authenticateUser'
import Container from '../library/Container'

export default function Login({ onRegisterClick, onUserLoggedIn }) {
  const { alert, freeze, unfreeze } = useAppContext()

  const handleRegisterClick = (event) => {
    event.preventDefault()

    onRegisterClick()
  }

  const handleLogin = (event) => {
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value

    try {
      freeze()

      authenticateUser(email, password)
        .then((token) => {
          unfreeze()

          context.token = token

          onUserLoggedIn()
        })
        .catch((error) => {
          unfreeze()

          alert(error.message, 'error')
        })
    } catch (error) {
      unfreeze()

      alert(error.message, 'warn')
    }
  }

  return (
    <Container tag="section">
      <h1 className="title">WELCOME!</h1>

      <form className="form" onSubmit={handleLogin}>
        <input
          className="input"
          type="email"
          name="email"
          placeholder="Email"
        />

        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
        />

        <a href="#" className="forgot-password-link link">
          Forgot password?
        </a>

        <p className="login-error error off" />

        <button className="button login-button">LOG IN</button>
      </form>

      <p className="register-answer">
        Not a member?{' '}
        <a
          href="#"
          onClick={handleRegisterClick}
          className="register-link link"
        >
          Sign up here
        </a>
      </p>
    </Container>
  )
}
