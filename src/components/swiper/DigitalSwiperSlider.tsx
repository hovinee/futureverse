'use client'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import { Pagination, Autoplay } from 'swiper/modules'
import './style.css'
import CSText from '../ui/text/CSText'
import { motion } from 'framer-motion'
import { useState } from 'react'
import AutoSizeImage from '../ui/auto-size-image/AutoSizeImage'
import clsx from 'clsx'

const courses = [
  {
    title: '디지털 리터러시의 강좌를 찾아보세요.',
    description:
      '인터넷 및 소프트웨어를 사용하여 다른 사람과 협력하고\n 정보를 발견 및 전달하는 능력을 배우세요.',
    src: '/images/digital-literacy_2.png',
  },
  {
    title: '디지털 리터러시의 강좌를 찾아보세요.',
    description:
      '인터넷 및 소프트웨어를 사용하여 다른 사람과 협력하고\n 정보를 발견 및 전달하는 능력을 배우세요.',
    src: '/images/school.jpg',
  },
  {
    title: '디지털 리터러시의 강좌를 찾아보세요.',
    description:
      '인터넷 및 소프트웨어를 사용하여 다른 사람과 협력하고\n 정보를 발견 및 전달하는 능력을 배우세요.',
    src: '/images/digital-literacy.png',
  },
]

const DigitalSwiperSlider = () => {
  const [slideIndex, setSlideIndex] = useState<number>(0)
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={true}
      slidesPerView={1}
      className="bullet"
      autoplay={{
        delay: 5000,
        disableOnInteraction: false, // 사용자 상호 작용 시 자동 슬라이드 중단 여부
      }}
      loop={true}
      onSlideChange={(swiper) => {
        setSlideIndex(swiper.realIndex)
      }}
    >
      {courses.map((course, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: slideIndex === index ? 1.1 : 1 }}
              transition={{ duration: 5 }}
            >
              <AutoSizeImage src={course.src} className="h-[50rem] w-full" />
            </motion.div>
            <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col justify-center bg-black bg-opacity-20 text-white">
              <div className="pl-[4.8rem]">
                <CSText weight="bold" size="35" color="white">
                  {course.title}
                </CSText>
                <CSText
                  weight="normal"
                  size="21"
                  color="white"
                  className="mt-[1rem] whitespace-pre-line"
                >
                  {course.description}
                </CSText>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default DigitalSwiperSlider
