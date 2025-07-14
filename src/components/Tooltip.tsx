import { type ReactNode, useEffect, useState } from 'react'
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

import ButtonIncrement from '../assets/ui/red-button-increment.png'
import ButtonDecrement from '../assets/ui/red-button-decrement.png'
import ButtonIncrementGrey from '../assets/ui/red-button-increment-disabled2.png'
import ButtonDecrementGrey from '../assets/ui/red-button-decrement-disabled2.png'

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
  const [isDesktop, setIsDesktop] = useState(false)
  
  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    
    checkViewport()
    window.addEventListener('resize', checkViewport)
    
    return () => window.removeEventListener('resize', checkViewport)
  }, [])
  
  const { x, y, refs, strategy } = useFloating({
    placement: isDesktop ? 'top-start' : 'bottom',
    middleware: [
      offset({ crossAxis: 50 }),
      shift({ padding: 8 }),
      flip({ fallbackPlacements: isDesktop ? ['bottom', 'right-end'] : ['top'] }),
      // Only apply size middleware on desktop
      ...(isDesktop ? [
        size({
          apply({ availableWidth, elements }) {
            // Use setTimeout to ensure tooltip is fully rendered
            setTimeout(() => {
              // Set default max-width to 24rem (384px)
              const defaultMaxWidth = 24 * 16 // 24rem in pixels
              
              // First, apply default max-width
              Object.assign(elements.floating.style, {
                maxWidth: `${defaultMaxWidth}px`,
              })
              
              // Force a layout recalculation
              void elements.floating.offsetHeight
              
              // Now check if tooltip is clipping vertically with the default width
              const rect = elements.floating.getBoundingClientRect()
              const isClippingVertically = rect.bottom > window.innerHeight || rect.top < 0
              
              console.log(`🔍 Clipping check: bottom=${rect.bottom}, viewportHeight=${window.innerHeight}, top=${rect.top}`)
              console.log(`❓ Is clipping? bottom > viewport: ${rect.bottom > window.innerHeight}, top < 0: ${rect.top < 0}, overall: ${isClippingVertically}`)
              
              if (isClippingVertically) {
                console.log('⚠️ Tooltip is clipping vertically, starting width optimization')
                
                // Progressively expand width until tooltip fits or we reach maximum
                const maxExpandedWidth = Math.min(availableWidth, window.innerWidth * 0.5) // Max 50% of screen width
                const step = 48 // 3rem in pixels
                let currentWidth = defaultMaxWidth
                let attempts = 0
                const maxAttempts = 10
                
                while (currentWidth < maxExpandedWidth && attempts < maxAttempts) {
                  currentWidth += step
                  
                  // Apply the new width
                  Object.assign(elements.floating.style, {
                    width: `${currentWidth}px`,
                    maxWidth: `${currentWidth}px`,
                    minWidth: `${currentWidth}px`,
                  })
                  
                  // Force layout recalculation
                  void elements.floating.offsetHeight
                  
                  // Check if it still clips
                  const newRect = elements.floating.getBoundingClientRect()
                  const stillClipping = newRect.bottom > window.innerHeight || newRect.top < 0
                  
                  console.log(`🔍 Attempt ${attempts + 1}: width=${currentWidth}px, height=${newRect.height}px, stillClipping=${stillClipping}`)
                  
                  if (!stillClipping) {
                    console.log(`✅ Tooltip width optimized at ${currentWidth}px (${currentWidth/16}rem)`)
                    return
                  }
                  
                  attempts++
                }
                
                console.log(`🎯 Tooltip width expanded to maximum ${currentWidth}px (${currentWidth/16}rem) but may still clip`)
              } else {
                console.log('✅ Tooltip fits within 24rem, no expansion needed')
              }
            }, 0)
          },
        })
      ] : []),
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
    backgroundSize: active ? '125px 90px' : '125px 46px',
    backgroundPosition: active ? '0px 0px' : 'center',
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
        touchAction: 'manipulation'
      }}
      className="tooltip-container"
    >
      <div className='pointer-events-auto'>
        <MetalBordersSmall>
          <div className='bg-[#2a2a2af7] p-3 text-sm shadow-lg relative'>
            <div className='break-words whitespace-normal'>{children}</div>
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
                      e.currentTarget.style.backgroundPosition = '0px -46px'
                  }}
                  onPointerUp={e => {
                    if (canDecrement)
                      e.currentTarget.style.backgroundPosition = '0px 0px'
                  }}
                  onPointerLeave={e => {
                    if (canDecrement)
                      e.currentTarget.style.backgroundPosition = '0px 0px'
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
                      e.currentTarget.style.backgroundPosition = '0px -46px'
                  }}
                  onPointerUp={e => {
                    if (canIncrement)
                      e.currentTarget.style.backgroundPosition = '0px 0px'
                  }}
                  onPointerLeave={e => {
                    if (canIncrement)
                      e.currentTarget.style.backgroundPosition = '0px 0px'
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
