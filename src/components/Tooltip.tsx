import { type ReactNode, useEffect } from 'react'
import {
  useFloating,
  offset,
  autoUpdate,
  shift,
  flip,
} from '@floating-ui/react-dom'
import { createPortal } from 'react-dom'
import { MetalBordersSmall } from './MetalBordersSmall'
import ButtonIncrement from '../assets/ui/red-button-increment.png' 
import ButtonDecrement from '../assets/ui/red-button-decrement.png'

type TooltipProps = {
  children: ReactNode
  referenceEl: HTMLElement | null
  open: boolean
  onIncrement?: () => void
  onDecrement?: () => void
  disabled?: boolean
}

export const Tooltip = ({
  children,
  referenceEl,
  open,
  onIncrement,
  onDecrement,
  disabled,
}: TooltipProps) => {
  const { x, y, refs, strategy } = useFloating({
    placement: 'top-start',
    middleware: [
      offset({ crossAxis: 50 }),
      shift({ padding: 8 }),
      flip({
        fallbackPlacements: [
          'right-end',
          'bottom',
        ],
      }),
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
        pointerEvents: 'none', // passive layout container
      }}
      className='max-w-[24rem] min-w-[24rem]'
    >
      {/* 👇 Enable interaction only inside content zone */}
      <div className='pointer-events-auto'>
        <MetalBordersSmall>
          <div className='bg-[#2a2a2af7] p-3 text-sm shadow-lg relative'>
            {/* 🌟 Tooltip content */}
            <div className='break-words whitespace-normal'>
              {children}
            </div>

            {/* 📲 Mobile-only buttons */}
            {!disabled &&
              (onIncrement || onDecrement) && (
                <div className='flex gap-2 mt-1 md:hidden touch-manipulation justify-between'>
                  {onDecrement && (
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        onDecrement?.()
                      }}
                      className='w-[125px] h-[45px] bg-no-repeat bg-[length:125px_90px]'
                      style={{
                        backgroundImage: `url(${ButtonDecrement})`,
                        backgroundPosition:
                          '0px 0px',
                      }}
                      onPointerDown={e => {
                        e.currentTarget.style.backgroundPosition =
                          '0px -46px'
                      }}
                      onPointerUp={e => {
                        e.currentTarget.style.backgroundPosition =
                          '0px 0px'
                      }}
                      onPointerLeave={e => {
                        e.currentTarget.style.backgroundPosition =
                          '0px 0px'
                      }}
                    />
                  )}
                  {onIncrement && (
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        onIncrement?.()
                      }}
                      className='w-[125px] h-[45px] bg-no-repeat bg-[length:125px_90px]'
                      style={{
                        backgroundImage: `url(${ButtonIncrement})`,
                        backgroundPosition:
                          '0px 0px',
                      }}
                      onPointerDown={e => {
                        e.currentTarget.style.backgroundPosition =
                          '0px -46px'
                      }}
                      onPointerUp={e => {
                        e.currentTarget.style.backgroundPosition =
                          '0px 0px'
                      }}
                      onPointerLeave={e => {
                        e.currentTarget.style.backgroundPosition =
                          '0px 0px'
                      }}
                    />
                  )}
                </div>
              )}
          </div>
        </MetalBordersSmall>
      </div>
    </div>
  )

  return createPortal(tooltip, document.body)
}
