'use client'

import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSInput from '@/components/ui/input/CSInput'
import CSLabel from '@/components/ui/label/CSLabel'
import CSText from '@/components/ui/text/CSText'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { exampleJobs, tutorial } from '@/data/unity/data'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { ReactUnityEventParameter } from 'react-unity-webgl/distribution/types/react-unity-event-parameters'
import { TTutorial } from '@/utils/types'

interface TProps {
  sendToGPT: (message?: string) => void
  aiMsg: string
  userMsg: string
  setUserMsg: Dispatch<SetStateAction<string>>
  setAiMsg: Dispatch<SetStateAction<string>>
  tutorialStep: number
  setTutorialStep: Dispatch<SetStateAction<number>>
  analysis: boolean
  setAnalysis: Dispatch<SetStateAction<boolean>>
  setChat: Dispatch<SetStateAction<TTutorial[]>>
  chat: TTutorial[]
  sendtoUnity: (
    gameObjectName: string,
    methodName: string,
    parameter?: ReactUnityEventParameter,
  ) => void
}

const Chat = ({
  sendToGPT,
  aiMsg,
  userMsg,
  setUserMsg,
  setAiMsg,
  tutorialStep,
  setTutorialStep,
  sendtoUnity,
  chat,
  setChat,
  analysis,
  setAnalysis,
}: TProps) => {
  const [openJob, setOpenJob] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const selectTutorial = (msg: string) => {
    setTutorialStep((num) => num + 1)
    setChat((prevMessages) => [...prevMessages, { text: msg, who: 'user' }])
    // setChat((prevMessages) => [...prevMessages, tutorial[tutorialStep + 1]])
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
  }, [chat, openJob])

  const stopMessage = () => {
    setAiMsg('')
    setAnalysis(false)
    sendtoUnity('MessageReceiver', 'OnClickedButton', 'gpt_discard')
  }

  const sendMessage = () => {
    if (userMsg) {
      sendToGPT()
      setChat((prevMessages) => [
        ...prevMessages,
        { text: userMsg, who: 'user' },
      ])
      setAnalysis(true)
      setAiMsg('')
      setUserMsg('')
    }
  }

  const exampleJob = (message: string) => {
    sendToGPT(message)
    setChat((prevMessages) => [
      ...prevMessages,
      {
        text: message,
        who: 'user',
      },
    ])
    setAiMsg('')
    setUserMsg('')
    setOpenJob(false)
    setAnalysis(true)
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

  useEffect(() => {
    if (tutorialStep < 100) {
      sendtoUnity(
        'MessageReceiver',
        'OnProcess',
        `gptmsg:${tutorial[tutorialStep].text}`,
      )
    }
  }, [tutorialStep])

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
  return (
    <div className="absolute bottom-[4rem] right-[3.1rem] flex gap-[2rem]">
      <div className="flex h-[calc(100vh-13rem)] gap-[1.2rem]">
        <div className={clsx('flex w-[57.1rem] flex-col justify-end')}>
          <div
            className={clsx(
              'custom-scrollbar z-10 flex h-[calc(100%-4.5rem)] flex-col gap-[3rem] overflow-auto rounded-t-[1rem] border-b border-b-383838/20 bg-141517 px-[2rem] pb-[1rem] pt-[2rem]',
            )}
          >
            {chat.map(({ text, select, who, select_image }, chatIndex) => {
              const letters = Array.from(text!)
              return (
                <div key={chatIndex}>
                  {who === 'ai' && (
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
                          <AnimatePresence>
                            {letters.map((letter, index) => (
                              <motion.span
                                key={index}
                                custom={index}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={textVariants}
                                className="text-18 font-bold text-black"
                              >
                                {letter}
                              </motion.span>
                            ))}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  )}

                  {select && (
                    <div className="my-[2rem] pl-[7.9rem]">
                      {select?.map((value, index) => (
                        <div
                          className="mb-[1rem] mr-[1rem] inline-block cursor-pointer rounded-[2rem] border border-white bg-transparent px-[1.5rem] py-[0.5rem] text-center hover:opacity-70"
                          key={index}
                          onClick={() => selectTutorial(value)}
                        >
                          <div className="flex gap-[0.7rem]">
                            {/* {chatIndex === 2 && (
                              <div className="w-[2.2rem]">
                                <AutoSizeImage
                                  src={select_image![index]}
                                  full
                                />
                              </div>
                            )} */}
                            <CSText size="18" color="white">
                              {value}
                            </CSText>
                          </div>
                        </div>
                      ))}
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
              )
            })}
            {openJob && (
              <div>
                <CSText size="21" color="white" weight="bold">
                  Guide.
                </CSText>
                <CSText size="18" color="white" className="mt-[1rem]">
                  직업을 선택하시면 질문 예시 확인이 가능합니다. 예시 질문을
                  통해 내가 원하는 진로 질문을 파악해 보세요!
                </CSText>
                <div className="mt-[1rem] grid grid-cols-3 gap-[1rem] rounded-2xl bg-141517">
                  {exampleJobs.map(({ job, description }, index) => (
                    <div
                      key={index}
                      className="grid h-[3rem] cursor-pointer place-items-center rounded-2xl bg-slate-800 text-16 text-white"
                      onClick={() => exampleJob(description)}
                    >
                      {job}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
          <CSLabel>
            <CSInput
              type="text"
              bgColor="141517"
              placeholder={
                tutorialStep === 100
                  ? '궁금한 건 채팅으로 문의하세요.'
                  : '튜토리얼을 진행해주세요!'
              }
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
              disabled={tutorialStep !== 100}
            />
            <div
              className={clsx(
                'absolute right-[1.3rem] top-1/2 flex -translate-y-1/2 gap-[1rem]',
                tutorialStep === 9 && 'z-10',
              )}
            >
              <div className="grid h-[2.8rem] w-[2.8rem] place-items-center rounded-full bg-383838">
                <Image
                  src={`/images/unity/${
                    aiMsg || analysis ? 'stop' : 'send'
                  }.png`}
                  className="h-[1.4rem] w-[1.4rem] cursor-pointer"
                  width={0}
                  height={0}
                  onClick={aiMsg || analysis ? stopMessage : sendMessage}
                  alt="send"
                />
              </div>
              <div className="grid h-[2.8rem] w-[2.8rem] place-items-center rounded-full bg-red-400">
                <Image
                  src={`/images/unity/question.png`}
                  className="h-[1.6rem] w-[1.6rem] cursor-pointer"
                  width={0}
                  height={0}
                  onClick={() => setOpenJob(!openJob)}
                  alt="question"
                />
                {tutorialStep === 9 && (
                  <>
                    <motion.div
                      className={clsx(
                        'absolute right-[-3.5rem] top-[-1rem] w-[7rem] cursor-pointer',
                      )}
                      animate={controls}
                      onClick={() =>
                        tutorialStep === 9 && setTutorialStep((num) => num + 1)
                      }
                    >
                      <img
                        src="/images/unity/finger_up.png"
                        alt="Finger"
                        className="h-full w-full"
                      />
                    </motion.div>
                    <div className="absolute left-[-5rem] top-[-13rem] w-[15rem] rounded-xl border border-[#E1792D] bg-white px-[1rem] py-[1rem]">
                      <CSText
                        size="16"
                        weight="bold"
                        color="black"
                        className="mt-[1rem] text-center"
                      >
                        진로상담 직업 예시 질문을 파악할 수 있습니다.
                      </CSText>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CSLabel>
        </div>
      </div>

      {/* 튜토리얼 진행 */}
      {5 <= tutorialStep && tutorialStep < 100 && (
        <div className="fixed inset-0 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
      )}
    </div>
  )
}

export default Chat
