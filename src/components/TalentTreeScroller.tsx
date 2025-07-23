import {
  useImperativeHandle,
  forwardRef,
  useRef,
  useEffect,
  useState,
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
  const isManualScrollRef = useRef(false)
  const [isVisible, setIsVisible] = useState(false)

  // Add fade-in effect when trees are loaded
  useEffect(() => {
    if (trees.length > 0) {
      // Small delay to ensure DOM is ready, then fade in
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [trees.length])

  useImperativeHandle(ref, () => ({
    scrollToFirst: () => {
      const container = scrollContainerRef.current
      if (!container) return

      // Check if already at the start (avoid unnecessary scroll)
      if (container.scrollLeft <= 5) return // 5px tolerance

      // Use 'auto' behavior to prevent conflicts with snap logic
      // and ensure immediate positioning
      isManualScrollRef.current = true
      container.scrollTo({
        left: 0,
        behavior: 'auto', // Changed from 'smooth' to 'auto'
      })

      // Force a second scroll after a brief delay to ensure position
      // This handles cases where the first scroll gets corrected
      setTimeout(() => {
        if (container.scrollLeft > 5) {
          container.scrollTo({
            left: 0,
            behavior: 'auto',
          })
        }
        isManualScrollRef.current = false
      }, 50)
    },
  }))

  // Better snap behavior by ensuring proper alignment
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let isScrolling = false
    let scrollTimeout: ReturnType<
      typeof setTimeout
    >

    const handleScrollEnd = () => {
      // Only apply on mobile (when snap is active)
      if (window.innerWidth >= 768) return

      // Skip auto-snap if manual scroll is in progress
      if (isManualScrollRef.current) return

      const scrollLeft = container.scrollLeft
      const containerWidth = container.clientWidth

      // More precise calculation for which tree should be visible
      let targetIndex = Math.round(
        scrollLeft / containerWidth
      )

      // Special handling for left edge to fix the offset issue
      // Be more aggressive about snapping to position 0
      if (scrollLeft < containerWidth * 0.3) {
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
      className={`w-full overflow-x-auto snap-x snap-mandatory scroll-smooth relative transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        scrollPaddingLeft: '0px',
        scrollSnapAlign: 'start',
      }}
    >
      <div className='flex min-w-full lg:justify-between lg:space-x-0 lg:min-w-0 lg:flex-nowrap'>
        {trees.map((tree, index) => (
          <div
            key={index}
            className='flex-shrink-0 w-full lg:w-auto lg:flex-1 lg:max-w-[33.33%]'
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
