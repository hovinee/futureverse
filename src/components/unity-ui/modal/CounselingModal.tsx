import UnitySwiperSlider from '@/components/swiper/UnitySwiperSlider'
import { Dispatch, SetStateAction } from 'react'

interface TProps {
  setCounselingMethod: Dispatch<SetStateAction<number>>
  setSelectPlace: Dispatch<SetStateAction<string>>
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
