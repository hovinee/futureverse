'use client'

import GridCuration from '@/components/grid-curation/GridCuration'
import CSText from '@/components/ui/text/CSText'
import clsx from 'clsx'
import { useState } from 'react'

const curation = [
  'AI상담소',
  '라이브 모드',
  '집단 상담',
  '금주의 인기 월드 힐링',
  '추천 치유소',
  'TO BE CONTINUE',
]

const MainArea = () => {
  const [category, setCategory] = useState<number>(0)
  return (
    <div className="relative mx-auto max-w-[114rem] rounded-lg">
      <CSText size="21" color="black" weight="bold">
        둘러보기
      </CSText>
      {['전체', '진로상담', '치유소'].map((title, index) => (
        <div
          key={index}
          className={clsx(
            'ml-[0.6rem] mt-[1rem] inline-block cursor-pointer rounded-full border p-[1rem]',
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
          <div key={index} className="flex flex-col gap-[1.5rem]">
            <CSText size="18" color="black" weight="bold">
              {title}
            </CSText>
            <GridCuration />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainArea
