import { type ClassName } from '../core/types'
import { useAsset } from '../hooks/useAsset'

type TClassPickerGridIcons = {
  className: ClassName
  setSelectedClass: (className: ClassName) => void
  isSelected: boolean
  boxShadow?: string
  setHoveredClass: (
    className: ClassName | null
  ) => void
  GoldRing: string
}

export const ClassPickerGridIcons = (
  props: TClassPickerGridIcons
) => {
  const {
    className,
    boxShadow,
    isSelected,
    setSelectedClass,
    setHoveredClass,
    GoldRing
  } = props
  const classIcon = useAsset(
    `classicon_${className}.webp`
  )

  const isTouchDevice =
    typeof window !== 'undefined' &&
    'ontouchstart' in window
  return (
    <button
      onClick={() => setSelectedClass(className)}
      onMouseEnter={() => {
        if (!isTouchDevice)
          setHoveredClass(className)
      }}
      onMouseLeave={() => {
        if (!isTouchDevice) setHoveredClass(null)
      }}
      className='relative w-[60px] h-[60px] sm:w-[90px] sm:h-[90px] flex items-center justify-center group cursor-pointer'
    >
      {/* 🟡 Ring Frame */}
      {GoldRing && (
        <img
          src={GoldRing}
          alt='Ring'
          className={`absolute z-10 top-0 left-0 w-full h-full pointer-events-none ${
            isSelected ? '' : 'grayscale'
          }`}
        />
      )}
      {/* 🌟 Class Icon with glow */}
      {classIcon && (
        <img
          src={classIcon}
          alt={className}
          style={{ boxShadow }}
          className='z-0 object-cover rounded-full w-[48px] h-[48px] sm:w-[67px] sm:h-[67px] transition-shadow duration-200'
        />
      )}
    </button>
  )
}
