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

// Find talents that are targets of dependencies and calculate arrow properties
export const getArrowProps = (
  talents: Talent[],
  talent: Talent,
  locked: boolean,
  availablePoints: number
) => {
  if (!talent.requires?.id)
    return { class: '', style: {} }
  const sourceTalent = talents.find(
    s => s.id === talent.requires!.id
  )
  if (!sourceTalent)
    return { class: '', style: {} }

  const isGlowAllowed =
    !locked &&
    sourceTalent.points > 0 &&
    (availablePoints > 0 || talent.points > 0)

  const glowClass = isGlowAllowed ? 'glow' : ''

  // Check for right arrow (same row, source col < target col)
  if (sourceTalent.row === talent.row && sourceTalent.col < talent.col) {
    // Calculate based on actual grid spacing: 56px node + gap
    // Use 72px as an approximation for node width + gap
    const effectiveNodeWidth = 72
    const colDiff = talent.col - sourceTalent.col
    const arrowWidth = colDiff * effectiveNodeWidth

    return {
      class: `right-arrow ${glowClass}`,
      style: {
        '--arrow-width': `${arrowWidth}px`,
      },
    }
  }

  // Check for left arrow (same row, source col > target col)
  if (sourceTalent.row === talent.row && sourceTalent.col > talent.col) {
    // Use same dimensions as right arrow
    const effectiveNodeWidth = 72
    const colDiff = sourceTalent.col - talent.col
    const arrowWidth = colDiff * effectiveNodeWidth

    return {
      class: `left-arrow ${glowClass}`,
      style: {
        '--arrow-width': `${arrowWidth}px`,
      },
    }
  }

  // Check for corner connection (down + right): ONLY for specific L-shaped connections
  // This should only apply when we need both down AND right arrows (like row+1, col+1)
  if (sourceTalent.row < talent.row && sourceTalent.col < talent.col && 
      (talent.row - sourceTalent.row === 1 && talent.col - sourceTalent.col === 1)) {
    // For corner connections, return separate arrow elements
    const effectiveNodeHeight = 64
    const effectiveNodeWidth = 72
    const rowDiff = talent.row - sourceTalent.row
    const colDiff = talent.col - sourceTalent.col
    const arrowHeight = rowDiff * effectiveNodeHeight
    const arrowWidth = colDiff * effectiveNodeWidth

    return {
      class: 'corner-connection',
      style: {},
      arrows: [
        {
          type: 'down',
          glow: isGlowAllowed,
          style: {
            '--arrow-height': `${rowDiff === 1 ? 40 : arrowHeight}px`,
          },
        },
        {
          type: 'right-connector',
          glow: isGlowAllowed,
          style: {
            '--arrow-width': `${arrowWidth}px`,
          },
        },
      ],
    }
  }

  // Check for down arrow (source row < target row)
  if (sourceTalent.row < talent.row) {
    const effectiveNodeHeight = 64
    const rowDiff = talent.row - sourceTalent.row
    const arrowHeight = rowDiff * effectiveNodeHeight

    return {
      class: `down-arrow ${glowClass}`,
      style: {
        '--arrow-height': `${rowDiff === 1 ? 40 : arrowHeight}px`,
      },
    }
  }

  // No supported arrow direction
  return { class: '', style: {} }
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

// 🔐 Check if a talent is locked and cannot be incremented yet
export const isTalentLocked = (
  talent: Talent,
  allTalents: Talent[],
  pointsSpentInTree: number
): boolean => {
  const tierRequirementMet = pointsSpentInTree >= requiredForTier(talent.row)
  const dependencyMet = meetsDependencies(talent, allTalents)
  return !(tierRequirementMet && dependencyMet) && talent.points === 0
}

// 🔼 Determine if the talent can be incremented
export const canIncrementTalent = (
  talent: Talent,
  pointsRemaining: number,
  locked: boolean
): boolean => {
  return !locked && talent.points < talent.maxPoints && pointsRemaining > 0
}

// 🔽 Determine if the talent can be decremented
export const canDecrementTalent = (
  talent: Talent,
  allTalents: Talent[],
  locked: boolean
): boolean => {
  const hasDependents = allTalents.some(
    dep => dep.requires?.id === talent.id && dep.points > (dep.requires.points ?? 0)
  )

  const cloneTalents = allTalents.map(t => ({ ...t }))
  const gatingStillValid = treeGatingValid(cloneTalents)

  return !locked && talent.points > 0 && !hasDependents && gatingStillValid
}

// ✅ Checks if removing a point from this talent breaks any rules
export const canSafelyDecrementTalent = (
  talent: Talent,
  allTalents: Talent[]
): boolean => {
  // 🔒 Must have points to unlearn
  if (talent.points <= 0) return false

  // 🔗 Must not be required by any other talents
  const hasDependents = allTalents.some(
    other => other.requires?.id === talent.id && other.points > 0
  )
  if (hasDependents) return false

  // 🧪 Simulate decrement
  const updatedTalents = allTalents.map(t =>
    t.id === talent.id ? { ...t, points: t.points - 1 } : { ...t }
  )

  // ⛓️ Check if remaining talents still meet their tier requirements
  const tierViolation = updatedTalents.some(t => {
    if (t.points === 0) return false
    const required = requiredForTier(t.row)
    const belowSpent = updatedTalents
      .filter(u => u.row < t.row)
      .reduce((sum, u) => sum + u.points, 0)
    return belowSpent < required
  })
  if (tierViolation) return false

  // 🔐 Final gating pass
  return treeGatingValid(updatedTalents)
}