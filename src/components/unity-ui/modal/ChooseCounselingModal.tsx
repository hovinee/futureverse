'use client'

import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSButton from '@/components/ui/button/CSButton'
import CSText from '@/components/ui/text/CSText'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'

interface TProps {
  wantCounseling: number
  setWantCounseling: Dispatch<SetStateAction<number>>
  setSelectCounseling: Dispatch<SetStateAction<boolean>>
  sendToGPT: (selectMesssage: string) => void
}

const ChooseCounselingModal = ({
  setWantCounseling,
  wantCounseling,
  setSelectCounseling,
  sendToGPT,
}: TProps) => {
  const wantCounselingData = [
    { title: '진로', image_url: '/images/unity/counseling/want_future.png' },
    { title: '심리', image_url: '/images/unity/counseling/want_mind.png' },
    { title: '친구', image_url: '/images/unity/counseling/want_friend.png' },
    { title: '연인', image_url: '/images/unity/counseling/want_love.png' },
    { title: '가족', image_url: '/images/unity/counseling/want_family.png' },
  ]

  const selectMesssage = `${wantCounselingData[wantCounseling].title}에 대해 상담하고 싶어`
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="h-[32.8rem] w-[69.2rem] rounded-[1rem] bg-white/75">
        <div className="flex justify-end pr-[1rem] pt-[1rem]">
          <AutoSizeImage
            src="/images/unity/close.png"
            rounded="10"
            className="h-[2rem] w-[2rem]"
          />
        </div>
        <div className="flex flex-col items-center">
          <CSText size="24" color="black" weight="bold">
            원하시는 상담을 골라주세요
          </CSText>

          <div className="mt-[2.1rem] flex gap-[2.2rem]">
            {wantCounselingData.map(({ title, image_url }, index) => (
              <div
                className="flex flex-col items-center gap-[2rem]"
                key={index}
              >
                <div
                  className={clsx(
                    'h-[9.8rem] w-[9.8rem] rounded-full border',
                    index === wantCounseling && 'border-black',
                  )}
                  key={index}
                  onClick={() => setWantCounseling(index)}
                >
                  <AutoSizeImage
                    src={image_url}
                    rounded="10"
                    className="h-full w-full"
                  />
                </div>
                <CSText
                  size="20"
                  color={clsx(index === wantCounseling ? 'black' : 'B8B8B8')}
                  weight={clsx(index === wantCounseling ? 'bold' : 'normal')}
                >
                  {title}
                </CSText>
              </div>
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
            onClick={() => {
              setSelectCounseling(true), sendToGPT(selectMesssage)
            }}
          >
            선택하기
          </CSButton>
        </div>
      </div>
    </div>
  )
}

export default ChooseCounselingModal
