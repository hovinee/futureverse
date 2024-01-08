import UnitySwiperSlider from '@/components/swiper/UnitySwiperSlider'
import { Dispatch, SetStateAction } from 'react'
import { ReactUnityEventParameter } from 'react-unity-webgl/distribution/types/react-unity-event-parameters'

interface TProps {
  setCounselingMethod: Dispatch<SetStateAction<number>>
  setSelectPlace: Dispatch<SetStateAction<ReactUnityEventParameter>>
}

const CounselingModal = ({ setCounselingMethod, setSelectPlace }: TProps) => {
  return (
    <div className="grid h-full w-full place-items-center">
      <UnitySwiperSlider
        selectMethod={setCounselingMethod}
        setSelectPlace={setSelectPlace}
        counseling
      />
    </div>
  )
}

export default CounselingModal
