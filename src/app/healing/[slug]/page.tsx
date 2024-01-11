'use client'

import { Unity, useUnityContext } from 'react-unity-webgl'
import React, { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import clsx from 'clsx'
import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import { cfWorkerUrl } from '@/utils/url'
import Progressbar from '@/components/progress/ProgressBar'
import {
  getFeeds,
  updateFeedLike,
  writeComment,
  writeFeed,
} from '@/app/api/post'

const HealingPage = () => {
  const router = useRouter()
  const path = usePathname().split('/').pop()

  //unity build
  const {
    unityProvider,
    addEventListener,
    removeEventListener,
    loadingProgression,
    isLoaded,
    sendMessage,
  } = useUnityContext({
    loaderUrl: `${cfWorkerUrl}/Build/${path}/Build.loader.js`,
    dataUrl: `${cfWorkerUrl}/Build/${path}/Build.data`,
    frameworkUrl: `${cfWorkerUrl}/Build/${path}/Build.framework.js`,
    codeUrl: `${cfWorkerUrl}/Build/${path}/Build.wasm`,
  })

  //스플래쉬 종료
  const [splashEnd, setSplashEnd] = useState<boolean>(false)

  //scene 종료
  const [sceneOpeningEnd, setSceneOpeningEnd] = useState('')

  //
  const [getApi, setGetApi] = useState<string>('')
  const OnSceneOpeningEnd = useCallback((data: any) => {
    setSceneOpeningEnd(data)
  }, [])

  const OnSplashEnd = useCallback((data: any) => {
    setSplashEnd(true)
  }, [])

  const OnRequest = useCallback((data: any) => {
    console.log(data, 'data.api')
    setGetApi(data)
  }, [])

  useEffect(() => {
    const test = async () => {
      let result
      if (getApi == 'get/feeds') {
        result = await getFeeds()
      }
      if (getApi == 'post/new-feed') {
        result = await writeFeed()
      }
      if (getApi == 'post/update-feed-like') {
        result = await updateFeedLike()
      }
      if (getApi == 'post/new-comment') {
        result = await writeComment()
      }
      sendMessage(
        'MessageReceiver',
        'OnResponse',
        `${getApi}|${JSON.stringify(result)}`,
      )
    }
    test()
  }, [getApi])

  useEffect(() => {
    addEventListener('OnSceneOpeningEnd', OnSceneOpeningEnd)
    addEventListener('OnSplashEnd', OnSplashEnd)
    addEventListener('OnRequest', OnRequest)

    return () => {
      removeEventListener('OnSceneOpeningEnd', OnSceneOpeningEnd)
      removeEventListener('OnSplashEnd', OnSplashEnd)
      removeEventListener('OnRequest', OnRequest)
    }
  }, [addEventListener, removeEventListener])

  useEffect(() => {
    if (splashEnd) {
      sendMessage('MessageReceiver', 'OnClickedToLoadScene', path)
    }
  }, [splashEnd])

  return (
    <>
      <div className="absolute inset-0 z-10 bg-black">
        <div
          className={clsx(
            'fixed z-20 h-full w-full',
            splashEnd ? 'hidden' : 'block',
          )}
        >
          <AutoSizeImage
            src={'/images/unity/loading_bg.jpg'}
            full
            priority
            objectCover
          />
          <Progressbar number={Math.round(loadingProgression * 100)} />
        </div>

        {(sceneOpeningEnd === 'train' ||
          sceneOpeningEnd === 'whale' ||
          sceneOpeningEnd === 'camp') && (
          <div
            className="absolute left-[3rem] top-[3rem] w-[4.6rem] cursor-pointer"
            onClick={() => router.back()}
          >
            <AutoSizeImage src="/images/unity/exit.png" full />
          </div>
        )}

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
      </div>
    </>
  )
}

export default HealingPage