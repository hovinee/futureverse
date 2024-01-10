'use client'

import { thumbnailHealing } from '@/data/unity/data'
import AutoSizeImage from '../ui/auto-size-image/AutoSizeImage'
import CSText from '../ui/text/CSText'
import { motion } from 'framer-motion'

const GridCuration = () => {
  return (
    <div className="grid grid-cols-4 gap-[1.5rem]">
      {thumbnailHealing.map(({ thumbnail, title, sub_title }, index) => (
        <div key={index} className="cursor-pointer">
          <div className="w-full overflow-hidden">
            <motion.div
              key={index}
              className="cursor-pointer"
              whileHover={{ scale: 1.1 }}
            >
              <AutoSizeImage src={thumbnail} full />
            </motion.div>
            <div className="h-[8rem] w-full rounded-b-[1rem] pt-[1.5rem]">
              <CSText size="21" color="black" weight="bold">
                {title}
              </CSText>
              <CSText size="14" color="black" className="mt-[0.5rem]">
                {sub_title}
              </CSText>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GridCuration
