import { useState, useEffect } from 'react'

export const useViewport = () => {
  const [windowWidth, setWindowWidth] = useState(
    window.innerWidth
  )
  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= 768
  )
  const [containerWidth, setContainerWidth] =
    useState(0)

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth
      setWindowWidth(w)
      setIsDesktop(w >= 768)

      const gridContainer =
        document.querySelector(
          '.grid.grid-cols-4'
        )
      if (gridContainer) {
        setContainerWidth(
          gridContainer.clientWidth
        )
      }
    }

    onResize() // initialize on mount

    window.addEventListener('resize', onResize)
    return () =>
      window.removeEventListener(
        'resize',
        onResize
      )
  }, [])

  return {
    windowWidth,
    isDesktop,
    containerWidth,
  }
}
