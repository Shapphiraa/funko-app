import { categories } from '../../infraestructure/categories'

export default function CatalogPages({ params }: { params: { slug: string } }) {
  if (categories.find((element) => element.slug === params.slug)) {
    return <h1>Esto es la ruta catalog/{params.slug}</h1>
  }

  // TODO: redirect to 404 Page Not Found
  // return { notFound: true }
}
