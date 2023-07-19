import './Login.css'
import { useAppContext } from '../hooks'
import { loginUser } from '../logic'
import Container from '../library/Container'
import { Link } from 'react-router-dom'

export default function Login({}) {
  const { alert, freeze, unfreeze, navigate } = useAppContext()

  const handleLogin = (event) => {
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value

    try {
      freeze()

      loginUser(email, password)
        .then(navigate('/'))
        .catch((error) => alert(error.message, 'error'))
        .finally(unfreeze)
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
        <Link className="register-link link" to="/register">
          Sign up here
        </Link>
      </p>
    </Container>
  )
}
