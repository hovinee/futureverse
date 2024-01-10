'use client'

import GridCuration from '@/components/grid-curation/GridCuration'
import CSText from '@/components/ui/text/CSText'
import { thumbnailCounseling, thumbnailHealing } from '@/data/unity/data'
import clsx from 'clsx'
import { useState } from 'react'

const curation = ['상담 월드', '힐링 월드', '진단']
const curationCategory = ['전체', '상담 월드', '힐링 월드', '진단']

const MainArea = () => {
  const [category, setCategory] = useState<number>(0)
  return (
    <div className="relative mx-auto rounded-lg px-[9rem]">
      <CSText size="21" color="white" weight="bold">
        둘러보기
      </CSText>
      {curationCategory.map((title, index) => (
        <div
          key={index}
          className={clsx(
            'ml-[0.6rem] mt-[1rem] inline-block cursor-pointer rounded-full border border-black p-[1rem]',
            category === index ? 'bg-00A886' : 'bg-white',
          )}
          onClick={() => setCategory(index)}
        >
          <CSText
            size="14"
            className={clsx(
              category === index ? 'text-white' : 'text-[#5E6066]',
            )}
            weight="bold"
          >
            {title}
          </CSText>
        </div>
      ))}
      <div className="mt-[3rem] flex flex-col gap-[6rem]">
        {curation.map((title, index) => (
          <>
            {category === 0 && (
              <>
                <div key={index} className="flex flex-col gap-[1.5rem]">
                  <CSText size="18" color="white" weight="bold">
                    {title}
                  </CSText>

                  <GridCuration
                    tumbnailContent={
                      index === 0 ? thumbnailCounseling : thumbnailHealing
                    }
                  />
                </div>
              </>
            )}
            {category !== 0 && (
              <>
                {category - 1 === index && (
                  <div key={index} className="flex flex-col gap-[1.5rem]">
                    <CSText size="18" color="white" weight="bold">
                      {title}
                    </CSText>

                    <GridCuration
                      tumbnailContent={
                        index === 0 ? thumbnailCounseling : thumbnailHealing
                      }
                    />
                  </div>
                )}
              </>
            )}
          </>
        ))}
      </div>
    </div>
  )
}

export default MainArea
