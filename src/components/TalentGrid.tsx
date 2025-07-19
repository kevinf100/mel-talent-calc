import { TalentTree } from './TalentTree'
import { GlobalPointsSummary } from './GlobalPointsSummary'
import { useTalentTrees } from '../core/useTalentTrees'
import {
  TalentTreeScroller,
  type TalentTreeScrollerRef,
} from './TalentTreeScroller'
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
import { useAsset } from '../hooks/useAsset'

const SELECTED_CLASS_KEY =
  'mel-talent-calc-selected-class'

const getInitialSelectedClass = (): ClassName => {
  const params = new URLSearchParams(
    window.location.search
  )
  const classFromURL = params.get('class')

  if (
    classFromURL &&
    CLASS_NAMES.includes(
      classFromURL as ClassName
    )
  ) {
    return classFromURL as ClassName
  }

  try {
    const saved = localStorage.getItem(
      SELECTED_CLASS_KEY
    )
    if (
      saved &&
      CLASS_NAMES.includes(saved as ClassName)
    ) {
      return saved as ClassName
    }
  } catch {
    // Ignore storage errors
  }

  return CLASS_NAMES[0]
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
    pointsSpentPerTree,
    primaryTree,
  } = useTalentTrees({
    selectedClass,
    setSelectedClass,
  })
  const classCrestImage = useAsset(
    `images/${selectedClass}/classcrest_${selectedClass}.webp`
  )
  const ShareSprite = useAsset('ui/share-btn-sprite-small2.webp')

  const pointsSpentPerTreeOrdered = trees.map(
    tree => pointsSpentPerTree[tree.name] || 0
  )

  return (
    <div>
      <div className='max-w-[85rem] m-auto'>
        <div className='flex flex-col w-full gap-4'>
          <ParchmentBorders>
            {/* 🛡️ Class Crest Image */}
            {classCrestImage && (
              <img
                src={classCrestImage}
                alt={`${selectedClass} crest`}
                className='absolute right-0 top-0 z-0 sm:opacity-50 opacity-40 pointer-events-none fade-mask 
              sm:top-[-100px] top-[5%] max-md:left-[140px] 
              [@media(max-width:420px)]:top-[52%]
              [@media(max-width:420px)]:left-[100px]
              [@media(max-width:1009px)]:top-[0]'
              />
            )}
            <div className='flex flex-col w-full gap-6'>
              {/* 🎭 Class Picker in first row */}
              <ClassPicker
              primaryTree={primaryTree}
                pointsSpentPerTree={
                  pointsSpentPerTreeOrdered
                }
                selectedClass={selectedClass}
                setSelectedClass={
                  setSelectedClass
                }
              />
              <div
                className='flex justify-center sm:justify-end gap-4 z-1 items-end'
              >
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
