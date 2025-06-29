import { useRef, useState, type MouseEvent } from 'react'
import { Tooltip } from './Tooltip'

type TalentNodeProps = {
  label: string
  points: number
  maxPoints: number
  description: string
  onClick: (e: MouseEvent) => void
  disabled: boolean
}

export const TalentNode = ({
  label,
  points,
  maxPoints,
  description,
  onClick,
  disabled,
}: TalentNodeProps) => {
  const buttonRef =
    useRef<HTMLButtonElement | null>(null)
  const [isHovered, setHovered] = useState(false)

  const base =
    'relative aspect-square border rounded flex items-center justify-center text-sm transition w-full focus:outline-none'
  const enabled =
    'bg-white/20 border-ink text-ink'
  const disabledCls =
    'bg-gray-400/30 border-gray-500 text-gray-600 cursor-not-allowed'

  const handleClick = (e: MouseEvent) => {
    onClick(e)
    requestAnimationFrame(() =>
      buttonRef.current?.blur()
    )
  }

  return (
    <div
      className='relative'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        ref={buttonRef}
        onClick={
          disabled ? undefined : handleClick
        }
        onContextMenu={e => {
          e.preventDefault()
          if (!disabled) handleClick(e)
        }}
        disabled={disabled}
        className={[
          base,
          disabled ? disabledCls : enabled,
        ].join(' ')}
        aria-disabled={disabled}
        aria-label={`${label}: ${points}/${maxPoints}`}
      >
        <span className='z-10 font-semibold pointer-events-none select-none'>
          {label}
        </span>
        <span
          className='absolute bottom-1 right-1 text-s select-none pointer-events-none'
          style={{
            color: disabled ? '#888' : '#d4af37',
          }}
        >
          {points}/{maxPoints}
        </span>
      </button>

      <Tooltip
        referenceEl={buttonRef.current}
        open={isHovered}
      >
        <strong className='text-gold'>
          {label}
        </strong>
        <div className='text-sm mt-1 text-ink/90'>
          {description}
        </div>
        <div className='text-xs mt-2 italic text-ink/70'>
          Tier requirement:{' '}
          <span className='font-bold'>
            {disabled ? 'Not met' : 'Met'}
          </span>
        </div>
      </Tooltip>
    </div>
  )
}
