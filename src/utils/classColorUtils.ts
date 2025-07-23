import { CLASS_COLORS } from '../core/constants'
import type { ClassName } from '../core/types'

/**
 * Generates a class-themed gradient for use as a fallback background
 * Creates a rich gradient using the class's primary color with darker and lighter variants
 */
export const getClassFallbackGradient = (className: ClassName): string => {
  const baseColor = CLASS_COLORS[className]
  
  // Function to adjust color brightness
  const adjustBrightness = (hex: string, percent: number): string => {
    // Remove # if present
    const color = hex.replace('#', '')
    
    // Parse RGB
    const r = parseInt(color.substring(0, 2), 16)
    const g = parseInt(color.substring(2, 4), 16)
    const b = parseInt(color.substring(4, 6), 16)
    
    // Adjust brightness
    const adjust = (value: number) => {
      const adjusted = Math.round(value * (1 + percent))
      return Math.max(0, Math.min(255, adjusted))
    }
    
    // Convert back to hex
    const toHex = (value: number) => value.toString(16).padStart(2, '0')
    return `#${toHex(adjust(r))}${toHex(adjust(g))}${toHex(adjust(b))}`
  }
  
  // Create darker and lighter variants
  const darker = adjustBrightness(baseColor, -0.4)  // 40% darker
  const lighter = adjustBrightness(baseColor, 0.2)  // 20% lighter
  
  // Return a radial gradient that looks like a subtle crest/emblem
  return `radial-gradient(ellipse at center, ${lighter} 0%, ${baseColor} 40%, ${darker} 100%)`
}

/**
 * Gets appropriate class-themed colors for various UI elements
 */
export const getClassTheme = (className: ClassName) => {
  const baseColor = CLASS_COLORS[className]
  
  return {
    primary: baseColor,
    fallbackGradient: getClassFallbackGradient(className),
    // Add more theme colors as needed
    accent: baseColor + '80', // 50% opacity
  }
}
