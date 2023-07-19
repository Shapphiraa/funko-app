import './Login.css'
import { useAppContext, useHandleErrors } from '../hooks'
import { loginUser } from '../logic'
import Container from '../library/Container'
import { Link } from 'react-router-dom'

export default function Login({}) {
  const { navigate } = useAppContext()
  const handleErrors = useHandleErrors()

  const handleLogin = (event) => {
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value

    handleErrors(async () => {
      await loginUser(email, password)

      navigate('/')
    })
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
