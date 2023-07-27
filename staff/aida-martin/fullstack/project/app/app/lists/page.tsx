import Tittle from '../components/Tittle'
import ListPreview from '../components/ListPreview'
import ContainerLink from '../components/ContainerLink'
import { lists } from '../infraestructure/lists'
import { IconBookmarkFill, IconHeartFill } from '../components/Icons'

export default function Lists() {
  return (
    <section className="p-4 bg-white">
      <Tittle name="Your lists" />

      <div className="flex flex-col gap-3">
        <ContainerLink route={lists[0].route}>
          <ListPreview
            tittle="My collection"
            icon={<IconBookmarkFill size="70px" />}
            quantity={323}
            subtittle="Last added"
            image="/previews/Preview-Snow-White.webp"
            color="text-[#007cec]"
          ></ListPreview>
        </ContainerLink>

        <ContainerLink route={lists[1].route}>
          <ListPreview
            tittle="My whislist"
            icon={<IconHeartFill size="70px" />}
            quantity={102}
            subtittle="Last added"
            image="/previews/Preview-Peter-Pan.webp"
            color="text-[#EC0063]"
          ></ListPreview>
        </ContainerLink>
      </div>
    </section>
  )
}
