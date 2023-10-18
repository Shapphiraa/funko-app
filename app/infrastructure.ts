export const urlEndpoint = `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}`
export const publicKey = `${process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}`
export const authenticationEndpoint = `${process.env.NEXT_PUBLIC_HOST_URL}/api/image`

export const exclusivities = [
  {
    key: 'exclusivity-regular',
    value: 'Regular',
    label: 'Regular',
  },
  {
    key: 'exclusivity-exclusive',
    value: 'Exclusive',
    label: 'Exclusive',
  },
]

export const variants = [
  {
    key: 'variant-pop',
    value: 'POP!',
    label: 'POP!',
  },
  {
    key: 'variant-deluxe',
    value: 'POP! DELUXE',
    label: 'POP! DELUXE',
  },
  {
    key: 'variant-moment',
    value: 'POP! MOMENT',
    label: 'POP! MOMENT',
  },
  {
    key: 'variant-ride',
    value: 'POP! RIDE',
    label: 'POP! RIDE',
  },
  {
    key: 'variant-2-pack',
    value: 'POP! 2-PACK',
    label: 'POP! 2-PACK',
  },
  {
    key: 'variant-super',
    value: 'POP! SUPER',
    label: 'POP! SUPER',
  },
  {
    key: 'variant-jumbo',
    value: 'POP! JUMBO',
    label: 'POP! JUMBO',
  },
  {
    key: 'variant-cover',
    value: 'POP! COVER',
    label: 'POP! COVER',
  },
  {
    key: 'variant-album',
    value: 'POP! ALBUM',
    label: 'POP! ALBUM',
  },
  {
    key: 'variant-movie-poster',
    value: 'POP! MOVIE POSTER',
    label: 'POP! MOVIE POSTER',
  },
  {
    key: 'variant-train',
    value: 'POP! TRAIN',
    label: 'POP! TRAIN',
  },
]

export const availabilities = [
  {
    key: 'availability-coming-soon',
    value: 'Coming Soon',
    label: 'Coming Soon',
  },
  {
    key: 'availability-available',
    value: 'Available',
    label: 'Available',
  },
  {
    key: 'availability-temporarily-unavailable',
    value: 'Temporarily Unavailable',
    label: 'Temporarily Unavailable',
  },
  {
    key: 'availability-vaulted',
    value: 'Vaulted',
    label: 'Vaulted',
  },
]

export const conditions = [
  {
    key: 'condition-never-opened',
    value: 'Never opened',
    label: 'Never opened',
  },
  {
    key: 'condition-good-condition',
    value: 'Good condition',
    label: 'Good condition',
  },
  {
    key: 'condition-figure-with-defects',
    value: 'Figure with defects',
    label: 'Figure with defects',
  },
  {
    key: 'condition-box-with-defects',
    value: 'Box with defects',
    label: 'Box with defects',
  },
  {
    key: 'condition-flawed',
    value: 'Flawed',
    label: 'Flawed',
  },
]

export const status = [
  {
    key: 'status-available',
    value: 'Available',
    label: 'Available',
  },
  {
    key: 'status-reserved',
    value: 'Reserved',
    label: 'Reserved',
  },
  {
    key: 'status-sold',
    value: 'Sold',
    label: 'Sold',
  },
]
