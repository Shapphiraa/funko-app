import context from './context'
import { utils } from 'com'

const { isTokenAlive, isTokenValid } = utils

export default () => isTokenValid(context.token) && isTokenAlive(context.token)
