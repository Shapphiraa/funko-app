import AccountContainer from '../../components/AccountContainer'
import Tittle from '../../components/Tittle'
import GeneralButton from '../../components/GeneralButton'
import AccountLink from '../../components/AccountLink'
import Form from '../../components/Form'
import Input from '../../components/Input'

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
  // const handleRegister = (event) => {
  //   event.preventDefault()

  //   const name = event.target.name.value
  //   const email = event.target.email.value
  //   const password = event.target.password.value
  //   const repeatPassword = event.target.repeatpassword.value

  //   registerUser(name, email, password, repeatPassword)

  //   }

  return (
    <AccountContainer>
      <Tittle name="Create account"></Tittle>

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