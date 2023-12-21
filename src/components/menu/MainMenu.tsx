import clsx from 'clsx'
import { useState } from 'react'
import NavLink from './NaveLink'
import Submenu from './SubMenu'
import CSText from '../ui/text/CSText'
import AutoSizeImage from '../ui/auto-size-image/AutoSizeImage'

const MainMenu = () => {
  const [focusId, setFocusId] = useState<string | number>('')
  const handleFocusEvent = (e: React.FocusEvent<HTMLAnchorElement>) => {
    setFocusId(e.target.id)
  }
  const handleBlurEvent = (e: React.FocusEvent<HTMLAnchorElement>) => {
    if (e.currentTarget.contains(e.relatedTarget)) {
      setFocusId('')
    }
  }

  const menu = [
    {
      id: 1,
      label: '진로상담',
      path: '/counsel',
    },
    {
      id: 2,
      label: '진로체험',
      path: '/experience',
      submenu: [
        { title: '랩키드 3', path: '/experience/labkid-03' },
        { title: '랩키드 4', path: '/experience/labkid-04' },
        { title: '랩키드 5', path: '/experience/labkid-05' },
        { title: '랩키드 6', path: '/#!' },
        { title: '랩키드 7', path: '#!' },
      ],
    },
    {
      id: 3,
      label: '진로교육',
      path: '/courses',
    },

    // { id: 4, label: '로그인', path: '/auth/login' },
    // { id: 5, label: '회원가입', path: '/auth/register' },
  ]

  return (
    <nav>
      <ul>
        {menu.map(({ id, label, path, submenu }) => {
          return (
            <li
              key={id}
              className={clsx(
                'group inline-block px-[2.5rem] py-[29px]',
                'relative',
              )}
              role="none"
            >
              <NavLink
                id={`nav-${id}`}
                path={path}
                onFocus={handleFocusEvent}
                onBlur={handleBlurEvent}
              >
                <CSText size="16" color="black" weight="semiBold">
                  {label}
                </CSText>
              </NavLink>
              <div className="absolute bottom-[-0.2rem] left-0 opacity-0 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
                <AutoSizeImage
                  src={'/images/nav_hover.png'}
                  className="h-[2rem] w-[13.6rem]"
                />
              </div>
              {submenu && (
                <Submenu
                  menu={submenu}
                  className="rounded-[1rem] group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
                />
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default MainMenu
