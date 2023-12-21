import Overlay from '../overlay/Overlay'
import AutoSizeImage from '../ui/auto-size-image/AutoSizeImage'

const Loading = () => {
  return (
    <Overlay>
      <AutoSizeImage
        src="/images/loading-eater.gif"
        className="h-[6rem] w-[6rem]"
      />
    </Overlay>
  )
}

export default Loading
