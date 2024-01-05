'use client'

import { Unity, useUnityContext } from 'react-unity-webgl'
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import Progressbar from '@/components/progress/ProgressBar'
import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'

const Home = () => {
  const router = useRouter()

  const [splashEnd, setSplashEnd] = useState<boolean>(false)

  //unity build
  const {
    unityProvider,
    loadingProgression,
    isLoaded,
    addEventListener,
    removeEventListener,
  } = useUnityContext({
    loaderUrl: '/build/Build_mainpage.loader.js',
    dataUrl: '/build/Build_mainpage.data',
    frameworkUrl: '/build/Build_mainpage.framework.js',
    codeUrl: '/build/Build_mainpage.wasm',
  })

  const OnSceneOpeningEnd = useCallback((data: any) => {
    router.push('/main')
  }, [])

  const OnSplashEnd = useCallback((data: any) => {
    setSplashEnd(true)
  }, [])

  useEffect(() => {
    addEventListener('OnSceneClosingEnd', OnSceneOpeningEnd)
    addEventListener('OnSplashEnd', OnSplashEnd)

    return () => {
      removeEventListener('OnSceneClosingEnd', OnSceneOpeningEnd)
      removeEventListener('OnSplashEnd', OnSplashEnd)
    }
  }, [addEventListener, removeEventListener])

  return (
    <>
      <div className="absolute inset-0 z-10 bg-black">
        <div
          className={clsx(
            'fixed z-20 grid h-full w-full place-items-center bg-white',
            splashEnd ? 'hidden' : 'block',
          )}
        >
          <div>
            <AutoSizeImage
              src={'/images/unity/path_logo.png'}
              className="h-[26.3rem] w-[38.8rem]"
              priority
            />

            <div className="relative z-10 mt-[3rem] w-[40rem] rounded-full  border bg-[#D3D3D3]">
              <div className="absolute inset-0 grid place-items-center text-16 text-white">
                {Math.round(loadingProgression * 100)}%
              </div>
              <div
                className="grid h-[2rem] place-items-end rounded-full bg-gradient-to-r from-[#44D1A7] to-[#088AE7]"
                style={{ width: `${Math.round(loadingProgression * 100)}%` }}
              />
            </div>
          </div>
        </div>

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

export default Home
