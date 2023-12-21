'use client'

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import './style.css'
import { AnimatePresence, motion } from 'framer-motion'
import ChooseCounselingModal from '../modal/ChooseCounselingModal'
import CSText from '@/components/ui/text/CSText'

interface TProps {
  setWantCounseling: Dispatch<SetStateAction<number>>
  wantCounseling: number
  aiMsg: string
  sendToGPT: () => void
}
const OneByOne = ({
  wantCounseling,
  setWantCounseling,
  sendToGPT,
  aiMsg,
}: TProps) => {
  const [selectCounseling, setSelectCounseling] = useState<boolean>(false)
  const [dots, setDots] = useState('')

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => (prevDots.length === 3 ? '.' : prevDots + '.'))
    }, 500) // 1000ms = 1초마다 점을 추가

    return () => clearInterval(intervalId) // 컴포넌트 언마운트 시 인터벌 클리어
  }, [])

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05, // i는 각 글자의 인덱스로, 각 글자가 순차적으로 나타나도록 지연 시간을 설정합니다.
      },
    }),
  }
  const letters = Array.from(aiMsg)

  return (
    <>
      {selectCounseling ? (
        <div className="h-full w-full pl-[42.5rem] pt-[30rem]">
          <div className="relative w-[43rem]">
            <AutoSizeImage
              src="/images/unity/speech_bubble.png"
              rounded="10"
              className="h-[21.3rem] w-full"
            />
            <div className="absolute inset-y-0 left-0 right-8 p-[3rem] backdrop-blur-[0.1rem]">
              {aiMsg ? (
                <div className="custom-scrollbar h-full overflow-auto">
                  <AnimatePresence>
                    {letters.map((letter, index) => (
                      <motion.span
                        key={index}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={textVariants}
                        className="text-24 text-white"
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <CSText size="24" color="white">
                  {dots}
                </CSText>
              )}
            </div>
          </div>
        </div>
      ) : (
        <ChooseCounselingModal
          setWantCounseling={setWantCounseling}
          wantCounseling={wantCounseling}
          setSelectCounseling={setSelectCounseling}
          sendToGPT={sendToGPT}
        />
      )}
    </>
  )
}

export default OneByOne
