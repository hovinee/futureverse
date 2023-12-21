'use client'

import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSInput from '@/components/ui/input/CSInput'
import CSLabel from '@/components/ui/label/CSLabel'
import CSText from '@/components/ui/text/CSText'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface TProps {
  sendToGPT: () => void
  aiMsg: string
  userMsg: string
  setUserMsg: Dispatch<SetStateAction<string>>
  setAiMsg: Dispatch<SetStateAction<string>>
}

const Chat = ({ sendToGPT, aiMsg, userMsg, setUserMsg, setAiMsg }: TProps) => {
  const [openChat, setOpenChat] = useState<boolean>(false)

  const [connectChat, setConnectChat] = useState<
    { who: string; msg: string }[]
  >([])
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (aiMsg) {
      setConnectChat((prevMessages) => [
        ...prevMessages,
        { msg: aiMsg, who: 'ai' },
      ])
    }
  }, [aiMsg])

  useEffect(() => {
    // 스크롤을 맨 아래로 이동시키는 함수
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    scrollToBottom()
  }, [connectChat])

  const sendMessage = () => {
    if (userMsg) {
      sendToGPT()
      setConnectChat((prevMessages) => [
        ...prevMessages,
        { msg: userMsg, who: 'user' },
      ])
      setAiMsg('')
      setUserMsg('')
      setOpenChat(true)
    }
  }
  return (
    <div className="absolute bottom-[4rem] right-[3.1rem]">
      <div className="flex h-[27rem] gap-[1.2rem]">
        <div className={clsx('flex w-[57.1rem] flex-col justify-end')}>
          <div
            className={clsx(
              'custom-scrollbar h-[22.5rem] overflow-auto rounded-t-[1rem] border-b border-b-383838/20 bg-black/25 px-[1.8rem] pb-[1rem] pt-[3.1rem]',
              openChat ? 'block' : 'hidden',
            )}
          >
            <div className="flex flex-col gap-[0.5rem]">
              {connectChat.map(({ msg, who }, index) => (
                <CSText
                  size="15"
                  color={clsx(who === 'ai' ? 'black' : 'white')}
                  key={index}
                  weight="semiBold"
                >
                  {who === 'ai' ? `AI : ${msg}` : msg}
                </CSText>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <CSLabel>
            <CSInput
              type="text"
              bgColor="black/25"
              placeholder="궁금한 건 채팅으로 문의하세요."
              value={userMsg}
              setValue={setUserMsg}
              height="45"
              textColor="white"
              className={clsx(
                'px-[1.8rem] placeholder-white',
                openChat ? 'rounded-b-[1rem]' : 'rounded-[1rem]',
              )}
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

        <div className="flex w-[5.2rem] flex-col justify-end gap-[1.2rem]">
          <div className="grid h-[5.2rem] w-full place-items-center rounded-[1.1rem] bg-383838">
            <AutoSizeImage
              src={'/images/unity/speech_icon.png'}
              rounded="10"
              className="h-[2.8rem] w-[3.2rem]"
              onClick={() => setOpenChat(!openChat)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
