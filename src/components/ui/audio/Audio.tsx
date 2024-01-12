import useAudio from '@/hooks/use-audio'
import { useEffect, useRef, useState } from 'react'

const Audio = () => {
  const { audio, toggle, play, source: url } = useAudio()
  const progressRef = useRef<HTMLDivElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (audio) {
      const updateProgress = () => {
        setCurrentTime(audio.currentTime)
      }

      const updateProgressBar = () => {
        const progress = (audio.currentTime / audio.duration) * 100
        if (progressRef.current) {
          progressRef.current.style.width = `${progress}%`
        }
      }

      const handleTimeUpdate = () => {
        updateProgress()
        updateProgressBar()
      }

      const handleLoadedMetadata = () => {
        setDuration(audio.duration || 0)
        updateProgressBar() // 초기에도 프로그래스 바 업데이트
      }

      audio.addEventListener('timeupdate', handleTimeUpdate)
      audio.addEventListener('loadedmetadata', handleLoadedMetadata)

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate)
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      }
    }
  }, [audio])

  useEffect(() => {
    if (url) {
      setDuration(audio.duration || 0)
    }
  }, [url, audio])

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`
  }

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressRef.current
    if (progressBar) {
      const rect = progressBar.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const progressBarWidth = progressBar.offsetWidth
      const seekTime = (clickX / progressBarWidth) * audio.duration
      audio.currentTime = seekTime
    }
  }

  return (
    <div className="text-white">
      <button onClick={toggle} className="rounded bg-blue-500 p-2 text-white">
        {play ? '중지' : '재생'}
      </button>
      <div
        className="relative mt-2 h-4 cursor-pointer overflow-hidden rounded bg-gray-300"
        ref={progressRef}
        onClick={handleProgressBarClick}
      >
        <div id="progress" className="h-full rounded bg-blue-500" />
      </div>
      <div className="mt-2 flex justify-between">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  )
}

export default Audio
