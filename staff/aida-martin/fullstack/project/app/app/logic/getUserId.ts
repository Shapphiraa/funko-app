import useStorage from '../hooks/useStorage'
import { extractSubFromToken } from '../com/utils'

const { getItem } = useStorage()

export default () => {
  const token = getItem('token', 'session')

  extractSubFromToken(token)
}
