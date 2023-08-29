const generate = {
  user: () => ({
    id: `user-${Math.random()}`,
    name: `name-${Math.random()}`,
    email: `email-${Math.random()}@mail.com`,
    password: `password-${Math.random()}`,
    avatar: `avatar-${Math.random()}`,
    location: `Granada`,
    phoneNumber: `phoneNumber-${Math.random()}`,
    role: 'user',
    popCollect: [],
    popWhislist: [],
  }),

  category: () => ({
    name: `category-${Math.random()}`,
    slug: `slug-${Math.random()}`,
    imageList: `imageList-${Math.random()}`,
    imageDetail: `imageDetail-${Math.random()}`,
  }),

  pop: (categoryId: string) => ({
    id: `pop-${Math.random()}`,
    variant: 'POP!',
    exclusivity: 'Regular',
    name: `name-${Math.random()}`,
    number: Math.random(),
    images: [`image1-${Math.random()}`, `image2-${Math.random()}`],
    category: categoryId,
    collect: `collect-${Math.random()}`,
    release: `release-${Math.random()}`,
    availability: 'Available',
  }),

  salePop: (popId: string, userId: string) => ({
    id: `salePop-${Math.random()}`,
    author: userId,
    description: `description-description-description-${Math.random()}`,
    condition: 'Good condition',
    pop: popId,
    images: [`image1-${Math.random()}`, `image2-${Math.random()}`],
    price: Math.random(),
    status: 'Available',
  }),
}

export default generate
