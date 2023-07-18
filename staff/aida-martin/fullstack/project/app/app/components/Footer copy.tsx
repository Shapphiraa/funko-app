import FooterLink from './FooterLink'
import {
  IconHome,
  IconHomeFill,
  IconCatalog,
  IconCatalogFill,
  IconLists,
  IconListsFill,
  IconTrade,
  IconTradeFill,
  IconAccount,
  IconAccountFill,
} from './Icons'

export default function Footer() {
  return (
    <footer className="bg-[#007CEC] text-white px-2">
      <ul className="flex gap-2 text-white font-semibold text-sm text-center h-full items-center">
        <li className="grow shrink-0 basis-0">
          <FooterLink
            route="/"
            icon={<IconHome size="24px" />}
            iconFill={<IconHomeFill size="24px" />}
            name="Home"
          />
        </li>
        <li className="grow shrink-0 basis-0">
          <FooterLink
            route="/catalog"
            icon={<IconCatalog size="24px" />}
            iconFill={<IconCatalogFill size="24px" />}
            name="Catalog"
          />
        </li>
        <li className="grow shrink-0 basis-0">
          <FooterLink
            route="/lists"
            icon={<IconLists size="24px" />}
            iconFill={<IconListsFill size="24px" />}
            name="Lists"
          />
        </li>
        <li className="grow shrink-0 basis-0">
          <FooterLink
            route="/trade"
            icon={<IconTrade size="24px" />}
            iconFill={<IconTradeFill size="24px" />}
            name="Trade"
          />
        </li>
        <li className="grow shrink-0 basis-0">
          <FooterLink
            route="/account"
            icon={<IconAccount size="24px" />}
            iconFill={<IconAccountFill size="24px" />}
            name="Account"
          />
        </li>
      </ul>
    </footer>
  )
}
