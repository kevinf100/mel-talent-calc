import { useMemo } from 'react'

// Import all class crests in WebP format (more efficient for graphic content)
import druidCrest from '../assets/images/druid/classcrest_druid.webp?quality=70&imagetools'
import druidCrestSmall from '../assets/images/druid/classcrest_druid.webp?quality=70&w=280&imagetools'
import hunterCrest from '../assets/images/hunter/classcrest_hunter.webp?quality=70&imagetools'
import hunterCrestSmall from '../assets/images/hunter/classcrest_hunter.webp?quality=70&w=280&imagetools'
import mageCrest from '../assets/images/mage/classcrest_mage.webp?quality=70&imagetools'
import mageCrestSmall from '../assets/images/mage/classcrest_mage.webp?quality=70&w=280&imagetools'
import paladinCrest from '../assets/images/paladin/classcrest_paladin.webp?quality=70&imagetools'
import paladinCrestSmall from '../assets/images/paladin/classcrest_paladin.webp?quality=70&w=280&imagetools'
import priestCrest from '../assets/images/priest/classcrest_priest.webp?quality=70&imagetools'
import priestCrestSmall from '../assets/images/priest/classcrest_priest.webp?quality=70&w=280&imagetools'
import rogueCrest from '../assets/images/rogue/classcrest_rogue.webp?quality=70&imagetools'
import rogueCrestSmall from '../assets/images/rogue/classcrest_rogue.webp?quality=70&w=280&imagetools'
import shamanCrest from '../assets/images/shaman/classcrest_shaman.webp?quality=70&imagetools'
import shamanCrestSmall from '../assets/images/shaman/classcrest_shaman.webp?quality=70&w=280&imagetools'
import warlockCrest from '../assets/images/warlock/classcrest_warlock.webp?quality=70&imagetools'
import warlockCrestSmall from '../assets/images/warlock/classcrest_warlock.webp?quality=70&w=280&imagetools'
import warriorCrest from '../assets/images/warrior/classcrest_warrior.webp?quality=70&imagetools'
import warriorCrestSmall from '../assets/images/warrior/classcrest_warrior.webp?quality=70&w=280&imagetools'

import type { ClassName } from '../core/types'

const CLASS_CRESTS = {
  druid: {
    large: druidCrest,
    small: druidCrestSmall,
  },
  hunter: {
    large: hunterCrest,
    small: hunterCrestSmall,
  },
  mage: {
    large: mageCrest,
    small: mageCrestSmall,
  },
  paladin: {
    large: paladinCrest,
    small: paladinCrestSmall,
  },
  priest: {
    large: priestCrest,
    small: priestCrestSmall,
  },
  rogue: {
    large: rogueCrest,
    small: rogueCrestSmall,
  },
  shaman: {
    large: shamanCrest,
    small: shamanCrestSmall,
  },
  warlock: {
    large: warlockCrest,
    small: warlockCrestSmall,
  },
  warrior: {
    large: warriorCrest,
    small: warriorCrestSmall,
  },
} as const

/**
 * Hook to get optimized WebP class crest for a given class
 */
export const useClassCrest = (className: ClassName) => {
  return useMemo(() => CLASS_CRESTS[className], [className]);
};