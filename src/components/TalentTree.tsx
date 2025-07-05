import { type MouseEvent } from 'react'
import { TalentNode } from './TalentNode'
import type { Talent } from '../core/types'
import { meetsDependencies } from '../core/talentUtils'
import ResetSprite from '../assets/ui/reset-button-sprite.png'

export type TTalentTreeProps = {
  name: string
  backgroundImage: string
  talents: Talent[]
  onClickTalent: (
    id: string,
    e: MouseEvent
  ) => void
  onResetTree: () => void
  pointsRemaining: number
}

export const TalentTree = (
  talentTreeProps: TTalentTreeProps
) => {
  const {
    name,
    backgroundImage,
    talents,
    onClickTalent,
    onResetTree,
    pointsRemaining,
  } = talentTreeProps

  const pointsSpent = talents.reduce(
    (s, t) => s + t.points,
    0
  )

  const totalBelowRow = (row: number) =>
    talents
      .filter(t => t.row < row)
      .reduce((s, t) => s + t.points, 0)

  const requiredForTier = (row: number) => row * 5

  // Find talents that are targets of downward dependencies and calculate arrow height
  const getArrowProps = (talent: Talent) => {
    if (!talent.requires?.id) return { class: '', style: {} }
    const sourceTalent = talents.find(
      s => s.id === talent.requires!.id
    )
    if (!sourceTalent) return { class: '', style: {} }
    // Only apply for downward dependencies (source row < target row)
    if (sourceTalent.row >= talent.row) return { class: '', style: {} }

    // Calculate arrow height to reach source node's bottom
    const effectiveNodeHeight = 64
    const rowDiff = talent.row - sourceTalent.row
    const arrowHeight = rowDiff * effectiveNodeHeight

    // Add 'glow' class if dependency is met
    const glowClass = meetsDependencies(talent, talents) ? 'glow' : ''

    return {
      class: `down-arrow ${glowClass}`,
      style: { '--arrow-height': `${arrowHeight}px` } as React.CSSProperties,
    }
  }

  return (
    <div
      className='w-full bg-parchment p-4 rounded shadow-inner snap-start touch-manipulation relative'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <header className='mb-2 flex items-center justify-between'>
        <h2 className='text-2xl font-bold text-gold'>
          {name}
        </h2>
        <span className='text-base text-ink/80 mr-2'>
          {pointsSpent} pts
        </span>
        <button
          onClick={onResetTree}
          aria-label='Reset Tree'
          className='
            w-[65px] h-[61px]
            bg-no-repeat bg-[length:65px_121px]
            transform scale-[0.75]
            origin-right
          '
          style={{
            backgroundImage: `url(${ResetSprite})`,
            backgroundPosition: '0px 0px',
          }}
          onPointerDown={e => {
            e.currentTarget.style.backgroundPosition =
              '0px -61px'
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
      </header>

      <div className='grid grid-cols-4 grid-rows-7 gap-4 relative'>
        {talents.map(t => {
          const meetsTier =
            totalBelowRow(t.row) >=
            requiredForTier(t.row)
          const meetsDep = meetsDependencies(
            t,
            talents
          )
          const locked =
            !(meetsTier && meetsDep) &&
            t.points === 0
          const { class: arrowClass, style: arrowStyle } = getArrowProps(t)

          return (
            <div
              key={t.id}
              className={`relative ${arrowClass} ${locked ? 'disabled' : ''}`}
              style={{
                gridColumnStart: t.col + 1,
                gridRowStart: t.row + 1,
                ...arrowStyle,
              }}
            >
              <TalentNode
                availablePoints={pointsRemaining}
                name={t.name}
                icon={t.icon}
                ranks={t.ranks}
                points={t.points}
                maxPoints={t.maxPoints}
                disabled={locked}
                onClick={e =>
                  onClickTalent(
                    t.id,
                    e as MouseEvent
                  )
                }
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}