'use client'

import Tab from '@/components/tab/Tab'
import WorldTab from '@/components/tab/WorldTab'
import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSButton from '@/components/ui/button/CSButton'
import CSSpan from '@/components/ui/span/CSSpan'
import CSText from '@/components/ui/text/CSText'
import { thumbnailCounseling, thumbnailHealing } from '@/data/unity/data'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useState } from 'react'
import { ReactUnityEventParameter } from 'react-unity-webgl/distribution/types/react-unity-event-parameters'

interface TProps {
  setHealingMethod: Dispatch<SetStateAction<number>>
  setSelectPlace: Dispatch<SetStateAction<ReactUnityEventParameter>>
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
                      <AutoSizeImage src={thumbnail} full />
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
            <div className="flex h-full w-[47.5rem] flex-col rounded-[1rem] bg-white p-[3rem]">
              <div>
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
                <div className="mt-[0.8rem] flex gap-[1rem]">
                  <div className="flex items-center gap-[0.2rem]">
                    <AutoSizeImage
                      src={'/images/star.png'}
                      className="h-[2rem] w-[2rem]"
                    />
                    <CSText size="18" color="black">
                      4.8{' '}
                      <CSSpan className="text-[#AFAFAF]" size="18">
                        (196)
                      </CSSpan>
                    </CSText>
                  </div>
                  <div className="flex items-center gap-[0.2rem]">
                    <AutoSizeImage
                      src={'/images/unity/healing/heart.png'}
                      className="h-[1.6rem] w-[1.9rem]"
                    />
                    <CSText size="18" color="black" weight="bold">
                      1,123
                    </CSText>
                  </div>
                </div>

                <div className="mt-[2rem] flex gap-[2.3rem]">
                  <CSButton
                    className="border-b bg-gradient-to-r from-[#FF95AE] to-[#B02DFF]"
                    width="260"
                    height="50"
                    size="18"
                    color="white"
                    rounded="10"
                    weight="bold"
                  >
                    Basic 플랜 업그레이드
                  </CSButton>

                  <div className="grid flex-1 place-items-center">
                    <div className="flex gap-[2rem]">
                      <div className="flex flex-col items-center gap-[0.3rem]">
                        <AutoSizeImage
                          src={'/images/unity/healing/like.png'}
                          className="h-[2rem] w-[2.3rem]"
                        />

                        <CSText size="14" color="black">
                          좋아요
                        </CSText>
                      </div>
                      <div className="flex flex-col items-center gap-[0.3rem]">
                        <AutoSizeImage
                          src={'/images/unity/healing/share.png'}
                          className="h-[2rem] w-[2rem]"
                        />

                        <CSText size="14" color="black">
                          공유하기
                        </CSText>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="custom-scrollbar mt-[3rem] flex-1 overflow-auto border-t border-t-[#E1DDDD]">
                <WorldTab />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HealingModal
