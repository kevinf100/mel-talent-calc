import { lazy, Suspense } from 'react'
// Critical components for LCP - keep these eager
const TalentTree = lazy(() => import('./TalentTree').then(m => ({ default: m.TalentTree })))
const GlobalPointsSummary = lazy(() => import('./GlobalPointsSummary').then(m => ({ default: m.GlobalPointsSummary })))
const ClassPicker = lazy(() => import('./ClassPicker').then(m => ({ default: m.ClassPicker })))
// Lazy load the talent tree scroller since it's below the fold
const TalentTreeScroller = lazy(() => import('./TalentTreeScroller').then(m => ({ default: m.TalentTreeScroller })))
import { useTalentTrees } from '../core/useTalentTrees'
import type { TalentTreeScrollerRef } from './TalentTreeScroller'
import { ParchmentBorders } from './ParchmentBorders'
import { showCopyToast } from '../lib/showCopyToast'
import {
  useState,
  useEffect,
  useRef,
} from 'react'
import type { ClassName } from '../core/types'
import { CLASS_NAMES } from '../core/constants'
import ClipboardJS from 'clipboard'
import { useClassCrest } from '../hooks/useClassCrest'
import ShareSprite from '../assets/ui/share-btn-sprite-small2.webp?w=616&h=592&imagetools'

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
    error,
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
  // Use optimized AVIF class crest
  const classCrest = useClassCrest(selectedClass)

  const pointsSpentPerTreeOrdered = trees.map(
    tree => pointsSpentPerTree[tree.name] || 0
  )


  // Show error state if there's an error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className='max-w-[85rem] w-full m-auto px-4'>
          <div className="w-full flex items-center justify-center bg-red-900 bg-opacity-30 rounded-lg py-16">
            <div className="text-center p-8">
              <p className="text-red-400 text-lg mb-4">Failed to load talent data</p>
              <p className="text-red-300 text-sm mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show full app when everything is ready
  return (
    <div>
      <div className='max-w-[85rem] m-auto'>
        <div className='flex flex-col w-full gap-4'>
          <ParchmentBorders>
            {/* Class Crest */}
            {classCrest && (
              <div 
                className='absolute right-0 top-0 z-0 sm:opacity-50 opacity-40 pointer-events-none fade-mask 
                w-[150px] h-[150px] sm:w-[250px] sm:h-[250px]'
                style={{
                  backgroundImage: `url(${classCrest})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
                role="img"
                aria-label={`${selectedClass} crest`}
              />
            )}
            <div className='flex flex-col w-full gap-6'>
              {/* 🎭 Class Picker in first row */}
              <ClassPicker
                primaryTree={primaryTree}
                pointsSpentPerTree={pointsSpentPerTreeOrdered}
                selectedClass={selectedClass}
                setSelectedClass={setSelectedClass}
              />
              <div className='flex justify-center sm:justify-end gap-4 z-1 items-end'>
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
                    const isDesktop = window.innerWidth >= 640
                    if (isDesktop)
                      e.currentTarget.style.backgroundPosition = '0px -197px'
                  }}
                  onPointerDown={e => {
                    const isDesktop = window.innerWidth >= 640
                    e.currentTarget.style.backgroundPosition =
                      isDesktop ? '-1px -99.5px' : '-1px -100px'
                  }}
                  onPointerUp={e => {
                    e.currentTarget.style.backgroundPosition = '0px -197px'
                  }}
                  onPointerLeave={e => {
                    e.currentTarget.style.backgroundPosition = '0px 0px'
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

        <Suspense fallback={null}>
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
                onClickTalent={(id, e) => modify(i, id, e)}
                onResetTree={() => resetTree(i)}
              />
            ))}
          />
        </Suspense>
      </div>
    </div>
  )
}
