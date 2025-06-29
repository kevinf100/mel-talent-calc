import type { Talent } from './types'

/**
 * Generate dummy talents with random row/col placement inside a 4×7 grid.
 * Ensures 2–3 unique columns per row.
 */
export const makeTalents = (
  prefix: string,
  startRow = 0,
  rows = 7,
  cols = 4,
  minPerRow = 2,
  maxPerRow = 3,
  maxPoints = 5,
): Talent[] => {
  let id = 0
  const allTalents: Talent[] = []
  for (let i = 0; i < rows; i++) {
    const row = startRow + i
    const howMany = Math.floor(Math.random() * (maxPerRow - minPerRow + 1)) + minPerRow
    const chosenCols = shuffle(Array.from({ length: cols }, (_, i) => i)).slice(0, howMany).sort()
    for (const col of chosenCols) {
      allTalents.push({
        id: `${prefix}-${id}`,
        label: `T${id}`,
        description: `Random ${prefix} Talent ${id}`,
        row,
        col,
        points: 0,
        maxPoints,
      })
      id++
    }
  }
  return allTalents
}

const shuffle = <T>(arr: T[]): T[] => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const requiredForTier = (row: number) => row * 5

export const treeGatingValid = (
  talents: Talent[]
): boolean => {
  const rowTotals: Record<number, number> = {}
  talents.forEach(t => {
    rowTotals[t.row] =
      (rowTotals[t.row] || 0) + t.points
  })
  return talents.every(t => {
    if (t.points === 0) return true

    const prevPoints = Object.entries(rowTotals)
      .filter(([r]) => Number(r) < t.row)
      .reduce((s, [, v]) => s + v, 0)

    return (
      prevPoints >= requiredForTier(t.row) &&
      meetsDependencies(t, talents)
    )
  })
}

export const meetsDependencies = (
  talent: Talent,
  all: Talent[]
): boolean => {
  if (!talent.requires) return true
  const dep = all.find(
    t => t.id === talent.requires?.id
  )
  return (
    !!dep &&
    dep.points >= talent.requires.points
  )
}
