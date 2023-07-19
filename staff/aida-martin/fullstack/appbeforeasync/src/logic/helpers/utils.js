// function formatDate (date) {
//   let day = date.getDate()
//   day = day < 10 ? `0${day}` : day

//   let month = date.getMonth() + 1
//   month = month < 10 ? `0${month}` : month

//   const year = date.getFullYear()

//   let hours = date.getHours()
//   hours = hours < 10 ? `0${hours}` : hours

//   let minutes = date.getMinutes()
//   minutes = minutes < 10 ? `0${minutes}` : minutes

//   let seconds = date.getSeconds()
//   seconds = seconds < 10 ? `0${seconds}` : seconds

//   return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
// }

/**
 * Count the likes and formats it according to its amount
 *
 * @param {object} post The post
 *
 * @returns {number + string} Count + like/likes/''
 */

export default function formatLikes (post) {
  const countLikes = (post.likes && post.likes.length) || 0

  if (countLikes > 1) {
    return `${countLikes} likes`
  }

  if (countLikes === 1) {
    return `${countLikes} like`
  }

  return ''
}
