'use client'

import MainMenu from '@/components/menu/MainMenu'
import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSText from '@/components/ui/text/CSText'
import { useSticky } from '@/hooks'
import clsx from 'clsx'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const Header = () => {
  const { sticky, measuredRef } = useSticky()
  const path = usePathname()
  const { data: user } = useSession()

  const [openMenu, setOpenMenu] = useState<boolean>(false)

  const header =
    'z-10 h-[8.4rem] px-[3.5rem] flex w-full items-center justify-between xl:px-[30rem]'
  // path === '/'
  //   ? 'fixed z-10 h-[8.4rem] bg-black pl-[9rem] shadow-2xl shadow-black/50'
  //   : `${!sticky && 'absolute bg-transparent'} ${
  //       sticky && 'fixed bg-black shadow-2xl shadow-black'
  //     } inset-0 bottom-auto z-10 h-[8.4rem] pl-[9rem]`

  const handleLogout = () => {
    signOut()
    setOpenMenu(false)
  }

  return (
    <>
      <header
        className={clsx('border-b-4 border-b-00A886', header)}
        ref={measuredRef}
      >
        <div className="flex items-center gap-[4.4rem]">
          <Link href={'/'}>
            <AutoSizeImage
              src={'/images/logo.png'}
              className="h-[3.6rem] w-[22.2rem]"
            />
          </Link>
          <MainMenu />
        </div>
        {user ? (
          <div className="relative">
            <AutoSizeImage
              src={'/images/my_profile.png'}
              className="h-[4.2rem] w-[4.2rem] cursor-pointer"
              onClick={() => setOpenMenu(!openMenu)}
            />
            {openMenu && (
              <ul className="absolute w-[15rem] bg-white pt-[1rem] shadow-lg">
                <Link href="/my-info">
                  <li
                    className="cursor-pointer border-b py-[0.5rem] text-center text-16 hover:opacity-75"
                    onClick={() => setOpenMenu(false)}
                  >
                    마이페이지
                  </li>
                </Link>
                <Link href="/">
                  <li
                    className="cursor-pointer border-b py-[0.5rem] text-center text-16 hover:opacity-75"
                    onClick={handleLogout}
                  >
                    로그아웃
                  </li>
                </Link>
              </ul>
            )}
          </div>
        ) : (
          <Link href={'/auth/login'} className="cursor-pointer">
            <CSText size="16" color="black" weight="semiBold">
              로그인
            </CSText>
          </Link>
        )}
      </header>
    </>
  )
}
export default Header
