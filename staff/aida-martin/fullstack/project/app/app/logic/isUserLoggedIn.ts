import useStorage from '../hooks/useStorage'
import { isTokenAlive, isTokenValid } from '../com'

const { getItem } = useStorage()

export default () => {
  const token = getItem('token', 'session')
  return isTokenValid(token) && isTokenAlive(token)
}
