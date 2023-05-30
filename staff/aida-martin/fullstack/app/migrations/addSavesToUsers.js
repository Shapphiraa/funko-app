const users = JSON.parse(localStorage.usersJson)

users.forEach(user => {
  if (!user.saves) { user.saves = [] }
})

localStorage.usersJson = JSON.stringify(users)

// Esto se hace una vez en consola para aplicarlo a todos los que haya de antes
