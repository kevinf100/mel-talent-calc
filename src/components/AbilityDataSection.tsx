import type { Talent } from '../core/types'

type AbilityDataSectionProps = {
  abilityData: Talent['abilityData']
}

export const AbilityDataSection = ({
  abilityData,
}: AbilityDataSectionProps) => {
  if (!abilityData) return
  return (
    <div className='mt-2 text-s text-ink/70'>
      <div className='flex'>
        <div className='flex-1'>
          {abilityData.leftSide.map((line, i) =>
            line.trim() === '' ? (
              <div
                key={`left-spacer-${i}`}
                style={{
                  lineHeight: '1.25rem',
                  visibility: 'hidden',
                }}
              >
                &nbsp;
              </div>
            ) : (
              <div key={`left-${i}`}>{line}</div>
            )
          )}
        </div>
        <div className='flex-1'>
          {abilityData.rightSide.map((line, i) =>
            line.trim() === '' ? (
              <div
                key={`right-spacer-${i}`}
                style={{
                  lineHeight: '1.25rem',
                  visibility: 'hidden',
                }}
              >
                &nbsp;
              </div>
            ) : (
              <div
                key={`right-${i}`}
                className='text-right'
              >
                {line}
              </div>
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
