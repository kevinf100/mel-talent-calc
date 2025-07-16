import { TalentTree } from './TalentTree'
import { GlobalPointsSummary } from './GlobalPointsSummary'
import { useTalentTrees } from '../core/useTalentTrees'
import {
  TalentTreeScroller,
  type TalentTreeScrollerRef,
} from './TalentTreeScroller'

import ResetSprite from '../assets/ui/reset-all-button-sprite-small.png'
import ShareSprite from '../assets/ui/share-btn-sprite-small2.png'
import { ParchmentBorders } from './ParchmentBorders'
import { ClassPicker } from './ClassPicker'
import { showCopyToast } from '../lib/showCopyToast'
import {
  useState,
  useEffect,
  useRef,
} from 'react'
import type { ClassName } from '../core/types'
import { CLASS_NAMES } from '../core/constants'
import ClipboardJS from 'clipboard'

const SELECTED_CLASS_KEY =
  'mel-talent-calc-selected-class'

  const getInitialSelectedClass = (): ClassName => {
    const params = new URLSearchParams(window.location.search)
    const classFromURL = params.get('class')
  
    if (classFromURL) {
      return classFromURL as ClassName
    }
  
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
      // Add small delay to ensure new trees are rendered before scrolling
      setTimeout(() => {
        if (scrollerRef.current) {
          scrollerRef.current.scrollToFirst()
        }
      }, 10)
    }
  }, [selectedClass])

  const shareBtnRef =
    useRef<HTMLButtonElement>(null)
  const clipboardInstance =
    useRef<ClipboardJS | null>(null)

  useEffect(() => {
    if (!shareBtnRef.current) return

    // Initialize ClipboardJS on the share button
    clipboardInstance.current = new ClipboardJS(
      shareBtnRef.current,
      {
        text: () => window.location.href,
      }
    )

    clipboardInstance.current.on(
      'success',
      () => {
        showCopyToast()
      }
    )

    clipboardInstance.current.on('error', e => {
      console.error('Clipboard copy failed', e)
      showCopyToast()
    })

    return () => {
      clipboardInstance.current?.destroy()
    }
  }, [])

  const {
    trees,
    modify,
    resetTree,
    resetAll,
    totalTalentPoints,
    totalPointsSpent,
    pointsRemaining,
    currentLevel,
  } = useTalentTrees({
    selectedClass,
    setSelectedClass,
  })

  return (
    <div
      className='bg-gradient-to-r from-neutral-900 space-y-4 sm:max-w-screen-xl sm:mx-auto w-full bg-[#13191b]'
      style={{
        boxShadow:
          'rgba(11, 6, 4, 0.8) 0px 0px 50px, rgba(11, 6, 4, 0.6) 0px 0px 100px, rgba(11, 6, 4, 0.3) 0px 0px 500px',
      }}
    >
      <div className='max-w-[85rem] m-auto'>
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
                setSelectedClass={
                  setSelectedClass
                }
              />

              {/* 🔁 Reset + 📤 Share Buttons in second row */}
              <div
                className='flex justify-start sm:justify-between gap-4 z-1 items-end 
                [@media(max-width:440px)]:justify-center'
              >
                {/* Reset Button */}
                <button
                  onClick={resetAll}
                  aria-label='Reset All'
                  className='w-[120px] h-[39px] bg-no-repeat bg-[length:120px_79px] sm:w-[150px] sm:h-[49px] sm:bg-[length:150px_99px] hidden sm:flex'
                  style={{
                    backgroundImage: `url(${ResetSprite})`,
                    backgroundPosition: '0px 0px',
                  }}
                  onPointerDown={e => {
                    const isDesktop =
                      window.innerWidth >= 640
                    e.currentTarget.style.backgroundPosition =
                      isDesktop
                        ? '0px -48.75px'
                        : '0px -38.75px'
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

                {/* Share Button */}
                <button
                  ref={shareBtnRef}
                  aria-label='Share'
                  className='relative sm:top-1 w-[308px] h-[95px] bg-[length:308px_296px] bg-no-repeat sm:w-[308px] sm:h-[95px] sm:bg-[length:308px_296px]'
                  style={{
                    backgroundImage: `url(${ShareSprite})`,
                    backgroundPosition: '0px 0px',
                  }}
                  onMouseOver={e => {
                    const isDesktop =
                      window.innerWidth >= 640
                    if (isDesktop)
                      e.currentTarget.style.backgroundPosition =
                        '0px -197px'
                  }}
                  onPointerDown={e => {
                    const isDesktop =
                      window.innerWidth >= 640
                    e.currentTarget.style.backgroundPosition =
                      isDesktop
                        ? '-1px -99.5px'
                        : '-1px -100px'
                  }}
                  onPointerUp={e => {
                    e.currentTarget.style.backgroundPosition =
                      '0px -197px'
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
        <GlobalPointsSummary
          totalTalentPoints={totalTalentPoints}
          totalPointsSpent={totalPointsSpent}
          pointsRemaining={pointsRemaining}
          currentLevel={currentLevel}
          onResetAll={resetAll}
        />

        <TalentTreeScroller
          ref={scrollerRef}
          trees={trees.map((tree, i) => (
            <TalentTree
              key={tree.name}
              name={tree.name}
              backgroundImage={
                tree.backgroundImage
              }
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
    </div>
  )
}
