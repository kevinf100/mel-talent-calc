import { type ReactNode, useEffect, useRef } from 'react'
import { useFloating, offset, arrow, autoUpdate, flip, shift } from '@floating-ui/react-dom'

type TooltipProps = {
  children: ReactNode
  referenceEl: HTMLElement | null
  open: boolean
  onIncrement?: () => void
  onDecrement?: () => void
  disabled?: boolean
}

export const Tooltip = (tooltipProps: TooltipProps) => {
  const {
    children,
    referenceEl,
    open,
    onIncrement,
    onDecrement,
    disabled,
  } = tooltipProps;

  const arrowRef = useRef<HTMLDivElement | null>(null)

  const { x, y, refs, strategy, middlewareData } = useFloating({
    placement: 'right-start',
    middleware: [
      offset(8),
      flip({
        fallbackPlacements: ['bottom'],
      }),
      shift({ padding: 8 }),
      arrow({ element: arrowRef, padding: 6 }),
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
        backgroundColor: '#f9f4e5',
        color: '#2e2a22',
        border: '1px solid #d4af37',
        borderRadius: '0.375rem',
        minWidth: '12rem',
        pointerEvents: 'none',
        zIndex: 50,
        padding: '0.75rem',
        fontSize: '0.875rem',
        boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
      }}
    >
      {children}

      {!disabled && (onIncrement || onDecrement) && (
        <div className="flex gap-2 mt-3 md:hidden pointer-events-auto">
          <button
            onClick={onDecrement}
            className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-semibold"
          >
            –
          </button>
          <button
            onClick={onIncrement}
            className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold"
          >
            +
          </button>
        </div>
      )}

      <div
        ref={arrowRef}
        style={{
          width: '0.75rem',
          height: '0.75rem',
          backgroundColor: '#f9f4e5',
          transform: 'rotate(-45deg)',
          position: 'absolute',
          zIndex: -1,
          left: middlewareData.arrow ? `${(middlewareData.arrow.x ?? 0) - 7}px` : '',
          top: middlewareData.arrow?.y ?? 0,
          borderLeft: '1px solid #d4af37',
          borderTop: '1px solid #d4af37',
        }}
      />
    </div>
  )
}
