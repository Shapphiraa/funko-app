import { show } from '../../ui'

/**
 * Shows errors one way or another depending on their cause
 *
 * @param {string} page Template error container
 * @param {object} error Literal error
 */

export default function errorShow (page, error) {
  if (error.cause === 'userError') {
    show(page)
    page.innerText = error.message
    return
  }
  console.log(error)
}
