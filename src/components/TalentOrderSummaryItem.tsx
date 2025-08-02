import { useRef, useState } from 'react'
import type { TalentOrderItem } from '../core/types'
import { useAsset } from '../hooks/useAsset'
import { Tooltip } from './Tooltip'
import { AbilityDataSection } from './AbilityDataSection'

const mobileCloseFns: (() => void)[] = []

export const TalentOrderSummaryItem = ({
  entry,
  index,
  pointIndexToLevelMap,
}: {
  entry: TalentOrderItem
  index: number
  pointIndexToLevelMap: Record<number, number>
}) => {
  const iconUrl = useAsset(entry.icon)
  const [isOpen, setIsOpen] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const isDesktop = window.innerWidth >= 768

  const handleClick = () => {
    if (isDesktop) return
    if (!isOpen) {
      // Close others on mobile before opening this one
      mobileCloseFns.forEach(fn => fn())
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }

  if (
    !isDesktop &&
    !mobileCloseFns.includes(() =>
      setIsOpen(false)
    )
  ) {
    mobileCloseFns.push(() => setIsOpen(false))
  }

  const responsiveProps = isDesktop
    ? {
        onMouseEnter: () => setIsOpen(true),
        onMouseLeave: () => setIsOpen(false),
      }
    : {
        onClick: handleClick,
        onMouseLeave: () => setIsOpen(false), // keep for tap outside mobile close too
      }

  return (
    <div
      ref={tooltipRef}
      className='relative overflow-visible'
      onMouseLeave={() =>
        isDesktop && setIsOpen(false)
      }
    >
      <div
        {...responsiveProps}
        className='flex items-center justify-start gap-2 text-sm min-w-0 p-2 bg-black/20 rounded cursor-pointer hover:bg-black/30 transition-colors'
      >
        <span className='text-white text-xl sm:text-2xl font-serif min-w-[28px] text-center flex items-center justify-center'>
          {pointIndexToLevelMap[index + 1]}
        </span>

        {iconUrl && (
          <img
            src={iconUrl}
            alt={entry.name}
            className='object-cover w-[28px] h-[28px] rounded-md sm:top-[2px] top-0 relative'
          />
        )}

        <div className='flex flex-col sm:flex-row sm:items-center sm:gap-2'>
          <span
            className={`max-w-[275px] text-gold-text ${entry.name.length > 30 ? 'text-base' : 'text-lg'} relative sm:top-[2px] top-0`}
          >
            {entry.name}
          </span>
          <span className='text-white text-sm relative sm:top-[2px] top-0'>
            Rank {entry.rank}
          </span>
        </div>
      </div>

      <Tooltip
        referenceEl={tooltipRef.current}
        open={isOpen}
      >
        <p className='text-white text-xl'>
          {entry.name}
        </p>
        <p className='text-white text-base'>
          Rank {entry.rank}
        </p>
        <AbilityDataSection
          abilityData={entry.abilityData}
        />
        <p className='text-gold-text text-base'>
          {entry.description}
        </p>
        {!isDesktop && (
          <p className='text-gray-400 italic'>
            (Tap again or outside to dismiss)
          </p>
        )}
      </Tooltip>
    </div>
  )
}
