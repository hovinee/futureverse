import Card from '@/components/card/Card'
import BannerSection from '@/components/ui/section/BannerSection'
import CSText from '@/components/ui/text/CSText'
import { getCareerCounseling } from '@/lib/data'

const CareerCounselignPage = () => {
  const data = getCareerCounseling()

  return (
    <>
      <BannerSection
        image_url={'/images/career-counseling/career_counseling_banner.png'}
      >
        ''
      </BannerSection>
      <main className="mx-auto mt-[4rem] w-full max-w-[140rem]">
        <CSText size="31" color="white" weight="bold" className="mt-[4rem]">
          진로상담심리 캠퍼스
        </CSText>
        <section className="grid grid-cols-4 gap-12 py-[4rem]">
          {data.map((content, index) => (
            <Card key={index} content={content} />
          ))}
        </section>
      </main>
    </>
  )
}

export default CareerCounselignPage
