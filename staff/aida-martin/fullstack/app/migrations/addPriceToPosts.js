const posts = JSON.parse(localStorage.postsJson)

posts.forEach(post => {
  if (!post.price) { post.price = 0 }
})

localStorage.postsJson = JSON.stringify(posts)

// Esto se hace una vez en consola para aplicarlo a todos los que haya de antes
