export const openModal = () => {
  document.body.classList.add('scroll-lock')
}
export const hideModal = () => {
  document.body.classList.remove('scroll-lock')
}

export function setTheme(theme) {
  const root = document.querySelector(':root') // <html>...</html>

  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }

  localStorage.theme = theme
}

export function getTheme() {
  return localStorage.theme || 'light'
}
