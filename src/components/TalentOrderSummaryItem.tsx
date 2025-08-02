import { useRef, useState } from "react"
import type { TalentOrderItem } from "../core/types"
import { useAsset } from "../hooks/useAsset"
import { Tooltip } from "./Tooltip"
import { AbilityDataSection } from "./AbilityDataSection"

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
    const iconRef = useRef<HTMLImageElement>(null)
    const [isHovered, setHovered] = useState(false)
    
    const isDesktop = window.innerWidth >= 768

    const handleClick = () => {
      if (!isDesktop && !isHovered) {
        setHovered(true)
        return
      }
    }

    const responsiveProps = isDesktop
      ? {
          onMouseEnter: () => setHovered(true),
          onMouseLeave: () => setHovered(false),
        }
      : {
          onMouseEnter: () => setHovered(true),
          onClick: handleClick,
        }

    return (
      <div
        className="relative overflow-visible"
        onMouseLeave={() => setHovered(false)}
      >
        <div
          {...responsiveProps}
          className="flex items-center justify-start gap-2 text-sm min-w-0 p-2 bg-black/20 rounded cursor-pointer hover:bg-black/30 transition-colors"
          key={`${entry.name}-${entry.rank}-${index}`}
        >
        <span className="text-white text-xl sm:text-2xl font-serif min-w-[28px] text-center flex items-center justify-center">
          {pointIndexToLevelMap[index + 1]}
        </span>
  
        {iconUrl && (
          <img
            ref={iconRef}
            src={iconUrl}
            alt={entry.name}
            className="object-cover w-[28px] h-[28px] rounded-md sm:top-[2px] top-0 relative"
          />
        )}
  
        {/* Responsive name + rank wrapper */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <span className="text-gold-text text-lg sm:text-xl">{entry.name}</span>
          <span className="text-white text-sm relative sm:top-[2px] top-0">Rank {entry.rank}</span>
        </div>
        </div>
        <Tooltip
          referenceEl={iconRef.current}
          open={isHovered}
        >
          <p className='text-white text-xl'>
            {entry.name}
          </p>
          <p className='text-white text-base'>
            Rank {entry.rank}
          </p>
          <AbilityDataSection abilityData={entry.abilityData} />
          <p className='text-gold-text text-base'>
            {entry.description}
          </p>
          {!isDesktop && (
            <p className='mb-1 text-gray-400 italic'>
              (Tap outside to dismiss)
            </p>
          )}
        </Tooltip>
      </div>
    )
  }
  
