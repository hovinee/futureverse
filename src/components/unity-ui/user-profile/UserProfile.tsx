'use client'

import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSText from '@/components/ui/text/CSText'

const UserProfile = () => {
  return (
    <div className="absolute left-[4.2rem] top-[4.8rem] ">
      <div className="flex h-[10.8rem] w-[28rem] items-center gap-[1.3rem] rounded-[1rem] bg-black/25 pl-[2.2rem]">
        <AutoSizeImage
          src={'/images/unity/profile.png'}
          rounded="10"
          className={'h-[5.8rem] w-[5.8rem] '}
        />
        <div className="flex flex-col ">
          <CSText size="16" color="black">
            침착한 케빈
          </CSText>
          <CSText size="20" color="black" className="mt-[0.3rem]">
            침착한 상담소
          </CSText>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
