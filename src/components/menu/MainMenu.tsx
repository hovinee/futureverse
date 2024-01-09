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
      label: '패스파인더란?',
      path: 'https://www.pathfindermeta.com',
    },
    {
      id: 2,
      label: '진로상담',
      path: '/counsel',
    },
    {
      id: 3,
      label: '진로체험',
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
      id: 4,
      label: '진로교육',
      path: '/digital-literacy',
      submenu: [
        { title: '디지털 \n리터러시', path: '/digital-literacy' },
        { title: '크리에이터', path: '/courses' },
      ],
    },
    {
      id: 5,
      label: '3D광장',
      path: '/main',
    },
    {
      id: 6,
      label: '가격 플랜',
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
                'group inline-block px-[2.5rem] py-[29px]',
                'relative',
              )}
              role="none"
            >
              <NavLink id={`nav-${id}`} path={path}>
                <CSText size="16" color="black" weight="semiBold">
                  {label}
                </CSText>
              </NavLink>

              <div className="absolute bottom-[-0.2rem] left-0 hidden group-hover:pointer-events-auto group-hover:block">
                <AutoSizeImage
                  src={'/images/nav_hover.png'}
                  className="h-[2rem] w-[13.6rem]"
                />
              </div>
              {submenu && <Submenu menu={submenu} />}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default MainMenu
