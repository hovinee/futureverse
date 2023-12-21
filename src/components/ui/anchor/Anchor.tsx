/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ReactNode } from 'react'
import Link from 'next/link'

type TProps = React.HTMLAttributes<HTMLAnchorElement> & {
  path?: string
  children: ReactNode
  className?: string
  onClick?: () => void
  onFocus?: (e: React.FocusEvent<HTMLAnchorElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLAnchorElement>) => void
}

const Anchor = ({
  path,
  children,
  className,
  rel,
  onClick,
  onFocus,
  onBlur,
  ...rest
}: TProps) => {
  if (!path) return null

  return (
    <Link
      href={path}
      className={className}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      {...rest}
    >
      {children}
    </Link>
  )
}

export default Anchor
