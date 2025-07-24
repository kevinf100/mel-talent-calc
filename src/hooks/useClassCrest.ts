import { useMemo } from 'react'

// Import all class crests in WebP format (more efficient for graphic content)
import druidCrest from '../assets/images/druid/classcrest_druid.webp?quality=70&imagetools'
import hunterCrest from '../assets/images/hunter/classcrest_hunter.webp?quality=70&imagetools'
import mageCrest from '../assets/images/mage/classcrest_mage.webp?quality=70&imagetools'
import paladinCrest from '../assets/images/paladin/classcrest_paladin.webp?quality=70&imagetools'
import priestCrest from '../assets/images/priest/classcrest_priest.webp?quality=70&imagetools'
import rogueCrest from '../assets/images/rogue/classcrest_rogue.webp?quality=70&imagetools'
import shamanCrest from '../assets/images/shaman/classcrest_shaman.webp?quality=70&imagetools'
import warlockCrest from '../assets/images/warlock/classcrest_warlock.webp?quality=70&imagetools'
import warriorCrest from '../assets/images/warrior/classcrest_warrior.webp?quality=70&imagetools'
import type { ClassName } from '../core/types'

const CLASS_CRESTS = {
  druid: druidCrest,
  hunter: hunterCrest,
  mage: mageCrest,
  paladin: paladinCrest,
  priest: priestCrest,
  rogue: rogueCrest,
  shaman: shamanCrest,
  warlock: warlockCrest,
  warrior: warriorCrest,
} as const

/**
 * Hook to get optimized WebP class crest for a given class
 */
export const useClassCrest = (className: ClassName): string => {
  return useMemo(() => CLASS_CRESTS[className], [className])
}
