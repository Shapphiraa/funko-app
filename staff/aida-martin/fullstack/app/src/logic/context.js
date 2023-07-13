const context = {
  set token(token) {
    sessionStorage.token = token
  },
  get token() {
    return sessionStorage.token
  },
}

export default context
