import { FormEvent } from 'react'
import Form from '../library/Form'
import Input from '../library/Input'
import Tittle from '../library/Tittle'
import GeneralButton from './GeneralButton'
import updatePop from '../logic/updatePop'
import { Pop } from '../logic/retrievePop'
import retrieveCategories from '../logic/retrieveCategories'
import Select from './Select'

export default async function UpdatePopForm({
  onEdited,
  pop,
}: {
  pop: Pop
  onEdited: () => void
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

  const handleUpdate = async (event: FormEvent) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      variant: { value: string }
      exclusivity: { value: string }
      name: { value: string }
      number: { value: number }
      category: { value: string }
      collect: { value: string }
      release: { value: string }
      availability: { value: string }
    }

    const variant = target.variant.value
    const exclusivity = target.exclusivity.value
    const name = target.name.value
    const number = target.number.value
    const category = target.category.value
    const collect = target.collect.value
    const release = target.release.value
    const availability = target.availability.value

    try {
      await updatePop({
        id: pop.id,
        variant,
        exclusivity,
        name,
        number,
        category,
        collect,
        release,
        availability,
      })
      onEdited()
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <>
      <Tittle className="text-xl" name="Edit pop"></Tittle>

      <Form onSubmit={handleUpdate}>
        <label className="text-text-light text-lg font-normal">Variant:</label>
        <Select
          id="variant-select"
          name="variant"
          options={variantsOptions}
          defaultValue={pop.variant}
        />

        <label className="text-text-light text-lg font-normal">
          Exclusivity:
        </label>
        <Select
          id="exclusivity-select"
          name="exclusivity"
          options={exclusivitiesOptions}
          defaultValue={pop.exclusivity}
        />

        <label className="text-text-light text-lg font-normal">Name:</label>
        <Input type="text" name="name" defaultValue={pop.name} />
        <label className="text-text-light text-lg font-normal">Number:</label>

        <Input type="number" name="number" defaultValue={`${pop.number}`} />
        <label className="text-text-light text-lg font-normal">Category:</label>
        <Select
          id="category-select"
          name="category"
          options={categoriesOptions}
          defaultValue={pop.category.id}
        />

        <label className="text-text-light text-lg font-normal">
          Collection:
        </label>
        <Input type="text" name="collect" defaultValue={pop.collect} />
        <label className="text-text-light text-lg font-normal">Release:</label>
        <Input type="text" name="release" defaultValue={pop.release} />

        <label className="text-text-light text-lg font-normal">
          Availability:
        </label>
        <Select
          id="availability-select"
          name="availability"
          options={availabilitiesOptions}
          defaultValue={pop.availability}
        />

        <GeneralButton tittle="Save" />
      </Form>
    </>
  )
}