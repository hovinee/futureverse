'use client'

import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import clsx from 'clsx'
import { motion, useAnimation } from 'framer-motion'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ChooseCounselingModal from '../modal/ChooseCounselingModal'
import UnitySection from '../section/UnitySection'
import ChooseMoodModal from '../modal/ChooseMoodModal'

interface TProps {
  sendToGPT: (selectMesssage: string) => void
  setWantCounseling: Dispatch<SetStateAction<number>>
  setAiMsg: Dispatch<SetStateAction<string>>
  setTutorialStep: Dispatch<SetStateAction<number>>
  tutorialStep: number
  wantCounseling: number
  roomMood: (num: number) => void
  letsDance: () => void
}

const Menu = ({
  sendToGPT,
  setWantCounseling,
  setAiMsg,
  tutorialStep,
  wantCounseling,
  setTutorialStep,
  roomMood,
  letsDance,
}: TProps) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const [openMood, setOpenMood] = useState<boolean>(false)
  const [selectCounseling, setSelectCounseling] = useState<boolean>(false)

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

  const controls = useAnimation()

  useEffect(() => {
    const intervalId = setInterval(() => {
      controls.start({
        scale: [1, 1.2, 1], // 시작, 중간, 끝 스케일 값 설정
        transition: {
          duration: 1, // 애니메이션 지속 시간 (1초)
        },
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [controls])

  return (
    <>
      <div className="absolute bottom-[4rem] left-[3rem]">
        <div className="flex items-center justify-center gap-[4em]">
          <div
            className={clsx(
              'relative w-[5.2rem] cursor-pointer',
              tutorialStep === 5 && 'z-10 cursor-pointer',
            )}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <AutoSizeImage src="/images/unity/menu.png" full />

            {tutorialStep === 5 && (
              <>
                <motion.div
                  className={clsx(
                    'absolute right-[-5rem] top-[-6.5rem] w-[7rem]',
                  )}
                  animate={controls}
                >
                  <img
                    src="/images/unity/finger.png"
                    alt="Finger"
                    className="h-full w-full"
                  />
                </motion.div>
                <div className="absolute right-[-35rem] top-[-13rem] grid h-[6rem] w-[28rem] place-items-center rounded-xl border border-[#E1792D] bg-white text-18 font-bold">
                  상담 종류의 아이콘을 눌러보세요
                </div>
              </>
            )}
          </div>

          <div
            className={clsx(
              'relative w-[5.2rem] cursor-pointer',
              tutorialStep === 7 && 'z-10',
            )}
            onClick={() => setOpenMood(!openMood)}
          >
            <AutoSizeImage
              full
              className="h-[2.324rem] w-[2.8rem]"
              src="/images/unity/room.png"
            />

            {tutorialStep === 7 && (
              <>
                <motion.div
                  className={clsx(
                    'absolute right-[-5rem] top-[-6.5rem] w-[7rem]',
                  )}
                  animate={controls}
                >
                  <img
                    src="/images/unity/finger.png"
                    alt="Finger"
                    className="h-full w-full"
                  />
                </motion.div>
                <div className="absolute right-[-35rem] top-[-13rem] grid h-[6rem] w-[28rem] place-items-center rounded-xl border border-[#E1792D] bg-white text-18 font-bold">
                  방 분위기 아이콘을 눌러보세요
                </div>
              </>
            )}
          </div>
          <div
            className={clsx(
              'relative w-[5.2rem] cursor-pointer',
              tutorialStep === 10 && 'z-10',
            )}
            onClick={() => {
              tutorialStep === 10 && setTutorialStep((num) => num + 1)
              letsDance()
            }}
          >
            <AutoSizeImage full src="/images/unity/dance.png" />

            {tutorialStep === 10 && (
              <>
                <motion.div
                  className={clsx(
                    'absolute right-[-5rem] top-[-6.5rem] w-[7rem] ',
                  )}
                  animate={controls}
                >
                  <img
                    src="/images/unity/finger.png"
                    alt="Finger"
                    className="h-full w-full"
                  />
                </motion.div>
                <div className="absolute right-[-35rem] top-[-13rem] grid h-[6rem] w-[28rem] place-items-center rounded-xl border border-[#E1792D] bg-white text-18 font-bold">
                  춤추기를 한 번 눌러보세요!
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {openMenu && (
        <UnitySection>
          <ChooseCounselingModal
            setWantCounseling={setWantCounseling}
            wantCounseling={wantCounseling}
            setSelectCounseling={setSelectCounseling}
            sendToGPT={sendToGPT}
            setOpenMenu={setOpenMenu}
            setTutorialStep={setTutorialStep}
            tutorialStep={tutorialStep}
          />
        </UnitySection>
      )}
      {openMood && (
        <UnitySection>
          <ChooseMoodModal
            setTutorialStep={setTutorialStep}
            tutorialStep={tutorialStep}
            setOpenMood={setOpenMood}
            roomMood={roomMood}
          />
        </UnitySection>
      )}
    </>
  )
}

export default Menu
