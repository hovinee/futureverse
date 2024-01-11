import clsx from 'clsx'
import { useState } from 'react'
import NavLink from './NaveLink'
import Submenu from './SubMenu'
import CSText from '../ui/text/CSText'
import AutoSizeImage from '../ui/auto-size-image/AutoSizeImage'

const MainMenu = () => {
  const menu = [
    {
      id: 1,
      label: 'ABOUT 패스파인더 메타',

      path: 'https://www.pathfindermeta.com',
    },
    {
      id: 2,
      label: 'GO 패스파인더 메타',
      path: '/main',
    },
    {
      id: 3,
      label: 'GO 상담월드',
      path: '/counsel/intro_lobby',
    },
    {
      id: 4,
      label: 'XR 직업체험',
      path: '/experience',
      submenu: [
        { title: '랩키드 3', path: '/experience/labkid-03' },
        { title: '랩키드 4', path: '/experience/labkid-04' },
        { title: '랩키드 5', path: '/experience/labkid-05' },
        { title: '랩키드 6', path: '/experience' },
        { title: '랩키드 7', path: '/experience' },
      ],
    },
    {
      id: 5,
      label: 'LEARN 배움',
      sub_label: '(AI·메타버스 캠퍼스)',
      path: '/digital-literacy',
      submenu: [
        { title: '디지털 \n리터러시', path: '/digital-literacy' },
        { title: '진로상담심리\n캠퍼스', path: '/career-counseling' },
        { title: '크리에이터', path: '/courses' },
      ],
    },

    {
      id: 6,
      label: '구독 플랜',
      path: '/subscribe',
    },
  ]

  return (
    <nav>
      <ul>
        {menu.map(({ id, label, path, submenu }) => {
          return (
            <li
              key={id}
              className={clsx(
                'group relative inline-flex items-center px-[3rem]',
              )}
              role="none"
            >
              <NavLink
                id={`nav-${id}`}
                path={path}
                className="relative hover:opacity-50"
              >
                <CSText size="16" color="white" weight="medium">
                  {label}
                </CSText>
              </NavLink>

              {submenu && <Submenu menu={submenu} />}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default MainMenu
