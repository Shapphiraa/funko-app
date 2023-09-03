'use client'

import AccountContainer from '../../components/AccountContainer'
import Tittle from '../../library/Tittle'
import GeneralButton from '../../components/GeneralButton'
import AccountLink from '../../components/AccountLink'
import Form from '../../library/Form'
import Input from '../../library/Input'
import registerUser from '../../logic/registerUser'
import { redirect, useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import isUserLoggedIn from '@/app/logic/isUserLoggedIn'
import useAppContext from '@/app/hooks/useAppContext'

export default function Register() {
  const { alert } = useAppContext()

  const [isUserLogged, setIsUserLogged] = useState<boolean | null>(null)

  const router = useRouter()

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

  const handleRegister = async (event: FormEvent) => {
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

    try {
      await registerUser({ name, email, password, repeatPassword })

      router.push('/account/login')
    } catch (error: any) {
      alert(error.message, 'error')
    }
  }

  useEffect(() => {
    if (isUserLoggedIn()) {
      setIsUserLogged(true)
      redirect('/account')
    }

    setIsUserLogged(false)
  }, [])

  return (
    <>
      {isUserLogged === false && (
        <div className="flex h-[718px]">
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
        </div>
      )}
    </>
  )
}
