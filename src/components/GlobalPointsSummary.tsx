import ResetSprite from '../assets/ui/reset-all-button-sprite-small.png'

export const GlobalPointsSummary = ({
  totalTalentPoints,
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
      <div className='flex justify-end text-2xl text-white md:hidden'>
        <div className='flex space-x-2 items-center'>
          <p className='text-gold-text'>Level:</p>
          <p>{currentLevel}</p>
        </div>
      </div>

      {/* Mobile: values row */}
      <div className='flex justify-between md:hidden text-2xl mt-1 items-center'>
        <div className='flex gap-2'>
          <button
            onClick={onResetAll}
            aria-label='Reset All'
            className='w-[120px] h-[39px] bg-no-repeat bg-[length:120px_79px] sm:w-[150px] sm:h-[49px] sm:bg-[length:150px_99px] sm:flex'
            style={{
              backgroundImage: `url(${ResetSprite})`,
              backgroundPosition: '0px 0px',
            }}
            onPointerDown={e => {
              const isDesktop =
                window.innerWidth >= 640
              e.currentTarget.style.backgroundPosition =
                isDesktop
                  ? '0px -48.75px'
                  : '0px -38.75px'
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

        <div className='flex gap-2'>
          <p className='text-gold-text'>
            Talent Points:
          </p>
          <p className='text-white'>
            {pointsRemaining} /{' '}
            {totalTalentPoints}
          </p>
        </div>
      </div>

      {/* Desktop: single combined row */}
      <div className='hidden md:flex justify-between items-center'>
        {/* Reset Button */}
        <button
          onClick={onResetAll}
          aria-label='Reset All'
          className='w-[120px] h-[39px] bg-no-repeat bg-[length:120px_79px] sm:w-[150px] sm:h-[49px] sm:bg-[length:150px_99px] hidden sm:flex'
          style={{
            backgroundImage: `url(${ResetSprite})`,
            backgroundPosition: '0px 0px',
          }}
          onPointerDown={e => {
            const isDesktop =
              window.innerWidth >= 640
            e.currentTarget.style.backgroundPosition =
              isDesktop
                ? '0px -48.75px'
                : '0px -38.75px'
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

        <div className='flex items-center text-3xl  space-x-2 gap-4'>
          <div className='flex text-3xl space-x-2'>
            <p className='text-gold-text'>
              Level:
            </p>
            <p>{currentLevel}</p>
          </div>
          <div className='flex text-3xl space-x-2'>
            <p className='text-gold-text'>
              Talent Points:
            </p>
            <p>
              {pointsRemaining} /{' '}
              {totalTalentPoints}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
