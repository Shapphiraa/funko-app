import context from './context'
import { isTokenAlive, isTokenValid } from '../com/utils'

export default () => isTokenValid(context.token) && isTokenAlive(context.token)
