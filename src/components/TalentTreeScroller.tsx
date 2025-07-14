import {
  useImperativeHandle,
  forwardRef,
  useRef,
  useEffect,
} from 'react'

export type TTalentTreeScrollerProps = {
  trees: React.ReactNode[]
}

export interface TalentTreeScrollerRef {
  scrollToFirst: () => void
}

export const TalentTreeScroller = forwardRef<
  TalentTreeScrollerRef,
  TTalentTreeScrollerProps
>(({ trees }, ref) => {
  const scrollContainerRef =
    useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    scrollToFirst: () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          left: 0,
          behavior: 'smooth',
        })
      }
    },
  }))

  // Better snap behavior by ensuring proper alignment
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let isScrolling = false
    let scrollTimeout: NodeJS.Timeout

    const handleScrollEnd = () => {
      // Only apply on mobile (when snap is active)
      if (window.innerWidth >= 768) return

      const scrollLeft = container.scrollLeft
      const containerWidth = container.clientWidth

      // More precise calculation for which tree should be visible
      let targetIndex = Math.round(
        scrollLeft / containerWidth
      )

      // Special handling for left edge to fix the offset issue
      if (scrollLeft < containerWidth * 0.2) {
        // When scrolling to the left edge, always snap to 0
        targetIndex = 0
      } else if (
        scrollLeft >
        (trees.length - 1) * containerWidth -
          containerWidth * 0.2
      ) {
        // When scrolling to the right edge, snap to last tree
        targetIndex = trees.length - 1
      } else {
        // For middle positions, be more aggressive about snapping
        const remainder =
          scrollLeft % containerWidth
        if (remainder < containerWidth * 0.3) {
          targetIndex = Math.floor(
            scrollLeft / containerWidth
          )
        } else if (
          remainder >
          containerWidth * 0.7
        ) {
          targetIndex = Math.ceil(
            scrollLeft / containerWidth
          )
        }
      }

      const targetScrollLeft =
        targetIndex * containerWidth

      // Be more aggressive about correcting misalignment
      const threshold = 2 // reduced threshold for more precise snapping
      if (
        Math.abs(scrollLeft - targetScrollLeft) >
        threshold
      ) {
        container.scrollTo({
          left: targetScrollLeft,
          behavior: 'auto', // Use auto instead of smooth for precise alignment
        })
      }
    }

    const handleScroll = () => {
      isScrolling = true
      clearTimeout(scrollTimeout)

      // Set a timeout to detect when scrolling has ended
      scrollTimeout = setTimeout(() => {
        if (isScrolling) {
          isScrolling = false
          handleScrollEnd()
        }
      }, 100)
    }

    // Use both scroll and scrollend events for better coverage
    container.addEventListener(
      'scroll',
      handleScroll
    )

    // Also listen for scrollend if available (newer browsers)
    if ('onscrollend' in container) {
      container.addEventListener(
        'scrollend',
        handleScrollEnd
      )
    }

    return () => {
      container.removeEventListener(
        'scroll',
        handleScroll
      )
      if ('onscrollend' in container) {
        container.removeEventListener(
          'scrollend',
          handleScrollEnd
        )
      }
      clearTimeout(scrollTimeout)
    }
  }, [trees.length])

  return (
    <div
      ref={scrollContainerRef}
      className='w-full overflow-x-auto snap-x snap-mandatory scroll-smooth relative'
      style={{
        scrollPaddingLeft: '0px',
        scrollSnapAlign: 'start',
      }}
    >
      <div className='flex min-w-full md:justify-between md:space-x-0 md:min-w-0 md:flex-nowrap'>
        {trees.map((tree, index) => (
          <div
            key={index}
            className='flex-shrink-0 w-full md:w-auto md:flex-1 md:max-w-[33.33%]'
            style={{
              scrollSnapAlign: 'start',
              scrollSnapStop: 'always',
            }}
          >
            {tree}
          </div>
        ))}
      </div>
    </div>
  )
})
