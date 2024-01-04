'use client'

import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSButton from '@/components/ui/button/CSButton'
import CSText from '@/components/ui/text/CSText'
import { thumbnailCounseling, thumbnailHealing } from '@/data/unity/data'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useState } from 'react'

interface TProps {
  setHealingMethod: Dispatch<SetStateAction<number>>
  setSelectPlace: Dispatch<SetStateAction<string>>
  counseling?: boolean
}

const HealingModal = ({
  setHealingMethod,
  setSelectPlace,
  counseling,
}: TProps) => {
  const [selectHealing, setSelectHealing] = useState<boolean>(false)
  const [healingNum, setHealingNum] = useState<number>(0)
  const thumbnail = counseling ? thumbnailCounseling : thumbnailHealing

  const handleHealing = (num: number) => {
    setSelectHealing(true)
    setHealingNum(num)
  }
  return (
    <div className="grid h-full w-full place-items-center">
      {/* <UnitySwiperSlider
        selectMethod={setHealingMethod}
        setSelectPlace={setSelectPlace}
        healing
      /> */}
      <div
        className={clsx(
          'relative h-[80rem] max-w-[150rem] rounded-lg bg-white/80',
          selectHealing
            ? 'px-[11rem] pb-[12rem] pt-[11rem]'
            : 'px-[10rem] py-[6rem]',
        )}
      >
        <div
          className="absolute right-[1.5rem] top-[1.5rem]"
          onClick={() => setSelectPlace('')}
        >
          <AutoSizeImage
            src={'/images/unity/close.png'}
            rounded="10"
            className="h-[1.6rem] w-[1.6rem]"
          />
        </div>
        {!selectHealing && (
          <>
            <CSText size="24" color="black" weight="bold">
              금주의 인기 치유소
            </CSText>
            <div className="grid grid-cols-4 gap-[1.5rem]">
              {thumbnail.map(({ thumbnail, title, sub_title }, index) => (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() => handleHealing(index)}
                >
                  <div className="mt-[2rem]">
                    <div className="w-[30rem]">
                      {/* <CSText size="16" color="black" weight="bold">
                      {counseling ? '왁자지껄 상담소' : '힐링가득 치유소'}
                    </CSText>
                    */}
                      <AutoSizeImage src={thumbnail} full />
                    </div>
                    <div className="h-[8rem] w-full rounded-b-[1rem] bg-white pl-[1.9rem] pt-[1.5rem]">
                      <CSText size="21" color="black" weight="bold">
                        {title}
                      </CSText>
                      <CSText size="14" color="black" className="mt-[0.5rem]">
                        {sub_title}
                      </CSText>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {selectHealing && (
          <div className="flex h-full gap-[1.5rem]">
            <div className="flex flex-col">
              <AutoSizeImage
                src={thumbnail[0].thumbnail}
                className="h-[45rem] w-[80rem]"
              />
              <div className="mt-[1.5rem] grid flex-1 grid-cols-4 gap-[1.5rem]">
                <div className="h-full rounded-xl bg-[#D9D9D9]" />
                <div className="h-full rounded-xl bg-[#D9D9D9]" />
                <div className="h-full rounded-xl bg-[#D9D9D9]" />
                <div className="h-full rounded-xl bg-[#D9D9D9]" />
              </div>
            </div>
            <div className="h-full w-[47.5rem] rounded-[1rem] bg-white p-[3rem]">
              <CSText size="31" color="black" weight="bold">
                {thumbnail[0].title}
              </CSText>
              <CSText size="18" color="black" className="mt-[1rem]">
                {thumbnail[0].description}
              </CSText>
              <div className="flex gap-[0.5rem]">
                {thumbnail[0].tag.map((value, index) => (
                  <CSText
                    size="16"
                    className="mt-[0.8rem] rounded-[1rem] border border-[#DCDCDC] px-[1rem] text-[#AFAFAF]"
                    key={index}
                  >
                    {value}
                  </CSText>
                ))}
              </div>
              <div className="mt-[3rem] flex gap-[2rem]">
                <AutoSizeImage
                  src={'/images/unity/healing/like.png'}
                  className="h-[1.823rem] w-[2.09rem]"
                />
                <AutoSizeImage
                  src={'/images/unity/healing/share.png'}
                  className="h-[2rem] w-[2rem]"
                />
              </div>
              <CSButton
                className="mt-[3.4rem] border-b bg-gradient-to-r from-[#FF95AE] to-[#B02DFF]"
                height="50"
                size="24"
                color="white"
                rounded="10"
                weight="bold"
              >
                입장하기
              </CSButton>
              <div className="mt-[2rem] border-t border-t-[#E1DDDD]">
                <CSText
                  size="21"
                  color="black"
                  weight="bold"
                  className="mt-[1rem]"
                >
                  World Information
                </CSText>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HealingModal
