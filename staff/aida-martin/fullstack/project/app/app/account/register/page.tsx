'use client'

import AccountContainer from '../../components/AccountContainer'
import Tittle from '../../components/Tittle'
import GeneralButton from '../../components/GeneralButton'
import AccountLink from '../../components/AccountLink'
import Form from '../../components/Form'
import Input from '../../components/Input'
import registerUser from '../../logic/registerUser'

const inputs = [
  {
    type: 'text',
    name: 'name',
    placeholder: 'Name',
  },
  {
    type: 'text',
    name: 'email',
    placeholder: 'Email',
  },
  {
    type: 'password',
    name: 'password',
    placeholder: 'Password',
  },
  {
    type: 'password',
    name: 'repeatPassword',
    placeholder: 'Repeat Password',
  },
]

export default function Register() {
  const handleRegister = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      name: { value: string }
      email: { value: string }
      password: { value: string }
      repeatPassword: { value: string }
    }

    const name = target.name.value
    const email = target.email.value
    const password = target.password.value
    const repeatPassword = target.repeatPassword.value

    await registerUser({ name, email, password, repeatPassword })
  }

  return (
    <AccountContainer>
      <Tittle name="Create account"></Tittle>

      <Form onSubmit={handleRegister}>
        <>
          {inputs.map(({ type, name, placeholder }) => (
            <Input
              key={name}
              type={type}
              name={name}
              placeholder={placeholder}
            />
          ))}
        </>
        <GeneralButton tittle="Sign up"></GeneralButton>
      </Form>

      <AccountLink
        text="Have already an account? "
        textLink="Login here"
        route="/account/login"
      ></AccountLink>
    </AccountContainer>
  )
}
