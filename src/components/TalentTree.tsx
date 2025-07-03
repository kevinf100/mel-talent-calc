import { type MouseEvent } from 'react'
import { TalentNode } from './TalentNode'
import type { Talent } from '../core/types'
import { meetsDependencies } from '../core/talentUtils'

export type TTalentTreeProps = {
  name: string
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

  return (
    <div className='w-full bg-parchment p-4 rounded shadow-inner snap-start touch-manipulation'>
      <header className='mb-2 flex items-center justify-between'>
        <h2 className='text-2xl font-bold text-gold'>
          {name}
        </h2>
        <span className='text-base text-ink/80 mr-2'>
          {pointsSpent} pts
        </span>
        <button
          onClick={onResetTree}
          className='px-2 py-1 bg-gold/80 text-parchment text-xs rounded hover:bg-gold transition'
        >
          Reset
        </button>
      </header>

      <div className='grid grid-cols-4 grid-rows-7 gap-4'>
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

          return (
            <div
              key={t.id}
              style={{
                gridColumnStart: t.col + 1,
                gridRowStart: t.row + 1,
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
                  onClickTalent(t.id, e as MouseEvent)
                }
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
