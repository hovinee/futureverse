import UnitySwiperSlider from '@/components/swiper/UnitySwiperSlider'
import { Dispatch, SetStateAction } from 'react'

interface TProps {
  setHealingMethod: Dispatch<SetStateAction<number>>
  setSelectPlace: Dispatch<SetStateAction<string>>
}

const HealingModal = ({ setHealingMethod, setSelectPlace }: TProps) => {
  return (
    <div className="grid h-full w-full place-items-center">
      <UnitySwiperSlider
        selectMethod={setHealingMethod}
        setSelectPlace={setSelectPlace}
        healing
      />
    </div>
  )
}

export default HealingModal
