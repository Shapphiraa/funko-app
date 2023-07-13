import './Profile.css'
import { useAppContext } from '../hooks'
import { updateUserAvatar, updateUserPassword } from '../logic'
import Container from '../library/Container'

export default function Profile({ onUpdateUserAvatar, onUpdateUserPassword }) {
  const { alert, freeze, unfreeze } = useAppContext()

  const handleUpdateUserAvatar = (event) => {
    event.preventDefault()

    const avatar = event.target.url.value

    try {
      freeze()

      updateUserAvatar(avatar)
        .then(onUpdateUserAvatar)
        .catch((error) => alert(error.message, 'error'))
        .finally(unfreeze)
    } catch (error) {
      unfreeze()

      alert(error.message, 'warn')
    }
  }

  const handleUpdateUserPassword = (event) => {
    event.preventDefault()

    const password = event.target.oldpassword.value
    const newPassword = event.target.newpassword.value.trim()
    const newPasswordConfirm = event.target.repeatnewpassword.value.trim()

    try {
      freeze()

      updateUserPassword(password, newPassword, newPasswordConfirm)
        .then(onUpdateUserPassword)
        .catch((error) => alert(error.message, 'error'))
        .finally(unfreeze)
    } catch (error) {
      unfreeze()

      alert(error.message, 'warn')
    }
  }

  return (
    <Container className="profile">
      <h1 className="title">YOUR PROFILE</h1>

      <form
        className="form profile-avatar-form"
        onSubmit={handleUpdateUserAvatar}
      >
        <h2>UPDATE AVATAR</h2>
        <input
          className="input"
          type="url"
          name="url"
          placeholder="Your link"
        />

        <p className="update-avatar-error error off" />

        <button className="button change-avatar-button" type="submit">
          UPDATE
        </button>
      </form>

      <form
        className="form profile-password-form"
        onSubmit={handleUpdateUserPassword}
      >
        <h2>UPDATE PASSWORD</h2>
        <input
          className="input"
          type="password"
          name="oldpassword"
          placeholder="Current password"
        />

        <input
          className="input"
          type="password"
          name="newpassword"
          placeholder="New password"
        />

        <input
          className="input"
          type="password"
          name="repeatnewpassword"
          placeholder="Repeat new password"
        />

        <p className="change-password-error error off" />

        <button className="button change-password-button" type="submit">
          UPDATE
        </button>
      </form>
    </Container>
  )
}
