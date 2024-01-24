import context from './context'
import { extractSubFromToken } from './helpers/utils'

export default () => extractSubFromToken(context.token)
