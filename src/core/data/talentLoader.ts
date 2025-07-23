import type { ClassName, Tree } from '../types'

// Cache for loaded talent data to avoid re-importing
const talentDataCache = new Map<ClassName, Tree[]>()

/**
 * Dynamically loads talent data for a specific class
 * This prevents loading ALL class data at once, reducing initial bundle size
 */
export const loadTalentData = async (className: ClassName): Promise<Tree[]> => {
  // Return cached data if already loaded
  if (talentDataCache.has(className)) {
    return talentDataCache.get(className)!
  }

  let classData: Tree[]

  // Dynamic imports - only load the data for the requested class
  switch (className) {
    case 'warrior':
      const { arms } = await import('./warrior/arms')
      const { fury } = await import('./warrior/fury')
      const { protection } = await import('./warrior/protection')
      classData = [arms, fury, protection]
      break

    case 'paladin':
      const { holy: paladinHoly } = await import('./paladin/holy')
      const { protection: paladinProtection } = await import('./paladin/protection')
      const { retribution } = await import('./paladin/retribution')
      classData = [paladinHoly, paladinProtection, retribution]
      break

    case 'hunter':
      const { beastmastery } = await import('./hunter/beastmastery')
      const { marksmanship } = await import('./hunter/marksmanship')
      const { survival } = await import('./hunter/survival')
      classData = [beastmastery, marksmanship, survival]
      break

    case 'rogue':
      const { assassination } = await import('./rogue/assassination')
      const { combat } = await import('./rogue/combat')
      const { subtlety } = await import('./rogue/subtlety')
      classData = [assassination, combat, subtlety]
      break

    case 'priest':
      const { discipline } = await import('./priest/discipline')
      const { holy: priestHoly } = await import('./priest/holy')
      const { shadow } = await import('./priest/shadow')
      classData = [discipline, priestHoly, shadow]
      break

    case 'shaman':
      const { elemental } = await import('./shaman/elemental')
      const { enhancement } = await import('./shaman/enhancement')
      const { restoration: shamanRestoration } = await import('./shaman/restoration')
      classData = [elemental, enhancement, shamanRestoration]
      break

    case 'mage':
      const { arcane } = await import('./mage/arcane')
      const { fire } = await import('./mage/fire')
      const { frost } = await import('./mage/frost')
      classData = [arcane, fire, frost]
      break

    case 'warlock':
      const { affliction } = await import('./warlock/affliction')
      const { demonology } = await import('./warlock/demonology')
      const { destruction } = await import('./warlock/destruction')
      classData = [affliction, demonology, destruction]
      break

    case 'druid':
      const { balance } = await import('./druid/balance')
      const { feralcombat } = await import('./druid/feralcombat')
      const { restoration: druidRestoration } = await import('./druid/restoration')
      classData = [balance, feralcombat, druidRestoration]
      break

    default:
      throw new Error(`Unknown class: ${className}`)
  }

  // Cache the loaded data
  talentDataCache.set(className, classData)
  return classData
}

/**
 * Synchronously get talent data if it's already cached
 * Used for backwards compatibility with existing code
 */
export const getCachedTalentData = (className: ClassName): Tree[] | null => {
  return talentDataCache.get(className) || null
}

/**
 * Preload talent data for a class (useful for preloading common classes)
 */
export const preloadTalentData = (className: ClassName): Promise<Tree[]> => {
  return loadTalentData(className)
}
