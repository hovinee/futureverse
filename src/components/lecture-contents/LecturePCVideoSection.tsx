import { getVideoData } from '@/lib/video_data'
import Video from '../ui/video/Video'
import LectureContent from './LectureContents'
import { TCourse } from '@/utils/types'
import CSText from '../ui/text/CSText'

const args = {
  styles: {
    width: '100%',
    aspectRatio: '16 / 9',
  },
  videoOptions: {
    controls: true,
    autoplay: false,
  },
}

interface TProps {
  uid: string
  course: TCourse
}

const LecturePCVideoSection = async ({ uid, course }: TProps) => {
  const data = await getVideoData(uid)

  const videoSource = {
    src: data?.play?.hls?.link,
    type: 'application/x-mpegURL',
  }

  return (
    <div className="absolute inset-0 mx-auto mt-[4.8rem] hidden w-[95.274rem] gap-[2.7rem] border-b border-[#BFBFBF] lg:flex xl:w-[97.574rem] xl:gap-[5rem]">
      <div className="flex w-[64.474rem] flex-col">
        <div className="relative min-h-[37.2rem] w-full rounded-[2.5rem] bg-white/70 shadow-md">
          <div className="absolute inset-0 m-auto h-[35rem] w-[62rem]">
            <Video {...args} sources={videoSource} uid={uid} />
          </div>
        </div>

        <div className="mt-[3.3rem]">
          <CSText size="24" color="black" weight="bold">
            {course.title}
          </CSText>
          <CSText size="15" color="494949" className="mt-[2rem]">
            {course.title}
          </CSText>
        </div>
      </div>
      <div className="h-[56rem] w-[28.1rem] rounded-[2.5rem] bg-white/70 p-[2.5rem] shadow-md">
        <LectureContent course={course} />
      </div>
    </div>
  )
}

export default LecturePCVideoSection
