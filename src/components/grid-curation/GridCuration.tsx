'use client'

import AutoSizeImage from '../ui/auto-size-image/AutoSizeImage'
import CSText from '../ui/text/CSText'
import { motion } from 'framer-motion'
import { TTumbnailContent } from '@/utils/types'

interface TProps {
  tumbnailContent: TTumbnailContent[]
}

const GridCuration = ({ tumbnailContent }: TProps) => {
  return (
    <div className="grid grid-cols-4 gap-[1.5rem]">
      {tumbnailContent.map(({ thumbnail, title, sub_title }, index) => (
        <div key={index}>
          <div className="cursor-pointer">
            <div className="w-full overflow-hidden rounded-[1rem]">
              <motion.div
                key={index}
                className="h-full cursor-pointer rounded-[1rem] bg-999899"
                whileHover={{ scale: 1.1 }}
              >
                <AutoSizeImage src={thumbnail} full rounded="10" />
              </motion.div>
            </div>
          </div>
          <div className="h-[8rem] w-full rounded-b-[1rem] pt-[1.5rem]">
            <CSText size="21" color="white" weight="bold">
              {title}
            </CSText>
            <CSText size="14" color="white" className="mt-[0.5rem]">
              {sub_title}
            </CSText>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GridCuration
