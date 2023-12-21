import MyInfoHeaderSection from '@/components/my-info/MyInfoHeroSection'
import MyInfoPCHeroSection from '@/components/my-info/MyInfoPCHeroSection'
import MyInfoTab from '@/components/tab/MyInfoTab'
import CSButton from '@/components/ui/button/CSButton'

import CSText from '@/components/ui/text/CSText'
import { getCourses } from '@/controllers/courseController'
import { getallCourses } from '@/lib/data'
import clsx from 'clsx'

const getCoursesData = async () => {
  const result = await getCourses()
  const data = await result.json()
  return data
}

const MyInfo = async () => {
  const coursesData = await getCoursesData()
  const allCourse = getallCourses(['title', 'path', 'video_uid'])
  const myCourses = allCourse.filter((videoObj) => {
    return coursesData.data.some(
      (course: { video_uid: string }) =>
        course.video_uid === videoObj.video_uid,
    )
  })

  const list = ['나의 강좌', '최근 본 동영상', '진로상담 결과']
  const lectureInfo = [
    { title: '진행중인\n강의', contents: '5개' },
    {
      title: '전체 강의시간 /\n시청시간',
      total: '80:05:08',
      currnet: '5:05:10',
    },
    { title: '날짜별\n수강시간', contents: '15일' },
  ]

  return (
    <div className="lg:flex lg:h-[102.8rem] xl:h-screen">
      <MyInfoHeaderSection />
      <MyInfoPCHeroSection />
      <div className="mx-auto mt-[3rem] w-[64.8rem] lg:mt-[12rem] xl:mx-0 xl:w-[88.4rem] xl:pl-[5.1rem]">
        <CSText
          size="21"
          color="181818"
          weight="bold"
          className="hidden lg:block"
        >
          나의 강좌
        </CSText>
        <div className="flex gap-[1.44rem] lg:hidden">
          {list.map((value, index) => (
            <CSButton
              width="140"
              height="38"
              bgColor={clsx(index === 0 ? '00A886' : 'D1D1D1')}
              size="18"
              color="white"
              rounded="30"
              weight="semiBold"
              key={index}
            >
              {value}
            </CSButton>
          ))}
        </div>
        <div className="flex gap-[0.9rem]">
          {lectureInfo.map((value, index) => (
            <div
              className="bg-white/15 mt-[3.8rem] h-[11.4rem] w-[20.2rem] rounded-[0.7rem] border px-[1.8rem] py-[1rem] shadow-lg"
              key={index}
            >
              <div className="relative h-full">
                <CSText
                  size="14"
                  color="565656"
                  className="whitespace-pre-line"
                >
                  {value.title}
                </CSText>
                {value.contents && (
                  <div className="absolute bottom-0 right-0">
                    <CSText
                      size="31"
                      weight="bold"
                      color="black"
                      className="whitespace-pre-line"
                    >
                      {value.contents}
                    </CSText>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <MyInfoTab myCourses={myCourses} />
      </div>
    </div>
  )
}

export default MyInfo
