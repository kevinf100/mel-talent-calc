import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import ExpandCollapseSprite from '../assets/ui/expand_collapse_btn.webp?w=67&h=316&imagetools'
import type { TalentOrderItem } from '../core/types'
import { TalentOrderSummaryItem } from './TalentOrderSummaryItem'

type TalentOrderSummaryProps = {
  talentSpendOrder: TalentOrderItem[]
  cumulativePointsByLevel: number[]
}

export const TalentOrderSummary = ({
  talentSpendOrder,
  cumulativePointsByLevel,
}: TalentOrderSummaryProps) => {
  const [isExpanded, setIsExpanded] =
    useState(false)
  const [isPressed, setIsPressed] =
    useState(false)
  const hasPointsSpent =
    talentSpendOrder.length > 0
  const isDisabled = !hasPointsSpent
  const showExpandedContent =
    isExpanded && hasPointsSpent

  const pointIndexToLevelMap = useMemo(() => {
    const map: Record<number, number> = {}
    let lastPoints = 0
    for (
      let level = 1;
      level < cumulativePointsByLevel.length;
      level++
    ) {
      const totalPoints =
        cumulativePointsByLevel[level]
      for (
        let p = lastPoints + 1;
        p <= totalPoints;
        p++
      ) {
        map[p] = level
      }
      lastPoints = totalPoints
    }
    return map
  }, [cumulativePointsByLevel])

  useEffect(() => {
    if (!hasPointsSpent && isExpanded) {
      setIsExpanded(false)
    }
  }, [hasPointsSpent, isExpanded])

  const hasAutoExpanded = useRef(false)

  useEffect(() => {
    if (
      hasPointsSpent &&
      !isExpanded &&
      !hasAutoExpanded.current
    ) {
      setIsExpanded(true)
      hasAutoExpanded.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPointsSpent])

  const toggleExpanded = () => {
    if (isDisabled) return
    setIsExpanded(!isExpanded)
  }

  const handlePointerDown = () => {
    setIsPressed(true)
  }

  const handlePointerUp = () => {
    setIsPressed(false)
  }

  const cursorStyle = isDisabled
    ? 'cursor-default'
    : 'cursor-pointer'

  console.log(talentSpendOrder)

  return (
    <div className='mt-2 mb-1 p-2 rounded-sm w-full text-white font-italic'>
      {/* Header with button and title */}
      <div className='flex items-center gap-3'>
        <button
          onClick={toggleExpanded}
          aria-label={
            isExpanded ? 'Collapse' : 'Expand'
          }
          disabled={isDisabled}
          className={`w-[52px] h-[49px] bg-no-repeat bg-[length:52px_252px] ${cursorStyle}`}
          style={{
            backgroundImage: `url(${ExpandCollapseSprite})`,
            backgroundPosition: isDisabled
              ? '0px -203px'
              : isPressed
                ? isExpanded
                  ? '0px -152px'
                  : '0px -52px'
                : isExpanded
                  ? '0px -101px'
                  : '0px 0px',
          }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />

        <h3
          onClick={toggleExpanded}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{
            transform:
              isPressed && !isDisabled
                ? 'translate(5px, 5px)'
                : 'translate(0, 0)',
          }}
          className={`text-gold-text text-2xl sm:text-3xl ${cursorStyle}`}
        >
          Talent Order
        </h3>
      </div>

      {/* Expanded content */}
      {
        <div
          className={`mt-4 p-3 mb-20 sm:mb-0 rounded bg-black/20 ${showExpandedContent ? 'block' : 'hidden'}`}
        >
          {talentSpendOrder.length > 0 ? (
            <div
              className='columns-[420px] overflow-hidden'
              style={{ columnGap: '8px' }} // equivalent to gap-4 (16px)
            >
              {talentSpendOrder.map(
                (entry, index) => (
                  <div className='mb-2 last:mb-0'>
                    {/* margin-bottom for vertical spacing */}
                    <TalentOrderSummaryItem
                      key={`${entry.name}-${entry.rank}-${index}`}
                      entry={entry}
                      index={index}
                      pointIndexToLevelMap={
                        pointIndexToLevelMap
                      }
                    />
                  </div>
                )
              )}
            </div>
          ) : (
            <p className='text-white/70 text-xl text-center py-4'>
              No Talent Points spent
            </p>
          )}
        </div>
      }
    </div>
  )
}
