import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSButton from '@/components/ui/button/CSButton'

import BannerSection from '@/components/ui/section/BannerSection'
import CSText from '@/components/ui/text/CSText'
import { getMainData } from '@/lib/data'
import clsx from 'clsx'

const Main = () => {
  const data = getMainData()

  return (
    <>
      <BannerSection image_url={data.banner.banner_image}>
        <div className="lg-[6.2rem] absolute inset-0 flex  flex-col justify-center pl-[5.2rem] xl:pl-[6.2rem]">
          <CSText size="35" color="black" weight="bold">
            {data.banner.title}
          </CSText>
          <CSText
            size="18"
            color="black"
            className="mt-[1.7rem] w-[29rem] lg:w-[38rem] xl:w-full xl:whitespace-pre-line"
          >
            {data.banner.intro}
          </CSText>
        </div>
      </BannerSection>
      <section className="mx-auto pb-[8.1rem] pt-[3.1rem]">
        <div className="flex flex-col gap-[6rem]">
          {data.contents.map(({ title, description, intro_image }, index) => (
            <div
              key={index}
              className="w-[62.4rem] lg:flex lg:w-full lg:gap-[3.2rem] xl:gap-[6rem] "
            >
              <AutoSizeImage
                src={intro_image}
                rounded="10"
                className={clsx(
                  'mt-[2.1rem] h-[35.1rem] w-full lg:mt-0 lg:h-[25rem] lg:w-[44.4rem] xl:h-[35.1rem] xl:w-[62.4rem]',
                  index % 2 === 0 ? 'lg:order-1' : 'lg:order-2',
                )}
              />
              <div
                className={clsx(
                  'lg:mt-[3.4rem] lg:w-[44.4rem] xl:mt-[14.2rem]  xl:w-[62.4rem]',
                  index % 2 === 0 ? 'lg:order-2' : 'lg:order-1',
                )}
              >
                <CSText
                  size="31"
                  color="black"
                  weight="bold"
                  className="mt-[0.6rem]"
                >
                  {title}
                </CSText>
                <CSText
                  size="16"
                  color="black"
                  className="mt-[1.6rem] whitespace-pre-line"
                >
                  {description}
                </CSText>
                <CSButton
                  className="mt-[1.6rem]"
                  width="140"
                  height="40"
                  bgColor="00A886"
                  size="16"
                  color="white"
                  rounded="5"
                >
                  Read More
                </CSButton>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Main
