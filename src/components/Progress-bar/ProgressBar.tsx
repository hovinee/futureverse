import Overlay from '../overlay/Overlay'
import AutoSizeImage from '../ui/auto-size-image/AutoSizeImage'
import CSText from '../ui/text/CSText'

interface Props {
  number: number
}

const Progressbar = ({ number }: Props) => {
  return (
    <Overlay progress>
      <div className="relative z-10 w-[40rem] rounded-full border border-white bg-transparent">
        <div className="absolute inset-0 grid place-items-center text-16 text-white">
          {number}%
        </div>
        <div
          className="grid h-[2rem] place-items-end rounded-full bg-white"
          style={{ width: number <= 5 ? '5%' : `${number}%` }}
        >
          <AutoSizeImage
            src={'/images/unity/ufo.png'}
            className="mr-[-2rem] mt-[-2.2rem] h-[5.6rem] w-[5.6rem]"
          />
        </div>
      </div>
      <CSText size="18" color="white" weight="bold" className="z-10 mt-[2rem]">
        응답하라 심리상담소로 이동 중...
      </CSText>
    </Overlay>
  )
}
export default Progressbar
