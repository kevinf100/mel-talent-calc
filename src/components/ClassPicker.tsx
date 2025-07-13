import { useState } from 'react'
import { type ClassName } from '../core/types'
import { CLASS_NAMES, CLASS_COLORS } from '../core/constants'

// 🌟 Shadow helpers
const CLASS_SHADOWS = {
  faint: (color: string, isTouchDevice: boolean) =>
    `0 0 10px ${isTouchDevice ? '10px' : '15px'} ${color}`,
  strong: (color: string) => `0 0 13px 16px ${color}`,
}

type ClassPickerProps = {
  selectedClass: ClassName
  setSelectedClass: (className: ClassName) => void
}

export const ClassPicker = ({
  selectedClass,
  setSelectedClass,
}: ClassPickerProps) => {
  const [hoveredClass, setHoveredClass] = useState<ClassName | null>('warrior')

  const isTouchDevice =
    typeof window !== 'undefined' && 'ontouchstart' in window

  return (
    <div className="flex flex-col w-full items-start gap-6 h-full">
      {/* 🧱 Icon Grid */}
      <div className="flex flex-wrap gap-2 sm:justify-start justify-center w-full">
        {CLASS_NAMES.map(className => {
          const isHovered = hoveredClass === className
          const isSelected = selectedClass === className
          const classColor = CLASS_COLORS[className]
          const boxShadow =
            isHovered && !isTouchDevice
              ? CLASS_SHADOWS.strong(classColor)
              : isSelected
              ? CLASS_SHADOWS.faint(classColor, isTouchDevice)
              : undefined

          return (
            <button
              key={className}
              onClick={() => setSelectedClass(className)}
              onMouseEnter={() => {
                if (!isTouchDevice) setHoveredClass(className)
              }}
              onMouseLeave={() => {
                if (!isTouchDevice) setHoveredClass(null)
              }}
              className="relative w-[60px] h-[60px] sm:w-[90px] sm:h-[90px] flex items-center justify-center group"
            >
              {/* 🟡 Ring Frame */}
              <img
                src="src/assets/icons/gold-ring3.png"
                alt="Ring"
                className={`absolute z-10 top-0 left-0 w-full h-full pointer-events-none ${
                  isSelected ? '' : 'grayscale'
                }`}
              />
              {/* 🌟 Class Icon with glow */}
              <img
                src={`src/assets/icons/classicon_${className}.png`}
                alt={className}
                style={{ boxShadow }}
                className="z-0 object-cover rounded-full w-[48px] h-[48px] sm:w-[67px] sm:h-[67px] transition-shadow duration-200"
              />
            </button>
          )
        })}
      </div>

      {/* 📊 Selected Class Display */}
      <div className="flex items-center justify-start w-full gap-4 md:gap-7 z-1 h-full min-h-[120px]">
        {/* 🎯 Selected Class Icon */}
        <div className="relative z-10 max-w-[62px] max-h-[62px] [@media(min-width:640px)]:max-w-[105px] [@media(min-width:640px)]:max-h-[105px] md:max-w-[140px] md:max-h-[140px] h-full">
          <img
            src="src/assets/icons/gold-ring3.png"
            alt="Gold Ring"
            className="absolute z-10 left-0 pointer-events-none object-contain w-full h-full top-0 scale-[1.35]
              [@media(max-width:420px)]:top-[-12px] [@media(max-width:420px)]:h-[84px]
              [@media(min-width:420px)]:top-0 [@media(min-width:420px)]:h-full
              [@media(min-width:768px)]:h-[140px] [@media(min-width:768px)]:top-[-17px]"
          />
          <img
            src={`src/assets/icons/classicon_${selectedClass}.png`}
            alt={selectedClass}
            className="relative z-1 object-cover rounded-full w-auto h-auto top-0 left-0
              [@media(min-width:768px)]:w-[105px] [@media(min-width:768px)]:h-[105px]"
          />
        </div>

        {/* 📈 Info Column */}
        <div className="flex flex-col text-[#4a2c0d] justify-between flex-1">
          <h2
            className="sm:text-6xl text-5xl capitalize"
            style={{ color: CLASS_COLORS[selectedClass] }}
          >
            {selectedClass}
          </h2>
          <span className="absolute -bottom-[8px] left-[10%] w-[80%] h-[6px] opacity-0 sm:group-hover:opacity-100 transition-all duration-300 rounded-full blur-sm" />
          <p className="relative text-4xl left-[5px]" style={{ textShadow: 'none' }}>
            {0} / {0} / {0}
          </p>
        </div>
      </div>
    </div>
  )
}
