import context from './context'
import { utils } from 'com'

const { extractSubFromToken } = utils

export default (userId) => userId === extractSubFromToken(context.token)
