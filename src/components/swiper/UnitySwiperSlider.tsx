'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-cards'
import { EffectCards } from 'swiper/modules'
import CSText from '../ui/text/CSText'
import AutoSizeImage from '../ui/auto-size-image/AutoSizeImage'

import { useState } from 'react'
import { Dispatch, SetStateAction } from 'react'
import CSButton from '../ui/button/CSButton'
import {
  selectCounselingImage,
  selectHealingImage,
  thumbnailCounseling,
  thumbnailHealing,
} from '@/data/unity/data'
import clsx from 'clsx'

interface TProps {
  selectMethod: Dispatch<SetStateAction<number>>
  setSelectPlace: Dispatch<SetStateAction<string>>
  counseling?: boolean
  healing?: boolean
}

const UnitySwiperSlider = ({
  selectMethod,
  setSelectPlace,
  counseling = false,
  healing = false,
}: TProps) => {
  const [realIndex, setRealIndex] = useState<number>(0)

  const handleEntrance = (index: number) => {
    counseling && selectMethod(index)
    counseling && setSelectPlace('counseling')
    healing && selectMethod(index)
    healing && setSelectPlace('healing')
  }

  const thumbnail = counseling ? thumbnailCounseling : thumbnailHealing
  const selectImage = counseling ? selectCounselingImage : selectHealingImage

  return (
    <>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="h-[53rem] w-[56.3rem]"
        onSlideChange={(swiper) => setRealIndex(swiper.realIndex)}
      >
        {thumbnail.map(({ thumbnail, title }, index) => (
          <SwiperSlide
            className="relative h-full w-full rounded-[1rem] bg-white p-[4rem]"
            key={index}
          >
            <div
              className="absolute right-[1.5rem] top-[1.5rem]"
              onClick={() => setSelectPlace('')}
            >
              <AutoSizeImage
                src={'/images/unity/close.png'}
                rounded="10"
                className="h-[2rem] w-[2rem]"
              />
            </div>
            <div className="mx-auto w-[31.5rem]">
              <CSText size="16" color="black" weight="bold">
                {counseling ? '왁자지껄 상담소' : '힐링가득 치유소'}
              </CSText>
              <CSText size="35" color="black" weight="bold">
                {title}
              </CSText>
              <AutoSizeImage
                src={thumbnail}
                rounded="10"
                className="mt-[2rem] h-[18.5rem] w-full"
              />
              <div
                className={clsx(
                  'flex justify-center',
                  counseling ? 'gap-[2.8rem]' : 'gap-[1rem]',
                )}
              >
                {selectImage.map((value, index) => (
                  <AutoSizeImage
                    key={index}
                    src={realIndex === index ? value.select : value.no_select}
                    rounded="10"
                    className="mt-[2rem] h-[7rem] w-[7rem]"
                  />
                ))}
              </div>
              <CSButton
                width="184"
                height="50"
                bgColor="181818"
                size="24"
                color="white"
                rounded="5"
                weight="semiBold"
                className="mx-auto mt-[2rem]"
                onClick={() => handleEntrance(index)}
              >
                입장하기
              </CSButton>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default UnitySwiperSlider
