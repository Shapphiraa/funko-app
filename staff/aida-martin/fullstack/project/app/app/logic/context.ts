const context = {
  set token(token) {
    sessionStorage.token = token
  },
  get token() {
    return sessionStorage.token
  },

  removetoken() {
    return sessionStorage.removeItem('token')
  },
}

export default context
