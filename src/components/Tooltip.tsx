import { type ReactNode, useEffect } from 'react'
import { useFloating, offset, autoUpdate, flip, shift } from '@floating-ui/react-dom'
import { MetalBordersSmall } from './MetalBordersSmall'

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
    placement: 'right-start',
    middleware: [
      offset(4),
      flip({ fallbackPlacements: ['bottom'] }),
      shift({ padding: 4 }),
    ],
    whileElementsMounted: autoUpdate,
  })

  const { setReference, setFloating } = refs

  useEffect(() => {
    if (referenceEl) setReference(referenceEl)
  }, [referenceEl, setReference])

  if (!open || !referenceEl) return null

  return (
    <div
      ref={setFloating}
      style={{
        position: strategy,
        top: y ?? 0,
        left: x ?? 0,
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      <MetalBordersSmall>
        <div
          className="bg-[#2a2a2af7] text-[#2e2a22] border border-yellow-700 rounded-md min-w-[16rem] p-3 text-sm shadow-lg relative"
        >
          {children}

          {!disabled && (onIncrement || onDecrement) && (
            <div className="flex gap-2 mt-3 md:hidden pointer-events-auto">
              <button
                onClick={onDecrement}
                className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-semibold"
              >
                -
              </button>
              <button
                onClick={onIncrement}
                className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold"
              >
                +
              </button>
            </div>
          )}
        </div>
      </MetalBordersSmall>
    </div>
  )
}
