/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ReactNode } from 'react'
import Link from 'next/link'

type TProps = React.HTMLAttributes<HTMLAnchorElement> & {
  path?: string
  children: ReactNode
  className?: string
  title?: string
}

const Anchor = ({ path, children, className, title, ...rest }: TProps) => {
  if (!path) return null

  const requestPlan = () => {
    if (title === '랩키드 6' || title === '랩키드 7')
      return alert('PRO 플랜을 가입해주세요!')
  }

  return (
    <Link href={path} className={className} onClick={requestPlan} {...rest}>
      {children}
    </Link>
  )
}

export default Anchor
