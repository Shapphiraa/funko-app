import context from './context'
import { utils } from 'com'

const { extractSubFromToken } = utils

export default () => extractSubFromToken(context.token)
