'use client'

import { Unity, useUnityContext } from 'react-unity-webgl'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import Menu from '@/components/unity-ui/menu/Menu'
import Chat from '@/components/unity-ui/chat/Chat'
import UnityHeader from '@/components/unity-ui/unity-header/UnityHeader'
import UnitySection from '@/components/unity-ui/section/UnitySection'
import { cfWorkerUrl } from '@/utils/url'
import { connectToGPT } from '@/lib/gpt'
import CounselingModal from '@/components/unity-ui/modal/CounselingModal'
import HealingModal from '@/components/unity-ui/modal/HealingModal'
import CSText from '@/components/ui/text/CSText'
import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import Heart from '@/components/unity-ui/heart/Heart'
import Progressbar from '@/components/progress/ProgressBar'
import { TTutorial } from '@/utils/types'
import { tutorial } from '@/data/unity/data'
import UserHistory from '@/components/unity-ui/user-history/UserHistory'
import { ReactUnityEventParameter } from 'react-unity-webgl/distribution/types/react-unity-event-parameters'
import AnalysisModal from '@/components/unity-ui/modal/AnalysisModal'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import DignosisModal from '@/components/unity-ui/modal/DignosisModal'

const CounselPage = () => {
  const path = usePathname().split('/').pop()
  //unity build
  const {
    unityProvider,
    addEventListener,
    removeEventListener,
    loadingProgression,
    sendMessage,
  } = useUnityContext({
    loaderUrl: `${cfWorkerUrl}/Build/${path}/Build.loader.js`,
    dataUrl: `${cfWorkerUrl}/Build/${path}/Build.data`,
    frameworkUrl: `${cfWorkerUrl}/Build/${path}/Build.framework.js`,
    codeUrl: `${cfWorkerUrl}/Build/${path}/Build.wasm`,
  })

  //splashEnd
  const [splashEnd, setSplashEnd] = useState<boolean>(false)

  //상담소 또는 치유소 선택
  const [selectPlace, setSelectPlace] = useState<ReactUnityEventParameter>('')

  //상담 방법 선택
  const [counselingMethod, setCounselingMethod] = useState<number>(0)

  //치유소 선택
  const [healingMethod, setHealingMethod] = useState<number>(0)

  //1:1 상담
  const [wantCounseling, setWantCounseling] = useState<number>(0)
  const [aiMsg, setAiMsg] = useState<string>('')
  const [userMsg, setUserMsg] = useState<string>('')
  const [chat, setChat] = useState<TTutorial[]>([])
  const [analysis, setAnalysis] = useState<boolean>(false)

  //scene 종료
  const [sceneOpeningEnd, setSceneOpeningEnd] = useState('')

  //튜토리얼
  const [tutorialStep, setTutorialStep] = useState<number>(0)

  //원하는 상담 //훈련일경우 trainer-poor, trainer(로봇 조언)
  const counseling = ['career', 'family', 'friend', 'love', 'psychology']

  const systemMsg = counseling[wantCounseling]

  const sendToGPT = async (selectMessage?: string) => {
    const message = await connectToGPT(
      systemMsg,
      selectMessage ? selectMessage : userMsg,
    )
    sendMessage('MessageReceiver', 'OnClickedButton', 'gpt_discard')
    sendMessage('MessageReceiver', 'OnProcess', `gptmsg:${message}`)
  }

  const OnSplashEnd = useCallback((data: any) => {
    setSplashEnd(true)
  }, [])

  const OnPointerClick = useCallback((data: ReactUnityEventParameter) => {
    setSelectPlace(data)
  }, [])

  const OnSceneOpeningEnd = useCallback((data: any) => {
    setSceneOpeningEnd(data)
  }, [])

  const OnMsgStart = useCallback(() => {
    setAnalysis(false)
  }, [])

  const OnMsg = useCallback((data: any) => {
    setAiMsg(data)
  }, [])

  const OnMsgEnd = useCallback(() => {
    if (tutorialStep < 100) {
      setChat((prevArray) => {
        const lastItem = prevArray[prevArray.length - 1]
        lastItem.select = tutorial[tutorialStep]?.select
        return [...prevArray]
      })
    }

    setAiMsg('')
  }, [tutorialStep])

  useEffect(() => {
    if (splashEnd) {
      sendMessage('MessageReceiver', 'OnClickedToLoadScene', path)
    }
  }, [splashEnd])

  useEffect(() => {
    sendMessage('MessageReceiver', 'OnClickedToLoadScene', 'offAudio')
  }, [])

  const goToLobby = () => {
    sendMessage('MessageReceiver', 'OnClickedToLoadScene', 'Lobby')
    setSelectPlace('')
    setSceneOpeningEnd('')
    setAiMsg('')
    setTutorialStep(0)
    setChat([])
  }

  //방분위기선택
  const roomMood = (num: number) => {
    sendMessage(
      'MessageReceiver',
      'OnClickedButton',
      `spaceRoom_change_theme_${num}`,
    )
  }

  //춤추기
  const letsDance = () => {
    sendMessage('MessageReceiver', 'OnClickedButton', 'spaceRoom_dancing')
  }

  //하트
  const sendToHeart = () => {
    sendMessage('MessageReceiver', 'OnClickedButton', 'spaceRoom_heart')
  }

  useEffect(() => {
    addEventListener('OnSceneOpeningEnd', OnSceneOpeningEnd)
    addEventListener('OnSplashEnd', OnSplashEnd)
    addEventListener('OnPointerClick', OnPointerClick)
    addEventListener('OnMsg', OnMsg)
    addEventListener('OnMsgStart', OnMsgStart)

    return () => {
      removeEventListener('OnSceneOpeningEnd', OnSceneOpeningEnd)
      removeEventListener('OnSplashEnd', OnSplashEnd)
      removeEventListener('OnPointerClick', OnPointerClick)
      removeEventListener('OnMsg', OnMsg)
      removeEventListener('OnMsgStart', OnMsgStart)
    }
  }, [addEventListener, removeEventListener])

  useEffect(() => {
    addEventListener('OnMsgEnd', OnMsgEnd)

    return () => {
      removeEventListener('OnMsgEnd', OnMsgEnd)
    }
  }, [addEventListener, removeEventListener, tutorialStep])

  //상담소 이동
  useEffect(() => {
    if (selectPlace === 'counseling') {
      switch (counselingMethod) {
        case 0:
          sendMessage('MessageReceiver', 'OnClickedToLoadScene', 'client')
          break
        case 1:
          alert('준비중 입니다.')
          break
        case 2:
          alert('준비중 입니다.')
          break
      }
    } else if (selectPlace === 'healing') {
      switch (healingMethod) {
        case 0:
          sendMessage('MessageReceiver', 'OnClickedToLoadScene', 'WhaleDream')
          break
        case 1:
          sendMessage(
            'MessageReceiver',
            'OnClickedToLoadScene',
            'InfiniteTrain',
          )
          break
        case 2:
          sendMessage('MessageReceiver', 'OnClickedToLoadScene', 'Camp')
          break
        case 3:
          alert('준비중 입니다.')
          break
      }
    }
  }, [selectPlace, counselingMethod])

  return (
    <div className="absolute inset-0 z-10 bg-black">
      <div
        className={clsx(
          'fixed z-20 h-full w-full',
          splashEnd ? 'hidden' : 'block',
        )}
      >
        <AutoSizeImage
          src={'/images/unity/loading_bg_2.jpg'}
          full
          priority
          objectCover
        />
        <Progressbar number={Math.round(loadingProgression * 100)} />
      </div>
      <div className="relative h-full w-full">
        <Unity
          style={{
            width: '100%',
            height: '100%',
            justifySelf: 'center',
            alignSelf: 'center',
            opacity: splashEnd ? 100 : 0,
            transition: 'opacity 1s ease',
          }}
          unityProvider={unityProvider}
        />

        {sceneOpeningEnd === 'Lobby' && !selectPlace && (
          <div className="absolute left-0 right-[5rem] top-[22vh] z-20 mx-auto flex h-[3.3rem] w-[75rem] justify-between">
            <div className="ml-[1rem] grid h-full w-[8rem] place-items-center rounded-[0.5rem] bg-black/80">
              <CSText size="21" color="white">
                상담소
              </CSText>
            </div>
            <div className="mr-[1rem] grid h-full w-[8rem] place-items-center rounded-[0.5rem] bg-black/80">
              <CSText size="21" color="white">
                치유소
              </CSText>
            </div>
          </div>
        )}

        {(sceneOpeningEnd === 'InfiniteTrain' ||
          sceneOpeningEnd === 'Camp' ||
          sceneOpeningEnd === 'WhaleDream') && (
          <div
            className="absolute left-[1.5rem] top-[1.5rem] h-[2.1rem] w-[2.1rem]"
            onClick={goToLobby}
          >
            <AutoSizeImage
              src="/images/unity/back_arrow.png"
              rounded="10"
              className="h-[2.1rem] w-[2.1rem]"
            />
          </div>
        )}

        {/* 상담소 */}
        {selectPlace === 'Lobby_ToClinic' && (
          <UnitySection>
            <CounselingModal
              setCounselingMethod={setCounselingMethod}
              setSelectPlace={setSelectPlace}
            />
          </UnitySection>
        )}

        {/* 치유소 */}
        {selectPlace === 'Lobby_ToHealing' && (
          <UnitySection>
            <HealingModal
              setHealingMethod={setHealingMethod}
              setSelectPlace={setSelectPlace}
            />
          </UnitySection>
        )}

        {/* 상담소 */}
        {selectPlace === 'Lobby_ToClinic' && (
          <UnitySection>
            <CounselingModal
              setCounselingMethod={setCounselingMethod}
              setSelectPlace={setSelectPlace}
            />
          </UnitySection>
        )}

        {/* 치유소 */}
        {selectPlace === 'Lobby_ToAdventure' && (
          <UnitySection>
            <DignosisModal
              setHealingMethod={setHealingMethod}
              setSelectPlace={setSelectPlace}
            />
          </UnitySection>
        )}

        {/* 상담소 선택 */}
        {sceneOpeningEnd === 'client' && (
          <>
            <UnityHeader
              goToLobby={goToLobby}
              tutorialStep={tutorialStep}
              setTutorialStep={setTutorialStep}
            />

            <Heart
              setTutorialStep={setTutorialStep}
              tutorialStep={tutorialStep}
              sendToHeart={sendToHeart}
            />
            <UserHistory
              tutorialStep={tutorialStep}
              setTutorialStep={setTutorialStep}
              chat={chat}
            />
            <Menu
              sendToGPT={sendToGPT}
              setWantCounseling={setWantCounseling}
              wantCounseling={wantCounseling}
              setAiMsg={setAiMsg}
              setTutorialStep={setTutorialStep}
              tutorialStep={tutorialStep}
              roomMood={roomMood}
              letsDance={letsDance}
              setChat={setChat}
            />
            <Chat
              sendToGPT={sendToGPT}
              aiMsg={aiMsg}
              setAiMsg={setAiMsg}
              setUserMsg={setUserMsg}
              userMsg={userMsg}
              setTutorialStep={setTutorialStep}
              tutorialStep={tutorialStep}
              sendtoUnity={sendMessage}
              setChat={setChat}
              chat={chat}
              analysis={analysis}
              setAnalysis={setAnalysis}
            />
            {analysis && <AnalysisModal />}
          </>
        )}
      </div>
    </div>
  )
}

export default CounselPage
