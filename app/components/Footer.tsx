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

const links = [
  {
    label: 'Home',
    route: '/',
    _icon: IconHome,
    _iconFill: IconHomeFill,
  },
  {
    label: 'Catalog',
    route: '/catalog',
    _icon: IconCatalog,
    _iconFill: IconCatalogFill,
  },
  {
    label: 'Lists',
    route: '/lists',
    _icon: IconLists,
    _iconFill: IconListsFill,
  },
  {
    label: 'Trade',
    route: '/trade',
    _icon: IconTrade,
    _iconFill: IconTradeFill,
  },
  {
    label: 'Account',
    route: '/account',
    _icon: IconAccount,
    _iconFill: IconAccountFill,
  },
]

export default function Footer() {
  return (
    <footer className="bg-general-blue text-white px-2">
      <ul className="flex gap-2 text-white font-semibold text-sm text-center h-full items-center">
        {links.map(({ label, route, _icon, _iconFill }) => (
          <li className="grow shrink-0 basis-0" key={route}>
            <FooterLink
              route={route}
              icon={<_icon size="24px" />}
              iconFill={<_iconFill size="24px" />}
              name={label}
            />
          </li>
        ))}
      </ul>
    </footer>
  )
}
