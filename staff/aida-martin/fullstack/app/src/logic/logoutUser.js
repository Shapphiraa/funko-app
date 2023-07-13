import context from './context'

// Ya no podemos hacer el delete porque el token es un set/get, no se puede borrar
export default () => (context.token = null)
