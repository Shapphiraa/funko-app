import useStorage from '../hooks/useStorage'

const { removeItem } = useStorage()

export default () => removeItem('token', 'session')
