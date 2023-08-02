'use client'

import AccountContainer from '../../components/AccountContainer'
import Tittle from '../../components/Tittle'
import GeneralButton from '../../components/GeneralButton'
import AccountLink from '../../components/AccountLink'
import Form from '../../components/Form'
import Input from '../../components/Input'
import loginUser from '../../logic/loginUser'
import { useRouter } from 'next/navigation'

const inputs = [
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
]

export default function Login() {
  const router = useRouter()

  const handleLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      email: { value: string }
      password: { value: string }
    }

    const email = target.email.value
    const password = target.password.value

    try {
      await loginUser({ email, password })

      router.push('/')
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <AccountContainer>
      <Tittle name="Welcome!"></Tittle>

      <Form onSubmit={handleLogin}>
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
        <GeneralButton tittle="Log in"></GeneralButton>
      </Form>

      <AccountLink
        text="Not a member? "
        textLink="Sing up here"
        route="/account/register"
      ></AccountLink>
    </AccountContainer>
  )
}
