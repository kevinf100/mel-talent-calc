import { type MouseEvent } from 'react'
import { TalentNode } from './TalentNode'
import type { Talent } from '../core/types'
import {
  getArrowProps,
  meetsDependencies,
} from '../core/talentUtils'
import ResetSprite from '../assets/ui/reset-button-sprite.png'
import { MetalBorders } from './MetalBorders'
import RockBackground from '../assets/ui/UI-Background-Rock.png'

export type TTalentTreeProps = {
  name: string
  backgroundImage: string
  specIcon: string
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
    specIcon
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
    <MetalBorders>
      <div
        className='w-full p-6 rounded shadow-inner snap-start touch-manipulation relative'
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: '33% center',
        }}
        onContextMenu={e => e.preventDefault()}
      >
        <header
          className='
            -mt-6 -mx-6 mb-4 px-6 py-3 flex flex-col items-center
            relative rounded-lg border border-white/10
            shadow-[inset_0_0_0px_rgba(0,0,0,0.5),0_6px_5px_rgba(0,0,0,0.35),0_-2px_6px_rgba(255,255,255,0.1)]
            bg-cover bg-center bg-no-repeat
            text-shadow gap-1
          '
          style={{
            backgroundImage: `url(${RockBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            borderBottom: '5px double #00000059',
          }}
        >
          <div className='w-full flex items-center justify-between'>
            <div
              className='rounded-full overflow-hidden'
              style={{
                width: '64px',
                height: '64px',
                borderColor: '#43434385',
                borderWidth: '3px',
                borderStyle: 'ridge',
              }}
            >
              <img
                src={`src/assets/icons/${specIcon}`}
                alt='Spec Icon'
                className='w-full h-full object-cover'
              />
            </div>

            <h1 className='text-2xl text-center flex-grow text-gold-text'>
              {name}
            </h1>

            <button
              onClick={onResetTree}
              aria-label='Reset Tree'
              className='z-1 w-[39px] h-[38px] bg-no-repeat bg-[length:39px_75.5px]'
              style={{
                backgroundImage: `url(${ResetSprite})`,
                backgroundPosition: '0px 0px',
              }}
              onPointerDown={e => {
                e.currentTarget.style.backgroundPosition =
                  '0px -38px'
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
          </div>

          <div className='w-full flex justify-center mt-1'>
            <h2
              className='text-center px-3 py-1 text-sm w-full rounded shadow-inner'
              style={{
                backgroundColor:
                  'rgba(3, 2, 2, 0.34)',
                color: 'rgb(255, 215, 0)',
                borderRadius: '5px',
                boxShadow:
                  'inset 0 0 8px rgba(0, 0, 0, 0.36)',
                borderWidth: '1px',
                borderStyle: 'inset',
                borderColor: 'black',
              }}
            >
              Points spent in {name} Talents:{' '}
              <span
                className={'text-white font-sans'}
              >
                {pointsSpent}
              </span>
            </h2>
          </div>
        </header>

        <div className='grid grid-cols-4 grid-rows-7 md:gap-4 gap-6 relative lg:pl-4 lg:pr-4'>
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
            const {
              class: arrowClass,
              style: arrowStyle,
            } = getArrowProps(talents, t, locked, pointsRemaining)

            const requiredTalent = t.requires
              ? talents.find(
                  talent =>
                    talent.id === t.requires!.id
                )
              : undefined

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
                  availablePoints={
                    pointsRemaining
                  }
                  name={t.name}
                  icon={t.icon}
                  ranks={t.ranks}
                  points={t.points}
                  maxPoints={t.maxPoints}
                  abilityData={t.abilityData}
                  disabled={locked}
                  onClick={e =>
                    onClickTalent(
                      t.id,
                      e as MouseEvent
                    )
                  }
                  tierRequirement={requiredForTier(
                    t.row
                  )}
                  requires={t.requires}
                  totalPointsInTree={pointsSpent}
                  requiredTalentPoints={
                    requiredTalent?.points ?? 0
                  }
                  requiredTalentName={
                    requiredTalent?.name
                  }
                  talentTreeName={name}
                />
              </div>
            )
          })}
        </div>
      </div>
    </MetalBorders>
  )
}
