import { lists } from '../../infraestructure/lists'

export default function ListsPages({ params }: { params: { slug: string } }) {
  if (lists.find((element) => element.slug === params.slug)) {
    return <h1>Esto es la ruta catalog/{params.slug}</h1>
  }

  // TODO: redirect to 404 Page Not Found
  // return { notFound: true }
}
