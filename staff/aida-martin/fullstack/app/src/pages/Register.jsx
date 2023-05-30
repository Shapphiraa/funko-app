import './Register.css'
import { useContext } from 'react'
import registerUser from '../logic/registerUser'
import Context from '../Context'
import Container from '../library/Container'

export default function Register ({ onLoginClick, onUserRegisteredIn }) {
  const { alert, freeze, unfreeze } = useContext(Context)

  const handleLoginClick = event => {
    event.preventDefault()

    onLoginClick()
  }

  const handleRegister = event => {
    event.preventDefault()

    const name = event.target.name.value
    const email = event.target.email.value
    const password = event.target.password.value
    const repeatPassword = event.target.repeatpassword.value

    try {
      freeze()

      registerUser(name, email, password, repeatPassword, error => {
        unfreeze()

        // este error es asíncrono (del callback)
        if (error) {
          alert(error.message, 'error')

          return
        }

        onUserRegisteredIn()
      })
      // este error es síncrono (de los validadores)
    } catch (error) {
      alert(error.message, 'warn')
    }
  }

  return (
    <Container tag='section'>
      <h1 className='title'>CREATE ACCOUNT</h1>

      <form className='form' onSubmit={handleRegister}>
        <input className='input' type='text' name='name' placeholder='Name' />

        <input className='input' type='text' name='email' placeholder='Email' />

        <input
          className='input'
          type='password'
          name='password'
          placeholder='Password'
        />

        <input
          className='input'
          type='password'
          name='repeatpassword'
          placeholder='Repeat password'
        />

        <p className='register-error error off' />

        <button className='button register-button'>SIGN UP</button>
      </form>

      <p className='login-answer'>
        Have already an account? <a href='#' onClick={handleLoginClick} className='login-link link'>Login here</a>
      </p>
    </Container>
  )
}
