import ResetSprite from '../assets/ui/reset-all-button-sprite-small.png'

export const GlobalPointsSummary = ({
  totalTalentPoints,
  totalPointsSpent,
  pointsRemaining,
  currentLevel,
  onResetAll,
}: {
  totalTalentPoints: number
  totalPointsSpent: number
  pointsRemaining: number
  currentLevel: number
  onResetAll: () => void
}) => {
  return (
    <div className='mt-2 mb-1 p-2 text-sm rounded-sm w-[95%] md:w-[98%] text-white mx-auto  font-italic'>
      {/* Mobile: labels row */}
      <div className='flex justify-between text-xl text-white md:hidden'>
        <div className='flex space-x-2'>
          <button
            onClick={onResetAll}
            aria-label='Reset All'
            className='w-[110px] h-[35px] bg-no-repeat bg-[length:100%] relative left-[-4px] mb-2'
            style={{
              backgroundImage: `url(${ResetSprite})`,
              backgroundPosition: '0px 0px',
            }}
            onPointerDown={e => {
              e.currentTarget.style.backgroundPosition =
                '0px -35.75px'
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
        {totalPointsSpent > 0 && (
          <div className='flex space-x-2 items-center'>
            <p className='text-gold-text'>
              Level:
            </p>
            <p>{currentLevel}</p>
          </div>
        )}
      </div>

      {/* Mobile: values row */}
      <div className='flex justify-between md:hidden text-xl mt-1'>
        <div className='flex gap-2'>
          <p className='text-gold-text'>
            Points spent:
          </p>
          <p>
            {' '}
            {totalPointsSpent} /{' '}
            {totalTalentPoints}
          </p>
        </div>

        <div className='flex gap-2'>
          <p className='text-gold-text'>
            Talent Points:
          </p>
          <p className='text-white'>
            {pointsRemaining}
          </p>
        </div>
      </div>

      {/* Desktop: single combined row */}
      <div className='hidden md:flex justify-between items-center'>
        <div className='flex items-center space-x-2 text-3xl'>
          <p className='text-gold-text '>
            Points spent:
          </p>
          <p>
            {totalPointsSpent} /{' '}
            {totalTalentPoints}
          </p>
        </div>

        <div className='flex items-center text-3xl  space-x-2 gap-4'>
          {totalPointsSpent > 0 && (
            <div className='flex text-3xl space-x-2'>
              <p className='text-gold-text'>
                Level:
              </p>
              <p>{currentLevel}</p>
            </div>
          )}
          <div className='flex text-3xl space-x-2'>
            <p className='text-gold-text'>
              Talent Points:
            </p>
            <p>{pointsRemaining}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
