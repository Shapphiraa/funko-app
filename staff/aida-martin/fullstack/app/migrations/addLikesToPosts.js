const posts = JSON.parse(localStorage.postsJson)

posts.forEach(post => {
  if (!post.likes) { post.likes = [] }
})

localStorage.postsJson = JSON.stringify(posts)

// Esto se hace una vez en consola para aplicarlo a todos los que haya de antes
