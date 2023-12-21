import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'

interface TProps {
  goToLobby: () => void
}

const UnityHeader = ({ goToLobby }: TProps) => {
  return (
    <div
      className="absolute flex w-full justify-between px-[2rem] pt-[1.5rem]"
      onClick={goToLobby}
    >
      <AutoSizeImage
        src={'/images/unity/back_arrow.png'}
        rounded="10"
        className={'h-[2.1rem] w-[2.1rem] '}
      />
      <AutoSizeImage
        src={'/images/unity/close.png'}
        rounded="10"
        className={'h-[2rem] w-[2rem] '}
      />
    </div>
  )
}

export default UnityHeader
