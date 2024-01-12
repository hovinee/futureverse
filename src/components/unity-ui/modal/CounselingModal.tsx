import WorldTab from '@/components/tab/WorldTab'
import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSButton from '@/components/ui/button/CSButton'
import CSSpan from '@/components/ui/span/CSSpan'
import CSText from '@/components/ui/text/CSText'
import { thumbnailCounseling } from '@/data/unity/data'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useState } from 'react'
import { ReactUnityEventParameter } from 'react-unity-webgl/distribution/types/react-unity-event-parameters'

interface TProps {
  setCounselingMethod: Dispatch<SetStateAction<number>>
  setSelectPlace: Dispatch<SetStateAction<ReactUnityEventParameter>>
}

const CounselingModal = ({ setCounselingMethod, setSelectPlace }: TProps) => {
  const [counselingNum, setCounselingNum] = useState<number>(0)
  const [selectCounseling, setSelectCounseling] = useState<boolean>(false)

  const handleCounseling = (num: number) => {
    setSelectCounseling(true)
    setCounselingNum(num)
  }

  const handleEntrance = (index: number) => {
    if (index === 1 || 2) return alert('베이직 플랜을 구독해주세용')
    setCounselingMethod(index)
    setSelectPlace('counseling')
  }
  return (
    <div className="grid h-full w-full place-items-center">
      <div
        className={clsx(
          'relative h-[80rem] max-w-[150rem] rounded-lg bg-white/80',
          selectCounseling
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
        {!selectCounseling && (
          <>
            <CSText size="24" color="black" weight="bold">
              금주의 인기 상담
            </CSText>
            <div className="grid grid-cols-4 gap-[1.5rem]">
              {thumbnailCounseling.map(
                ({ thumbnail_image, title, sub_title }, index) => (
                  <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => handleCounseling(index)}
                  >
                    <div className="mt-[2rem]">
                      <div className="w-[30rem]">
                        <AutoSizeImage src={thumbnail_image[0]} full />
                        <div className="h-[8rem] w-full rounded-b-[1rem] bg-white pl-[1.9rem] pt-[1.5rem]">
                          <CSText size="21" color="black" weight="bold">
                            {title}
                          </CSText>
                          <CSText
                            size="14"
                            color="black"
                            className="mt-[0.5rem]"
                          >
                            {sub_title}
                          </CSText>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </>
        )}

        {selectCounseling && (
          <div className="flex h-full gap-[1.5rem]">
            <div className="flex flex-col">
              <AutoSizeImage
                src={thumbnailCounseling[0].thumbnail_image[0]}
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
                  {thumbnailCounseling[counselingNum].title}
                </CSText>
                <CSText size="18" color="black" className="mt-[1rem]">
                  {thumbnailCounseling[counselingNum].description}
                </CSText>
                <div className="flex gap-[0.5rem]">
                  {thumbnailCounseling[counselingNum].tag.map(
                    (value, index) => (
                      <CSText
                        size="16"
                        className="mt-[0.8rem] rounded-[1rem] border border-[#DCDCDC] px-[1rem] text-[#AFAFAF]"
                        key={index}
                      >
                        {value}
                      </CSText>
                    ),
                  )}
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
                    onClick={() => handleEntrance(counselingNum)}
                  >
                    입장하기
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

export default CounselingModal
