import type { Talent } from './types'

export const requiredForTier = (row: number) =>
  row * 5

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
    !!dep && dep.points >= talent.requires.points
  )
}

// Find talents that are targets of downward dependencies and calculate arrow height
export const getArrowProps = (
  talents: Talent[],
  talent: Talent,
  locked: boolean
) => {
  if (!talent.requires?.id)
    return { class: '', style: {} }
  const sourceTalent = talents.find(
    s => s.id === talent.requires!.id
  )
  if (!sourceTalent)
    return { class: '', style: {} }
  // Only apply for downward dependencies (source row < target row)
  if (sourceTalent.row >= talent.row)
    return { class: '', style: {} }

  // Calculate arrow height to reach source node's bottom
  const effectiveNodeHeight = 64
  const rowDiff = talent.row - sourceTalent.row
  const arrowHeight =
    rowDiff * effectiveNodeHeight

  // Add 'glow' class if dependency is met
  const glowClass = locked ? '' : 'glow'

  return {
    class: `down-arrow ${glowClass}`,
    style: {
      '--arrow-height': `${arrowHeight}px`,
    },
  }
}

export type RequirementParams = {
  disabled: boolean
  currentPoints: number
  totalPointsInTree: number
  tierRequirement: number
  requires?: { id: string; points: number }
  requiredTalentPoints?: number
  requiredTalentName?: string // ✅ Add this
  talentTreeName: string
}

export const getRequirementsText = ({
  disabled,
  currentPoints,
  totalPointsInTree,
  tierRequirement,
  requires,
  requiredTalentPoints = 0,
  requiredTalentName,
  talentTreeName,
}: RequirementParams): string[] => {
  if (!disabled || currentPoints > 0) return []

  const requirements: string[] = []

  if (totalPointsInTree < tierRequirement) {
    requirements.push(
      `Requires ${tierRequirement} points in ${talentTreeName} Talents`
    )
  }

  if (
    requires &&
    requiredTalentPoints < requires.points
  ) {
    requirements.push(
      `Requires ${requires.points} point${requires.points === 1 ? '' : 's'} in ${requiredTalentName ?? 'required talent'}`
    )
  }

  return requirements
}
