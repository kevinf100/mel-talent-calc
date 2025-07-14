// Constants for tooltip width optimization
export const DEFAULT_MAX_WIDTH = 24 * 16 // 24rem in pixels
export const EXPANSION_STEP = 48 // 3rem in pixels
export const MAX_ATTEMPTS = 10
export const MAX_SCREEN_WIDTH_RATIO = 0.5

/**
 * Checks if a tooltip element is clipping vertically
 * @param element - The tooltip element to check
 * @returns True if the tooltip is clipping vertically
 */
export const isTooltipClippingVertically = (
  element: HTMLElement
): boolean => {
  const rect = element.getBoundingClientRect()
  return (
    rect.bottom > window.innerHeight ||
    rect.top < 0
  )
}

/**
 * Applies width styling to a tooltip element
 * @param element - The tooltip element to style
 * @param width - The width value in pixels
 */
export const applyTooltipWidth = (
  element: HTMLElement,
  width: number
): void => {
  Object.assign(element.style, {
    width: `${width}px`,
    maxWidth: `${width}px`,
    minWidth: `${width}px`,
  })
}

/**
 * Optimizes tooltip width to prevent vertical clipping
 * @param elements - Floating UI elements object
 * @param availableWidth - Available width from floating UI
 * @returns Promise that resolves when optimization is complete
 */
export const optimizeTooltipWidth = async (
  elements: { floating: HTMLElement },
  availableWidth: number
): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      // Apply default max-width first
      Object.assign(elements.floating.style, {
        maxWidth: `${DEFAULT_MAX_WIDTH}px`,
      })

      // Force layout recalculation
      elements.floating.offsetHeight

      // Check if clipping with default width
      if (
        !isTooltipClippingVertically(
          elements.floating
        )
      ) {
        resolve()
        return
      }

      // Progressive width expansion
      const maxExpandedWidth = Math.min(
        availableWidth,
        window.innerWidth * MAX_SCREEN_WIDTH_RATIO
      )
      let currentWidth = DEFAULT_MAX_WIDTH
      let attempts = 0

      while (
        currentWidth < maxExpandedWidth &&
        attempts < MAX_ATTEMPTS
      ) {
        currentWidth += EXPANSION_STEP

        // Apply new width
        applyTooltipWidth(
          elements.floating,
          currentWidth
        )

        // Force layout recalculation
        elements.floating.offsetHeight

        // Check if clipping is resolved
        if (
          !isTooltipClippingVertically(
            elements.floating
          )
        ) {
          resolve()
          return
        }

        attempts++
      }

      resolve()
    }, 0)
  })
}
