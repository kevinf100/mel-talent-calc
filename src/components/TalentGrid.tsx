import { TalentTree } from './TalentTree'
import { GlobalPointsSummary } from './GlobalPointsSummary'
import { useTalentTrees } from '../core/useTalentTrees'
import {
  TalentTreeScroller,
  type TalentTreeScrollerRef,
} from './TalentTreeScroller'

import ResetSprite from '../assets/ui/reset-all-button-sprite-small.png'
import { ParchmentBorders } from './ParchmentBorders'
import { ClassPicker } from './ClassPicker'
import {
  useState,
  useEffect,
  useRef,
} from 'react'
import type { ClassName } from '../core/types'
import { CLASS_NAMES } from '../core/constants'

const SELECTED_CLASS_KEY =
  'mel-talent-calc-selected-class'

const getInitialSelectedClass = (): ClassName => {
  try {
    const saved = localStorage.getItem(
      SELECTED_CLASS_KEY
    )
    return (saved as ClassName) || CLASS_NAMES[0]
  } catch {
    return CLASS_NAMES[0]
  }
}

export const TalentGrid = () => {
  const [selectedClass, setSelectedClass] =
    useState<ClassName>(getInitialSelectedClass)
  const scrollerRef =
    useRef<TalentTreeScrollerRef>(null)

  // Save selected class to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(
        SELECTED_CLASS_KEY,
        selectedClass
      )
    } catch {
      // Silently fail if localStorage is not available
    }
  }, [selectedClass])

  // Reset scroll to first tree when class changes
  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollToFirst()
    }
  }, [selectedClass])

  const {
    trees,
    modify,
    resetTree,
    resetAll,
    totalTalentPoints,
    totalPointsSpent,
    pointsRemaining,
  } = useTalentTrees({
    selectedClass,
    setSelectedClass,
  })

  return (
    <div className='space-y-4 sm:max-w-screen-xl sm:mx-auto w-full'>
      <GlobalPointsSummary
        totalTalentPoints={totalTalentPoints}
        totalPointsSpent={totalPointsSpent}
        pointsRemaining={pointsRemaining}
      />
      <div className='flex flex-col w-full gap-4'>
        <ParchmentBorders>
          {/* 🛡️ Class Crest Image */}
          <img
            src={`src/assets/images/${selectedClass}/classcrest_${selectedClass}.png`}
            alt={`${selectedClass} crest`}
            className='absolute right-0 top-0 z-0 sm:opacity-50 opacity-40 pointer-events-none fade-mask 
              sm:top-[-100px] top-[5%] max-md:left-[140px] 
              [@media(max-width:420px)]:top-[52%]
              [@media(max-width:420px)]:left-[100px]
              [@media(max-width:1009px)]:top-[0]'
          />
          <div className='flex flex-col w-full gap-6'>
            {/* 🎭 Class Picker in first row */}
            <ClassPicker
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
            />

            {/* 🔁 Reset Button in second row */}
            <div className='flex justify-start z-1'>
              <button
                onClick={resetAll}
                aria-label='Reset All'
                className='w-[120px] h-[39px] bg-no-repeat bg-[length:120px_79px] sm:w-[150px] sm:h-[49px] sm:bg-[length:150px_99px]'
                style={{
                  backgroundImage: `url(${ResetSprite})`,
                  backgroundPosition: '0px 0px',
                }}
                onPointerDown={e => {
                  const isDesktop =
                    window.innerWidth >= 640
                  e.currentTarget.style.backgroundPosition =
                    isDesktop
                      ? '0.3px -48.75px'
                      : '0.3px -38.75px'
                }}
                onPointerUp={e => {
                  e.currentTarget.style.backgroundPosition =
                    '0px 0px'
                }}
                onPointerLeave={e => {
                  e.currentTarget.style.backgroundPosition =
                    '0px 0px'
                }}
              />
            </div>
          </div>
        </ParchmentBorders>
      </div>

      <TalentTreeScroller
        ref={scrollerRef}
        trees={trees.map((tree, i) => (
          <TalentTree
            key={tree.name}
            name={tree.name}
            backgroundImage={tree.backgroundImage}
            specIcon={tree.specIcon}
            talents={tree.talents}
            pointsRemaining={pointsRemaining}
            onClickTalent={(id, e) =>
              modify(i, id, e)
            }
            onResetTree={() => resetTree(i)}
          />
        ))}
      />
    </div>
  )
}
