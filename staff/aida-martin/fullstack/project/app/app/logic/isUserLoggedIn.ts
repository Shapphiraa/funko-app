import context from './context'
import { isTokenAlive, isTokenValid } from '../com'

export default () => isTokenValid(context.token) && isTokenAlive(context.token)
