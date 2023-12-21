'use client'

import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useState } from 'react'

interface TProps {
  sendToGPT: (selectMesssage: string) => void
  setWantCounseling: Dispatch<SetStateAction<number>>
  setAiMsg: Dispatch<SetStateAction<string>>
}

const Menu = ({ sendToGPT, setWantCounseling, setAiMsg }: TProps) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const category = [
    { title: '진로', image_url: '/images/unity/category/future.png' },
    { title: '심리', image_url: '/images/unity/category/mind.png' },
    { title: '친구', image_url: '/images/unity/category/friend.png' },
    { title: '연인', image_url: '/images/unity/category/love.png' },
    { title: '가족', image_url: '/images/unity/category/family.png' },
  ]

  const changeCategory = (index: number) => {
    const selectMesssage = `${category[index].title}에 대해 상담하고 싶어`
    sendToGPT(selectMesssage)
    setWantCounseling(index)
    setOpenMenu(false)
    setAiMsg('')
  }

  return (
    <div className="absolute bottom-[4rem] left-[4.2rem] ">
      <>
        {openMenu && (
          <div className="-mb-[1rem] flex h-[27.1rem] w-[5.2rem] flex-col items-center justify-center gap-[2rem] rounded-[1rem] bg-black/25">
            <div
              className="absolute top-[0.7rem] cursor-pointer"
              onClick={() => setOpenMenu(false)}
            >
              <AutoSizeImage
                src="/images/unity/category/bottom_arrow.png"
                className="h-[0.5rem] w-[0.9rem] cursor-pointer"
              />
            </div>
            {category.map((value, index) => (
              <div key={index}>
                {index === 0 && (
                  <AutoSizeImage
                    src={value.image_url}
                    className="h-[2.7rem] w-[2.6rem] cursor-pointer"
                    onClick={() => changeCategory(index)}
                  />
                )}
                {index === 1 && (
                  <AutoSizeImage
                    src={value.image_url}
                    className="h-[2.1rem] w-[3.5rem] cursor-pointer"
                    onClick={() => changeCategory(index)}
                  />
                )}
                {index === 2 && (
                  <AutoSizeImage
                    src={value.image_url}
                    className="h-[3rem] w-[2.5rem] cursor-pointer"
                    onClick={() => changeCategory(index)}
                  />
                )}
                {index === 3 && (
                  <AutoSizeImage
                    src={value.image_url}
                    className="h-[2.87rem] w-[2.7rem] cursor-pointer"
                    onClick={() => changeCategory(index)}
                  />
                )}
                {index === 4 && (
                  <AutoSizeImage
                    src={value.image_url}
                    className="h-[2.3rem] w-[2.84rem] cursor-pointer"
                    onClick={() => changeCategory(index)}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </>

      <div
        className={clsx(
          'grid h-[5.2rem] w-[5.2rem] cursor-pointer place-items-center rounded-[1.1rem]',
          openMenu ? 'bg-383838' : 'bg-D9D9D9',
        )}
        onClick={() => setOpenMenu(!openMenu)}
      >
        <AutoSizeImage
          src={'/images/unity/menu.png'}
          className="h-[1.8rem] w-[2.1rem]"
        />
      </div>
    </div>
  )
}

export default Menu
