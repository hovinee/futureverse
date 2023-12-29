'use client'

import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSInput from '@/components/ui/input/CSInput'
import CSLabel from '@/components/ui/label/CSLabel'
import CSText from '@/components/ui/text/CSText'
import clsx from 'clsx'
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import Image from 'next/image'
import { tutorial } from '@/data/unity/data'

interface TProps {
  sendToGPT: () => void
  aiMsg: string
  userMsg: string
  setUserMsg: Dispatch<SetStateAction<string>>
  setAiMsg: Dispatch<SetStateAction<string>>
  tutorialStep: number
  setTutorialStep: Dispatch<SetStateAction<number>>
}

interface TTutorial {
  text: string
  select?: string[]
  who?: string
}

const Chat = ({
  sendToGPT,
  aiMsg,
  userMsg,
  setUserMsg,
  setAiMsg,
  tutorialStep,
  setTutorialStep,
}: TProps) => {
  const [chat, setChat] = useState<TTutorial[]>([
    {
      text: '안녕? 어서와~ 난 나라야. 오늘 내가 너의 1일 친구가 되어 줄게. 뭐든 털어놔!',
      select: ['응 좋아!', '고민좀 해볼게'],
    },
  ])
  const [selectMsg, setSelectMsg] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const selectTutorial = (msg: string) => {
    setSelectMsg((prev) => [...prev, msg])
    setTutorialStep((num) => num + 1)
    setChat((prevMessages) => [...prevMessages, tutorial[tutorialStep + 1]])
  }

  useEffect(() => {
    if (aiMsg) {
      setChat((prevMessages) => [...prevMessages, { text: aiMsg, who: 'ai' }])
    }
  }, [aiMsg])

  useEffect(() => {
    // 스크롤을 맨 아래로 이동시키는 함수
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    scrollToBottom()
  }, [chat])

  const sendMessage = () => {
    if (userMsg) {
      sendToGPT()
      setChat((prevMessages) => [
        ...prevMessages,
        { text: userMsg, who: 'user' },
      ])
      setAiMsg('')
      setUserMsg('')
    }
  }

  useEffect(() => {
    switch (tutorialStep) {
      case 6:
      case 8:
      case 9:
      case 11:
      case 13:
      case 14:
        setChat((prevMessages) => [...prevMessages, tutorial[tutorialStep]])
        if (tutorialStep === 14) {
          setTimeout(() => setTutorialStep((num) => num + 1), 3000)
        } else {
          setTutorialStep((num) => num + 1)
        }
        break
      case 7:
      case 10:
      case 12:
        setChat((prevMessages) => [...prevMessages, tutorial[tutorialStep]])
        break
      case 15:
        setChat((prevMessages) => [...prevMessages, tutorial[tutorialStep]])
        setTimeout(() => setTutorialStep(100), 3000)
        break
      default:
        break
    }
  }, [tutorialStep])

  return (
    <div className="absolute bottom-[4rem] right-[3.1rem]">
      <div className="flex h-[calc(100vh-13rem)] gap-[1.2rem]">
        <div className={clsx('flex w-[57.1rem] flex-col justify-end')}>
          <div
            className={clsx(
              'custom-scrollbar z-10 flex h-[calc(100%-4.5rem)] flex-col gap-[3rem] overflow-auto rounded-t-[1rem] border-b border-b-383838/20 bg-141517 px-[2rem] pb-[1rem] pt-[2rem]',
            )}
          >
            {chat.map(({ text, select, who }, chatIndex) => (
              <div key={chatIndex}>
                {who !== 'user' && (
                  <div className="flex gap-[1.1rem]">
                    <AutoSizeImage
                      src="/images/unity/nara_profile.png"
                      className="h-[6.8rem] min-w-[6.8rem]"
                    />

                    <div>
                      <CSText size="21" color="DD81FD">
                        AI 상담사 나리
                      </CSText>
                      <div className="mt-[0.5rem] max-w-[33.5rem] rounded-r-2xl rounded-bl-2xl bg-white p-[1rem]">
                        <CSText size="18" color="black" weight="bold">
                          {text}
                        </CSText>
                      </div>
                    </div>
                  </div>
                )}

                {select && (
                  <div className="my-[2rem] grid grid-cols-2 gap-[2rem] pl-[7.9rem]">
                    {select?.map((value, index) => (
                      <div
                        className="cursor-pointer rounded-[2rem] border border-white bg-transparent px-[1.5rem] py-[0.5rem] text-center hover:opacity-70"
                        key={index}
                        onClick={() => selectTutorial(value)}
                      >
                        <CSText size="18" color="white">
                          {value}
                        </CSText>
                      </div>
                    ))}
                  </div>
                )}

                {selectMsg[chatIndex] && (
                  <div className="flex justify-end">
                    <CSText
                      size="18"
                      color="black"
                      weight="bold"
                      className="max-w-[33.5rem] rounded-t-2xl rounded-bl-2xl bg-[#FFE177] p-[1rem]"
                    >
                      {selectMsg[chatIndex]}
                    </CSText>
                  </div>
                )}

                {who === 'user' && (
                  <div className="flex justify-end">
                    <CSText
                      size="18"
                      color="black"
                      weight="bold"
                      className="max-w-[33.5rem] rounded-t-2xl rounded-bl-2xl bg-[#FFE177] p-[1rem]"
                    >
                      {text}
                    </CSText>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <CSLabel>
            <CSInput
              type="text"
              bgColor="141517"
              placeholder="궁금한 건 채팅으로 문의하세요."
              value={userMsg}
              setValue={setUserMsg}
              height="45"
              textColor="white"
              className={clsx('rounded-b-[1rem] px-[1.8rem] placeholder-white')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage()
                }
              }}
            />
            <Image
              src={'/images/unity/top_arrow.png'}
              className="absolute right-[1.3rem] top-1/2 h-[2.8rem] w-[2.8rem] -translate-y-1/2"
              width={0}
              height={0}
              onClick={sendMessage}
              alt={'top_arrow'}
            />
          </CSLabel>
        </div>
      </div>
      {5 <= tutorialStep && tutorialStep < 100 && (
        <div className="fixed inset-0 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
      )}
    </div>
  )
}

export default Chat
