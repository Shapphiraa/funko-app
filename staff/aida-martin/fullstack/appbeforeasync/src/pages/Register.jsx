import './Register.css'
import { useAppContext } from '../hooks'
import { registerUser } from '../logic'
import Container from '../library/Container'
import { Link } from 'react-router-dom'
import { errors } from 'com'

const { DuplicityError, ContentError } = errors

export default function Register({}) {
  const { alert, freeze, unfreeze, navigate } = useAppContext()

  const handleRegister = (event) => {
    event.preventDefault()

    const name = event.target.name.value
    const email = event.target.email.value
    const password = event.target.password.value
    const repeatPassword = event.target.repeatpassword.value

    try {
      freeze()

      registerUser(name, email, password, repeatPassword)
        .then(navigate('/login'))
        .catch((error) => {
          if (error instanceof DuplicityError) alert(error.message, 'error')
          else alert(error.message, 'warn')
        })
        .finally(unfreeze)
    } catch (error) {
      unfreeze()

      if (error instanceof TypeError) alert(error.message, 'warn')
      else if (error instanceof ContentError) alert(error.message, 'error')
      else alert(error.message)
    }
  }

  return (
    <Container tag="section">
      <h1 className="title">CREATE ACCOUNT</h1>

      <form className="form" onSubmit={handleRegister}>
        <input className="input" type="text" name="name" placeholder="Name" />

        <input className="input" type="text" name="email" placeholder="Email" />

        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
        />

        <input
          className="input"
          type="password"
          name="repeatpassword"
          placeholder="Repeat password"
        />

        <p className="register-error error off" />

        <button className="button register-button">SIGN UP</button>
      </form>

      <p className="login-answer">
        Have already an account?{' '}
        <Link className="login-link link" to="/login">
          Login here
        </Link>
      </p>
    </Container>
  )
}
