import { FormEvent } from 'react'
import Form from '../library/Form'
import Tittle from '../library/Tittle'
import GeneralButton from './GeneralButton'
import updateUserLocation from '../logic/updateUserLocation'
import { User } from '../logic/retrieveUser'
import Select from './Select'
import useAppContext from '../hooks/useAppContext'

export default function UpdateLocationForm({
  onUpdated,
  user,
}: {
  user: User
  onUpdated: () => void
}) {
  const { alert } = useAppContext()

  const locations = [
    {
      key: 'location-a-coruña',
      value: 'A Coruña (La Coruña)',
      label: 'A Coruña (La Coruña)',
    },
    {
      key: 'location-alava',
      value: 'Álava',
      label: 'Álava',
    },
    {
      key: 'location-albacete',
      value: 'Albacete',
      label: 'Albacete',
    },
    {
      key: 'location-alicante',
      value: 'Alicante',
      label: 'Alicante',
    },
    {
      key: 'location-almeria',
      value: 'Almería',
      label: 'Almería',
    },
    {
      key: 'location-asturias',
      value: 'Asturias',
      label: 'Asturias',
    },
    {
      key: 'location-avila',
      value: 'Ávila',
      label: 'Ávila',
    },
    {
      key: 'location-badajoz',
      value: 'Badajoz',
      label: 'Badajoz',
    },
    {
      key: 'location-baleares',
      value: 'Baleares',
      label: 'Baleares',
    },
    {
      key: 'location-barcelona',
      value: 'Barcelona',
      label: 'Barcelona',
    },
    {
      key: 'location-burgos',
      value: 'Burgos',
      label: 'Burgos',
    },
    {
      key: 'location-caceres',
      value: 'Cáceres',
      label: 'Cáceres',
    },
    {
      key: 'location-cadiz',
      value: 'Cádiz',
      label: 'Cádiz',
    },
    {
      key: 'location-cantabria',
      value: 'Cantabria',
      label: 'Cantabria',
    },
    {
      key: 'location-castellon',
      value: 'Castellón',
      label: 'Castellón',
    },
    {
      key: 'location-ciudad-real',
      value: 'Ciudad Real',
      label: 'Ciudad Real',
    },
    {
      key: 'location-cordoba',
      value: 'Córdoba',
      label: 'Córdoba',
    },
    {
      key: 'location-cuenca',
      value: 'Cuenca',
      label: 'Cuenca',
    },
    {
      key: 'location-girona',
      value: 'Girona',
      label: 'Girona',
    },
    {
      key: 'location-granada',
      value: 'Granada',
      label: 'Granada',
    },
    {
      key: 'location-guadalajara',
      value: 'Guadalajara',
      label: 'Guadalajara',
    },
    {
      key: 'location-gipuzkoa',
      value: 'Gipuzkoa',
      label: 'Gipuzkoa',
    },
    {
      key: 'location-huelva',
      value: 'Huelva',
      label: 'Huelva',
    },
    {
      key: 'location-huesca',
      value: 'Huesca',
      label: 'Huesca',
    },
    {
      key: 'location-jaen',
      value: 'Jaén',
      label: 'Jaén',
    },
    {
      key: 'location-la-rioja',
      value: 'La Rioja',
      label: 'La Rioja',
    },
    {
      key: 'location-las-palmas',
      value: 'Las Palmas',
      label: 'Las Palmas',
    },
    {
      key: 'location-leon',
      value: 'León',
      label: 'León',
    },
    {
      key: 'location-lerida',
      value: 'Lérida',
      label: 'Lérida',
    },
    {
      key: 'location-lugo',
      value: 'Lugo',
      label: 'Lugo',
    },
    {
      key: 'location-madrid',
      value: 'Madrid',
      label: 'Madrid',
    },
    {
      key: 'location-malaga',
      value: 'Málaga',
      label: 'Málaga',
    },
    {
      key: 'location-murcia',
      value: 'Murcia',
      label: 'Murcia',
    },
    {
      key: 'location-navarra',
      value: 'Navarra',
      label: 'Navarra',
    },
    {
      key: 'location-ourense',
      value: 'Ourense',
      label: 'Ourense',
    },
    {
      key: 'location-palencia',
      value: 'Palencia',
      label: 'Palencia',
    },
    {
      key: 'location-pontevedra',
      value: 'Pontevedra',
      label: 'Pontevedra',
    },
    {
      key: 'location-salamanca',
      value: 'Salamanca',
      label: 'Salamanca',
    },
    {
      key: 'location-segovia',
      value: 'Segovia',
      label: 'Segovia',
    },
    {
      key: 'location-sevilla',
      value: 'Sevilla',
      label: 'Sevilla',
    },
    {
      key: 'location-soria',
      value: 'Soria',
      label: 'Soria',
    },
    {
      key: 'location-tarragona',
      value: 'Tarragona',
      label: 'Tarragona',
    },
    {
      key: 'location-santa-cruz-de-tenerife',
      value: 'Sta Cruz de Tenerife',
      label: 'Sta Cruz de Tenerife',
    },
    {
      key: 'location-teruel',
      value: 'Teruel',
      label: 'Teruel',
    },
    {
      key: 'location-toledo',
      value: 'Toledo',
      label: 'Toledo',
    },
    {
      key: 'location-valencia',
      value: 'Valencia',
      label: 'Valencia',
    },
    {
      key: 'location-valladolid',
      value: 'Valladolid',
      label: 'Valladolid',
    },
    {
      key: 'location-vizcaya',
      value: 'Vizcaya',
      label: 'Vizcaya',
    },
    {
      key: 'location-zamora',
      value: 'Zamora',
      label: 'Zamora',
    },
    {
      key: 'location-zaragoza',
      value: 'Zaragoza',
      label: 'Zaragoza',
    },
  ]

  const locationsOptions = locations.map((location) => ({
    key: location.key,
    value: location.value,
    label: location.label,
  }))

  const handleUpdate = async (event: FormEvent) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      location: { value: string }
    }

    const location = target.location.value

    try {
      await updateUserLocation({
        location,
      })

      onUpdated()
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <>
      <Tittle className="text-xl" name="Update location"></Tittle>

      <Form onSubmit={handleUpdate}>
        <Select
          id="location-select"
          name="location"
          options={locationsOptions}
          defaultValue={user.location ? user.location : ''}
          size={3}
        />

        <GeneralButton tittle="Update" />
      </Form>
    </>
  )
}
