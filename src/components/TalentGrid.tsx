import { TalentTree } from './TalentTree'
import { GlobalPointsSummary } from './GlobalPointsSummary'
import { useTalentTrees } from '../core/useTalentTrees'
import { TalentTreeScroller } from './TalentTreeScroller'

import ResetSprite from '../assets/ui/reset-all-button-sprite-small.png'
import { ParchmentBorders } from './ParchmentBorders'

export const TalentGrid = () => {
  const {
    trees,
    modify,
    resetTree,
    resetAll,
    totalTalentPoints,
    totalPointsSpent,
    pointsRemaining,
  } = useTalentTrees()

  return (
    <div className='space-y-4 sm:max-w-screen-xl sm:mx-auto w-full'>
      <GlobalPointsSummary
        totalTalentPoints={totalTalentPoints}
        totalPointsSpent={totalPointsSpent}
        pointsRemaining={pointsRemaining}
      />
      <div className='flex items-center justify-between'>
      <ParchmentBorders>
        {/* 🏅 Class Icon in Gold Ring */}
        <div
          className='relative flex items-center justify-center overflow-hidden w-[128px] h-[128px]'
        >
          {/* 🏅 Gold Ring Frame – above everything */}
          <img
            src='src/assets/icons/gold-ring3.png'
            alt='Gold Ring'
            className='absolute z-15 top-0 left-0 pointer-events-none w-[128px] h-[128px]'
          />

          {/* 🧱 Class Icon – clipped inside ring */}
          <img
            src='src/assets/icons/classicon_warrior.png'
            alt='Warrior Icon'
            className='z-10 object-cover rounded-full w-[96px] h-[96px]'
          />
        </div>

        {/* 🔁 Reset All Button */}
        <button
          onClick={resetAll}
          aria-label='Reset All'
          className='w-[150px] h-[49px] bg-no-repeat bg-[length:150px_99px]'
          style={{
            backgroundImage: `url(${ResetSprite})`,
            backgroundPosition: '0px 0px',
          }}
          onPointerDown={e => {
            e.currentTarget.style.backgroundPosition =
              '0.3px -48.75px'
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
      </ParchmentBorders>
      </div>

      <TalentTreeScroller
        trees={trees.map((tree, i) => (
          <TalentTree
            key={tree.name}
            name={tree.name}
            backgroundImage={tree.backgroundImage}
            specIcon={tree.specIcon}
            talents={tree.talents}
            pointsRemaining={pointsRemaining}
            onClickTalent={(id, e) =>
              modify(i, id, e)
            }
            onResetTree={() => resetTree(i)}
          />
        ))}
      />
    </div>
  )
}
