import { useState, useEffect } from 'react'

/**
 * Custom hook for detecting viewport size and responsive breakpoints
 * @returns Object containing viewport state and helper functions
 */
export const useViewport = () => {
  const [isDesktop, setIsDesktop] =
    useState(false)

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 768)
    }

    checkViewport()
    window.addEventListener(
      'resize',
      checkViewport
    )

    return () =>
      window.removeEventListener(
        'resize',
        checkViewport
      )
  }, [])

  return { isDesktop }
}
