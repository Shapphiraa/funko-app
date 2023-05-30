import './Profile.css'
import { useContext } from 'react'
import updateAvatar from '../logic/updateUserAvatar'
import changePassword from '../logic/updateUserPassword'
import { context } from '../ui'
import Context from '../Context'
import Container from '../library/Container'

export default function Profile ({ onUpdateUserAvatar, onUpdateUserPassword }) {
  const { alert, freeze, unfreeze } = useContext(Context)

  const updateUserAvatar = event => {
    event.preventDefault()

    const avatar = event.target.url.value

    try {
      freeze()

      updateAvatar(context.userId, avatar, error => {
        unfreeze()

        if (error) {
          alert(error.message, 'error')

          return
        }

        onUpdateUserAvatar()
      })
    } catch (error) {
      alert(error.message, 'warn')
    }
  }

  const updateUserPassword = event => {
    event.preventDefault()

    const password = event.target.oldpassword.value
    const newPassword = event.target.newpassword.value.trim()
    const newPasswordConfirm = event.target.repeatnewpassword.value.trim()

    try {
      freeze()

      changePassword(context.userId, password, newPassword, newPasswordConfirm, error => {
        unfreeze()

        if (error) {
          alert(error.message, 'error')

          return
        }

        onUpdateUserPassword()
      })
    } catch (error) {
      alert(error.message, 'warn')
    }
  }

  return (
    <Container className='profile'>
      <h1 className='title'>YOUR PROFILE</h1>

      <form className='form profile-avatar-form' onSubmit={updateUserAvatar}>
        <h2>UPDATE AVATAR</h2>
        <input className='input' type='url' name='url' placeholder='Your link' />

        <p className='update-avatar-error error off' />

        <button className='button change-avatar-button' type='submit'>
          UPDATE
        </button>
      </form>

      <form className='form profile-password-form' onSubmit={updateUserPassword}>
        <h2>UPDATE PASSWORD</h2>
        <input
          className='input'
          type='password'
          name='oldpassword'
          placeholder='Current password'
        />

        <input
          className='input'
          type='password'
          name='newpassword'
          placeholder='New password'
        />

        <input
          className='input'
          type='password'
          name='repeatnewpassword'
          placeholder='Repeat new password'
        />

        <p className='change-password-error error off' />

        <button className='button change-password-button' type='submit'>UPDATE</button>
      </form>
    </Container>
  )
}
