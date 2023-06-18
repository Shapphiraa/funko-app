module.exports = {
  user: () => ({
    id: `user-${Math.random()}`,
    name: `name-${Math.random()}`,
    email: `email-${Math.random()}@mail.com`,
    password: `password-${Math.random()}`,
    avatar: null,
    saves: [],
  }),

  post: (userId) => ({
    id: `post-${Math.random()}`,
    author: userId,
    image: `image-${Math.random()}`,
    text: `text-${Math.random()}`,
    date: new Date(),
    likes: [],
    visibility: 'public',
    price: 0,
  }),
}
