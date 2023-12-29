'use client'

import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSText from '@/components/ui/text/CSText'

const UserProfile = () => {
  return (
    <div className="absolute left-[3rem] top-[11.4rem] ">
      <div className="flex h-[10.8rem] w-[28rem] items-center gap-[1.3rem] rounded-[1rem] bg-black pl-[2.2rem]">
        <AutoSizeImage
          src={'/images/unity/nara_profile.png'}
          rounded="10"
          className={'h-[5.8rem] w-[5.8rem] '}
        />
        <div className="flex flex-col ">
          <CSText size="16" color="white">
            AI 상담사 나라
          </CSText>
          <CSText size="20" color="white" className="mt-[0.3rem]">
            일일 친구 상담소
          </CSText>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
