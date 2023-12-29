'use client'

import { Unity, useUnityContext } from 'react-unity-webgl'
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'

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
        {!isLoaded && (
          <p className="z-10 grid h-full w-full place-items-center bg-black text-35 text-white">
            Loading Application... {Math.round(loadingProgression * 100)}%
          </p>
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

export default Home
