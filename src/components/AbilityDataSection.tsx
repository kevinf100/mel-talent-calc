import type { Talent } from '../core/types'

type AbilityDataSectionProps = {
  abilityData: Talent['abilityData']
}

export const AbilityDataSection = ({
  abilityData,
}: AbilityDataSectionProps) => {
  if (!abilityData) return
  return (
    <div className='text-base text-white'>
      <div className='flex'>
        <div className='flex-1'>
          {abilityData.leftSide?.map((line, i) =>
            line.trim() === '' ? (
              <p
                key={`left-spacer-${i}`}
                style={{
                  lineHeight: '1.25rem',
                  visibility: 'hidden',
                }}
              >
                &nbsp;
              </p>
            ) : (
              <p key={`left-${i}`}>{line}</p>
            )
          )}
        </div>
        <div className='flex-1'>
          {abilityData.rightSide?.map((line, i) =>
            line.trim() === '' ? (
              <p
                key={`right-spacer-${i}`}
                style={{
                  visibility: 'hidden',
                }}
              >
                &nbsp;
              </p>
            ) : (
              <p
                key={`right-${i}`}
                className='text-right'
              >
                {line}
              </p>
            )
          )}
        </div>
      </div>

      {abilityData.bottom &&
        abilityData.bottom.length > 0 && (
          <div>
            {abilityData.bottom.map((line, i) => (
              <div key={`bottom-${i}`}>
                {line}
              </div>
            ))}
          </div>
        )}
    </div>
  )
}
