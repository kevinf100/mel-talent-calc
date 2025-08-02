import { type ReactNode, useEffect } from 'react'
import {
  useFloating,
  offset,
  autoUpdate,
  shift,
  flip,
  size,
} from '@floating-ui/react-dom'
import { createPortal } from 'react-dom'

import { MetalBordersSmall } from './MetalBordersSmall'
import { useViewport } from '../hooks/useViewport'
import { optimizeTooltipWidth } from '../utils/tooltipOptimization'

type TooltipProps = {
  children: ReactNode
  referenceEl: HTMLElement | null
  open: boolean
  // Removed increment/decrement functionality
}

/**
 * Responsive tooltip component with intelligent width optimization
 *
 * Features:
 * - Desktop: 24rem default width with aggressive expansion for vertical clipping
 * - Mobile: Simple bottom-only flip behavior with natural width
 * - Automatic viewport detection and responsive behavior
 *
 * @param props - TooltipProps configuration object
 * @returns JSX tooltip element rendered via portal
 */
export const Tooltip = ({
  children,
  referenceEl,
  open,
}: TooltipProps) => {
  const { isDesktop } = useViewport()

  const { x, y, refs, strategy } = useFloating({
    placement: isDesktop ? 'top-start' : 'top',
    middleware: [
      offset({ crossAxis: 50 }),
      shift({ padding: 8 }),
      flip({
        fallbackPlacements: isDesktop
          ? ['bottom', 'right-end']
          : ['bottom'],
      }),
      // Only apply size middleware on desktop
      ...(isDesktop
        ? [
            size({
              apply({
                availableWidth,
                elements,
              }) {
                optimizeTooltipWidth(
                  elements,
                  availableWidth
                )
              },
            }),
          ]
        : []),
    ],
    whileElementsMounted: autoUpdate,
  })

  const { setReference, setFloating } = refs

  useEffect(() => {
    if (referenceEl) setReference(referenceEl)
  }, [referenceEl, setReference])

  if (!open || !referenceEl) return null

  const tooltip = (
    <div
      ref={setFloating}
      style={{
        position: strategy,
        top: y ?? 0,
        left: x ?? 0,
        zIndex: 100,
        pointerEvents: 'none',
        touchAction: 'manipulation',
      }}
      className='tooltip-container'
    >
      <div className='pointer-events-auto'>
        <MetalBordersSmall>
          <div className='bg-[#2a2a2af7] p-3 text-sm shadow-lg relative'>
            <div className='break-words whitespace-normal'>
              {children}
            </div>
          </div>
        </MetalBordersSmall>
      </div>
    </div>
  )

  return createPortal(tooltip, document.body)
}
