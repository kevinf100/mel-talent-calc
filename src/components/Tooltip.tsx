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
import ButtonIncrement from '../assets/ui/red-button-increment.webp'
import ButtonDecrement from '../assets/ui/red-button-decrement.webp'
import ButtonIncrementGrey from '../assets/ui/red-button-increment-disabled2.webp'
import ButtonDecrementGrey from '../assets/ui/red-button-decrement-disabled2.webp'

type TooltipProps = {
  children: ReactNode
  referenceEl: HTMLElement | null
  open: boolean
  onIncrement?: () => void
  onDecrement?: () => void
  disabled?: boolean
  canIncrement: boolean
  canDecrement: boolean
}

/**
 * Responsive tooltip component with intelligent width optimization
 *
 * Features:
 * - Desktop: 24rem default width with aggressive expansion for vertical clipping
 * - Mobile: Simple bottom-only flip behavior with natural width
 * - Automatic viewport detection and responsive behavior
 * - Touch-friendly increment/decrement buttons on mobile
 *
 * @param props - TooltipProps configuration object
 * @returns JSX tooltip element rendered via portal
 */
export const Tooltip = ({
  children,
  referenceEl,
  open,
  onIncrement,
  onDecrement,
  disabled,
  canIncrement,
  canDecrement,
}: TooltipProps) => {
  const { isDesktop } = useViewport()

  const { x, y, refs, strategy } = useFloating({
    placement: 'top-start',
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

  const createButtonStyle = (
    active: boolean,
    activeSprite: string,
    disabledSprite: string
  ) => ({
    backgroundImage: `url(${active ? activeSprite : disabledSprite})`,
    backgroundSize: active
      ? '125px 90px'
      : '125px 46px',
    backgroundPosition: active
      ? '0px 0px'
      : 'center',
  })

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
            {!disabled && (
              <div className='flex gap-2 mt-1 md:hidden touch-manipulation justify-between'>
                <button
                  onClick={e => {
                    if (!canDecrement) return
                    e.stopPropagation()
                    onDecrement?.()
                  }}
                  disabled={!canDecrement}
                  className='w-[125px] h-[45px] bg-no-repeat'
                  style={createButtonStyle(
                    canDecrement,
                    ButtonDecrement,
                    ButtonDecrementGrey
                  )}
                  onPointerDown={e => {
                    if (canDecrement)
                      e.currentTarget.style.backgroundPosition =
                        '0px -46px'
                  }}
                  onPointerUp={e => {
                    if (canDecrement)
                      e.currentTarget.style.backgroundPosition =
                        '0px 0px'
                  }}
                  onPointerLeave={e => {
                    if (canDecrement)
                      e.currentTarget.style.backgroundPosition =
                        '0px 0px'
                  }}
                />

                <button
                  onClick={e => {
                    if (!canIncrement) return
                    e.stopPropagation()
                    onIncrement?.()
                  }}
                  disabled={!canIncrement}
                  className='w-[125px] h-[45px] bg-no-repeat'
                  style={createButtonStyle(
                    canIncrement,
                    ButtonIncrement,
                    ButtonIncrementGrey
                  )}
                  onPointerDown={e => {
                    if (canIncrement)
                      e.currentTarget.style.backgroundPosition =
                        '0px -46px'
                  }}
                  onPointerUp={e => {
                    if (canIncrement)
                      e.currentTarget.style.backgroundPosition =
                        '0px 0px'
                  }}
                  onPointerLeave={e => {
                    if (canIncrement)
                      e.currentTarget.style.backgroundPosition =
                        '0px 0px'
                  }}
                />
              </div>
            )}
          </div>
        </MetalBordersSmall>
      </div>
    </div>
  )

  return createPortal(tooltip, document.body)
}
