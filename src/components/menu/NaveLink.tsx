import clsx from 'clsx'
import Anchor from '../ui/anchor/Anchor'

type TProps = {
  children: React.ReactNode
  id?: string
  path: string
  hoverStyle?: 'A' | 'B'
  color?: 'light' | 'dark'
  onKeyPress?: (e: React.KeyboardEvent<HTMLAnchorElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLAnchorElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLAnchorElement>) => void
}

const NavLink = ({
  children,
  id,
  path,
  hoverStyle,
  color,
  onKeyPress,
  onFocus,
  onBlur,
  ...rest
}: TProps) => {
  return (
    <Anchor
      path={path}
      id={id}
      className={clsx(
        'flex items-center font-medium leading-snug text-white 2xl:text-[16px]',
      )}
      onKeyPress={onKeyPress}
      onFocus={onFocus}
      onBlur={onBlur}
      role="menuitem"
      tabIndex={0}
      {...rest}
    >
      {children}
    </Anchor>
  )
}

export default NavLink
