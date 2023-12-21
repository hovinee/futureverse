'use client'

import { Unity, useUnityContext } from 'react-unity-webgl'
import React, { useState, useEffect, useCallback } from 'react'

import Menu from '@/components/unity-ui/menu/Menu'
import UserProfile from '@/components/unity-ui/user-profile/UserProfile'
import Chat from '@/components/unity-ui/chat/Chat'
import UnityHeader from '@/components/unity-ui/unity-header/UnityHeader'
import UnitySection from '@/components/unity-ui/section/UnitySection'
import OneByOne from '@/components/unity-ui/onebyone/OneByOne'
import { cfWorkerUrl } from '@/utils/url'
import { connectToGPT } from '@/lib/gpt'
import CounselingModal from '@/components/unity-ui/modal/CounselingModal'
import HealingModal from '@/components/unity-ui/modal/HealingModal'
import CSText from '@/components/ui/text/CSText'
import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'

const Anneagram = () => {
  //unity build
  const {
    unityProvider,
    addEventListener,
    removeEventListener,
    loadingProgression,
    isLoaded,
    sendMessage,
  } = useUnityContext({
    loaderUrl: `${cfWorkerUrl}/Build/Build.loader.js`,
    dataUrl: `${cfWorkerUrl}/Build/Build.data`,
    frameworkUrl: `${cfWorkerUrl}/Build/Build.framework.js`,
    codeUrl: `${cfWorkerUrl}/Build/Build.wasm`,
  })

  //상담소 또는 치유소 선택
  const [selectPlace, setSelectPlace] = useState<string>('')

  //상담 방법 선택
  const [counselingMethod, setCounselingMethod] = useState<number>(0)

  //치유소 선택
  const [healingMethod, setHealingMethod] = useState<number>(0)

  //1:1 상담
  const [wantCounseling, setWantCounseling] = useState<number>(0)
  const [aiMsg, setAiMsg] = useState<string>('')
  const [userMsg, setUserMsg] = useState<string>('')

  //scene 종료
  const [sceneOpeningEnd, setSceneOpeningEnd] = useState('')

  const sendToGPT = async (selectMessage?: string) => {
    const counseling = ['career', 'family', 'friend', 'love', 'psychology']
    const systemMsg = counseling[wantCounseling]

    const message = await connectToGPT(
      systemMsg,
      selectMessage ? selectMessage : userMsg,
    )
    setAiMsg(message)
  }

  const OnPointerClick = useCallback((data: any) => {
    setSelectPlace(data)
  }, [])

  const OnSceneOpeningEnd = useCallback((data: any) => {
    setSceneOpeningEnd(data)
  }, [])

  const goToLobby = () => {
    sendMessage('MessageReceiver', 'OnClickedToLoadScene', 'Lobby')
    setSelectPlace('')
    setSceneOpeningEnd('')
    setAiMsg('')
  }

  useEffect(() => {
    addEventListener('OnSceneOpeningEnd', OnSceneOpeningEnd)
    addEventListener('OnPointerClick', OnPointerClick)

    return () => {
      removeEventListener('OnSceneOpeningEnd', OnSceneOpeningEnd)
      removeEventListener('OnPointerClick', OnPointerClick)
    }
  }, [addEventListener, removeEventListener])

  //상담소 이동
  useEffect(() => {
    if (selectPlace === 'counseling') {
      switch (counselingMethod) {
        case 0:
          sendMessage('MessageReceiver', 'OnClickedToLoadScene', 'SpaceRoom')
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
    <div className="fixed z-10 h-screen w-full">
      {!isLoaded && (
        <p className="z-10 grid h-full w-full place-items-center bg-black text-35 text-white">
          Loading Application... {Math.round(loadingProgression * 100)}%
        </p>
      )}
      <div className="relative h-full w-full">
        <Unity
          style={{
            width: '100%',
            height: '100%',
            justifySelf: 'center',
            alignSelf: 'center',
          }}
          unityProvider={unityProvider}
        />

        {sceneOpeningEnd === 'Lobby' && !selectPlace && (
          <div className="absolute left-0 right-[5rem] top-[21rem] z-20 mx-auto flex h-[3.3rem] w-[75rem] justify-between">
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
              src={'/images/unity/back_arrow.png'}
              rounded="10"
              className={'h-[2.1rem] w-[2.1rem] '}
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

        {/* 상담소 선택 */}
        {sceneOpeningEnd === 'SpaceRoom' && (
          <>
            <UnitySection>
              <UnityHeader goToLobby={goToLobby} />
              {counselingMethod === 0 && (
                <OneByOne
                  setWantCounseling={setWantCounseling}
                  wantCounseling={wantCounseling}
                  aiMsg={aiMsg}
                  setAiMsg={setAiMsg}
                  sendToGPT={sendToGPT}
                />
              )}
            </UnitySection>

            <UserProfile />
            <Menu
              sendToGPT={sendToGPT}
              setWantCounseling={setWantCounseling}
              setAiMsg={setAiMsg}
            />
            <Chat
              sendToGPT={sendToGPT}
              aiMsg={aiMsg}
              setAiMsg={setAiMsg}
              setUserMsg={setUserMsg}
              userMsg={userMsg}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default Anneagram
