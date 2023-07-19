import { useAppContext } from '../hooks'
import { errors } from 'com'

const {
  DuplicityError,
  ExistenceError,
  AuthError,
  ContentError,
  PropertyError,
  UnknownError,
} = errors

export default () => {
  const { freeze, unfreeze, alert } = useAppContext()

  return (callback) => {
    try {
      const promise = callback()

      ;(async () => {
        try {
          freeze()

          await promise

          unfreeze()
        } catch (error) {
          unfreeze()
          showError(error, alert)
        }
      })()
    } catch (error) {
      unfreeze()
      showError(error, alert)
    }
  }
}

function showError(error, alert) {
  if (error instanceof DuplicityError) alert(error.message, 'error')
  else if (error instanceof ExistenceError) alert(error.message, 'warn')
  else if (error instanceof AuthError) alert(error.message, 'error')
  else if (error instanceof TypeError) alert(error.message, 'warn')
  else if (error instanceof ContentError) alert(error.message, 'warn')
  else if (error instanceof RangeError) alert(error.message, 'error')
  else if (error instanceof PropertyError) alert(error.message, 'error')
  else if (error instanceof UnknownError) alert(error.message, 'error')
  else alert(error.message, 'error')
}
