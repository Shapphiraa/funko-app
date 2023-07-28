import AccountContainer from '../../components/AccountContainer'
import Tittle from '../../components/Tittle'
import GeneralButton from '../../components/GeneralButton'
import AccountLink from '../../components/AccountLink'
import Form from '../../components/Form'
import Input from '../../components/Input'

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
  // const handleLogin = (event) => {
  //   event.preventDefault()

  //   const email = event.target.email.value
  //   const password = event.target.password.value

  //   authenticateUser(email, password)

  //   }

  return (
    <AccountContainer>
      <Tittle name="Welcome!"></Tittle>

      <Form>
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
