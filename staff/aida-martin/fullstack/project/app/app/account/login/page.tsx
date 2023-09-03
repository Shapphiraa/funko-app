'use client'

import AccountContainer from '../../components/AccountContainer'
import Tittle from '../../library/Tittle'
import GeneralButton from '../../components/GeneralButton'
import AccountLink from '../../components/AccountLink'
import Form from '../../library/Form'
import Input from '../../library/Input'
import loginUser from '../../logic/loginUser'
import { redirect, useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import isUserLoggedIn from '@/app/logic/isUserLoggedIn'
import useAppContext from '@/app/hooks/useAppContext'

export default function Login() {
  const { alert } = useAppContext()

  const [isUserLogged, setIsUserLogged] = useState<boolean | null>(null)

  const router = useRouter()

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

  const handleLogin = async (event: FormEvent) => {
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
      alert(error.message)
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
        </div>
      )}
    </>
  )
}
