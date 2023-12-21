import clsx from 'clsx'
import AutoSizeImage from '../auto-size-image/AutoSizeImage'

interface Props {
  children: React.ReactNode
  image_url: string
  lecture?: boolean
}

const BannerSection = ({ children, image_url, lecture }: Props) => {
  return (
    <section
      className={clsx(
        'h-[50rem] xl:h-[100%]',
        lecture && 'lg:h-[64rem] xl:h-[64rem]',
      )}
    >
      <div className="relative h-full w-full">
        <AutoSizeImage src={image_url} full priority />
        {children}
      </div>
    </section>
  )
}

export default BannerSection
