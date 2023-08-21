import { FormEvent } from 'react'
import Form from '../library/Form'
import Input from '../library/Input'
import Tittle from '../library/Tittle'
import GeneralButton from './GeneralButton'
import createPop from '../logic/createPop'
import retrieveCategories from '../logic/retrieveCategories'
import Select from './Select'

export default async function CreatePopForm({
  onCreated,
}: {
  onCreated: () => void
}) {
  const categories = await retrieveCategories()

  const categoriesOptions = categories.map((category) => ({
    key: `category-${category.slug}`,
    value: category.id,
    label: category.name,
  }))

  const exclusivities = [
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

  const exclusivitiesOptions = exclusivities.map((exclusivity) => ({
    key: exclusivity.key,
    value: exclusivity.value,
    label: exclusivity.label,
  }))

  const variants = [
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

  const variantsOptions = variants.map((variant) => ({
    key: variant.key,
    value: variant.value,
    label: variant.label,
  }))

  const availabilities = [
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

  const availabilitiesOptions = availabilities.map((availability) => ({
    key: availability.key,
    value: availability.value,
    label: availability.label,
  }))

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      variant: { value: string }
      exclusivity: { value: string }
      name: { value: string }
      number: { value: number }
      images: [
        image1: {
          value: string
        },
        image2: {
          value: string
        }
      ]
      category: { value: string }
      collect: { value: string }
      release: { value: string }
      availability: { value: string }
    }

    const variant = target.variant.value
    const exclusivity = target.exclusivity.value
    const name = target.name.value
    const number = target.number.value
    const images = [target.image1.value, target.image2.value]
    const category = target.category.value
    const collect = target.collect.value
    const release = target.release.value
    const availability = target.availability.value

    try {
      await createPop({
        variant,
        exclusivity,
        name,
        number,
        images,
        category,
        collect,
        release,
        availability,
      })
      onCreated()
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <>
      <Tittle className="text-xl" name="Create pop"></Tittle>

      <Form onSubmit={handleCreate}>
        <label className="text-text-light text-lg font-normal">Variant:</label>
        <Select id="variant-select" name="variant" options={variantsOptions} />

        <label className="text-text-light text-lg font-normal">
          Exclusivity:
        </label>
        <Select
          id="exclusivity-select"
          name="exclusivity"
          options={exclusivitiesOptions}
        />

        <label className="text-text-light text-lg font-normal">Name:</label>
        <Input type="text" name="name" />
        <label className="text-text-light text-lg font-normal">Number:</label>

        <Input type="number" name="number" />

        <label className="text-text-light text-lg font-normal">Images:</label>

        <Input type="text" name="image1" />
        <Input type="text" name="image2" />

        <label className="text-text-light text-lg font-normal">Category:</label>
        <Select
          id="category-select"
          name="category"
          options={categoriesOptions}
        />

        <label className="text-text-light text-lg font-normal">
          Collection:
        </label>
        <Input type="text" name="collect" />
        <label className="text-text-light text-lg font-normal">Release:</label>
        <Input type="text" name="release" />

        <label className="text-text-light text-lg font-normal">
          Availability:
        </label>
        <Select
          id="availability-select"
          name="availability"
          options={availabilitiesOptions}
        />

        <GeneralButton tittle="Create" />
      </Form>
    </>
  )
}
