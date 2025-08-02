import type { TalentOrderItem } from "../core/types"
import { useAsset } from "../hooks/useAsset"

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
  
    return (
      <div
        className="flex items-center justify-start gap-2 text-sm min-w-0 p-2 bg-black/20 rounded"
        key={`${entry.name}-${entry.rank}-${index}`}
      >
        <span className="text-white text-xl sm:text-2xl font-serif min-w-[28px] text-center flex items-center justify-center">
          {pointIndexToLevelMap[index + 1]}
        </span>
  
        {iconUrl && (
          <img
            src={iconUrl}
            alt={entry.name}
            className="object-cover w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] rounded-md"
          />
        )}
  
        {/* Responsive name + rank wrapper */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <span className="text-gold-text text-lg sm:text-xl">{entry.name}</span>
          <span className="text-white text-sm relative sm:top-[2px] top-0">Rank {entry.rank}</span>
        </div>
      </div>
    )
  }
  
