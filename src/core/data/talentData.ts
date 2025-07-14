import type { TalentData } from '../types'

// Warrior imports
import { arms } from './warrior/arms'
import { fury } from './warrior/fury'
import { protection } from './warrior/protection'

// Paladin imports
import { holy as paladinHoly } from './paladin/holy'
import { protection as paladinProtection } from './paladin/protection'
import { retribution } from './paladin/retribution'

// Hunter imports
import { beastmastery } from './hunter/beastmastery'
import { marksmanship } from './hunter/marksmanship'
import { survival } from './hunter/survival'

// Rogue imports
import { assassination } from './rogue/assassination'
import { combat } from './rogue/combat'
import { subtlety } from './rogue/subtlety'

// Priest imports
import { discipline } from './priest/discipline'
import { holy as priestHoly } from './priest/holy'
import { shadow } from './priest/shadow'

// Shaman imports
import { elemental } from './shaman/elemental'
import { enhancement } from './shaman/enhancement'
import { restoration as shamanRestoration } from './shaman/restoration'

// Mage imports
import { arcane } from './mage/arcane'
import { fire } from './mage/fire'
import { frost } from './mage/frost'

// Warlock imports
import { affliction } from './warlock/affliction'
import { demonology } from './warlock/demonology'
import { destruction } from './warlock/destruction'

// Druid imports
import { balance } from './druid/balance'
import { feralcombat } from './druid/feralcombat'
import { restoration as druidRestoration } from './druid/restoration'

export const talentData: TalentData = {
  warrior: [arms, fury, protection],
  paladin: [
    paladinHoly,
    paladinProtection,
    retribution,
  ],
  hunter: [beastmastery, marksmanship, survival],
  rogue: [assassination, combat, subtlety],
  priest: [discipline, priestHoly, shadow],
  shaman: [
    elemental,
    enhancement,
    shamanRestoration,
  ],
  mage: [arcane, fire, frost],
  warlock: [affliction, demonology, destruction],
  druid: [balance, feralcombat, druidRestoration],
}
