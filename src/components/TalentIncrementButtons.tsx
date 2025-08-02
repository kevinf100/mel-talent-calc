import ButtonIncrement from '../assets/ui/red-button-increment.webp?w=250&h=156&imagetools'
import ButtonDecrement from '../assets/ui/red-button-decrement.webp?w=250&h=156&imagetools'
import ButtonIncrementGrey from '../assets/ui/red-button-increment-disabled2.webp?w=250&h=78&imagetools'
import ButtonDecrementGrey from '../assets/ui/red-button-decrement-disabled2.webp?w=250&h=78&imagetools'

type TalentIncrementButtonsProps = {
  onIncrement?: () => void
  onDecrement?: () => void
  canIncrement: boolean
  canDecrement: boolean
}

export const TalentIncrementButtons = ({
  onIncrement,
  onDecrement,
  canIncrement,
  canDecrement,
}: TalentIncrementButtonsProps) => {
  const createButtonStyle = (
    active: boolean,
    activeSprite: string,
    disabledSprite: string
  ) => ({
    backgroundImage: `url(${active ? activeSprite : disabledSprite})`,
    backgroundSize: active
      ? '125px 78px'
      : '125px 39px',
    backgroundPosition: active
      ? '0px 0px'
      : 'center',
  })

  return (
    <div className='flex gap-2 mt-1 md:hidden touch-manipulation justify-between'>
      <button
        onClick={e => {
          if (!canDecrement) return
          e.stopPropagation()
          onDecrement?.()
        }}
        disabled={!canDecrement}
        className='w-[125px] h-[39px] bg-no-repeat'
        style={createButtonStyle(
          canDecrement,
          ButtonDecrement,
          ButtonDecrementGrey
        )}
        onPointerDown={e => {
          if (canDecrement)
            e.currentTarget.style.backgroundPosition =
              '0px -39px'
        }}
        onPointerUp={e => {
          if (canDecrement)
            e.currentTarget.style.backgroundPosition =
              '0px 0px'
        }}
        onPointerLeave={e => {
          if (canDecrement)
            e.currentTarget.style.backgroundPosition =
              '0px 0px'
        }}
      />

      <button
        onClick={e => {
          if (!canIncrement) return
          e.stopPropagation()
          onIncrement?.()
        }}
        disabled={!canIncrement}
        className='w-[125px] h-[39px] bg-no-repeat'
        style={createButtonStyle(
          canIncrement,
          ButtonIncrement,
          ButtonIncrementGrey
        )}
        onPointerDown={e => {
          if (canIncrement)
            e.currentTarget.style.backgroundPosition =
              '0px -39px'
        }}
        onPointerUp={e => {
          if (canIncrement)
            e.currentTarget.style.backgroundPosition =
              '0px 0px'
        }}
        onPointerLeave={e => {
          if (canIncrement)
            e.currentTarget.style.backgroundPosition =
              '0px 0px'
        }}
      />
    </div>
  )
}
