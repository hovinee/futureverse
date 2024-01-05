'use client'

import clsx from 'clsx'
import Anchor from '../ui/anchor/Anchor'

type TProps = {
  children: React.ReactNode
  id?: string
  path: string
}

const NavLink = ({
  children,
  id,
  path,

  ...rest
}: TProps) => {
  return (
    <Anchor
      path={path}
      id={id}
      className={clsx(
        'flex items-center font-medium leading-snug text-white 2xl:text-[16px]',
      )}
      role="menuitem"
      tabIndex={0}
      {...rest}
    >
      {children}
    </Anchor>
  )
}

export default NavLink
