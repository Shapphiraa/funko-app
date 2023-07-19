import { DELAY } from './constants'

export const loadUsers = callback => setTimeout(() =>
  callback('usersJson' in localStorage ? JSON.parse(localStorage.usersJson) : []), DELAY)

export function saveUsers (users, callback) {
  setTimeout(() => {
    localStorage.usersJson = JSON.stringify(users)

    callback()
  }, DELAY)
}

export function saveUser (user, callback) {
  loadUsers(users => {
    const index = users.findIndex((_user) => _user.id === user.id)

    if (index < 0) {
      users.push(user)
    } else {
      users.splice(index, 1, user)
    }

    saveUsers(users, callback)
  })
}

/**
 * Finds user by email
 *
 * @param {string} email The user's email
 *
 * @returns {object} User
 */

export function findUserByEmail (email, callback) {
  loadUsers(users => {
    const user = users.find((user) => user.email === email)

    callback(user)
  })
}

/**
 * Finds user by ID
 *
 * @param {string} userId The user's ID
 *
 * @returns {object} User
 */

export function findUserById (userId, callback) {
  loadUsers(users => {
    callback(users.find((user) => user.id === userId))
  })
}

export const loadPosts = callback => setTimeout(() => {
  const posts =
    'postsJson' in localStorage ? JSON.parse(localStorage.postsJson) : []

  posts.forEach((post) => (post.date = new Date(post.date)))

  callback(posts)
}, DELAY)

export function savePosts (posts, callback) {
  setTimeout(() => {
    localStorage.postsJson = JSON.stringify(posts)

    callback()
  }, DELAY)
}

export function savePost (post, callback) {
  loadPosts(posts => {
    const index = posts.findIndex((_post) => _post.id === post.id)

    if (index < 0) {
      posts.push(post)
    } else {
      posts.splice(index, 1, post)
    }

    savePosts(posts, callback)
  })
}

/**
 * Finds post by ID
 *
 * @param {string} postId The post's ID
 *
 * @returns {object} Post
 */

export function findPostById (postId, callback) {
  loadPosts(posts => {
    callback(posts.find((post) => post.id === postId))
  })
}

export const theme = () =>
  'theme' in localStorage ? localStorage.theme : 'light'

export function saveTheme (theme) {
  localStorage.theme = theme
}

export function findTheme () {
  return theme()
}
