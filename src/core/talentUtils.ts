import type { Talent } from './types'

// Calculate effective node width based on screen size and grid structure
// Grid: 4 columns, gap-6 (24px) on mobile, gap-4 (16px) on desktop
// Node: 56px width, Container padding: varies
const calculateEffectiveNodeWidth =
  (): number => {
    const isMobile =
      typeof window !== 'undefined' &&
      window.innerWidth < 768
    const nodeWidth = 56 // TalentNode button width
    const gap = isMobile ? 24 : 16 // gap-6 on mobile, gap-4 on desktop

    // Get the actual grid container width
    if (typeof window !== 'undefined') {
      const gridContainer =
        document.querySelector(
          '.grid.grid-cols-4'
        )
      if (gridContainer) {
        const containerWidth =
          gridContainer.clientWidth
        const paddingLeft = isMobile ? 16 : 32 // lg:pl-4 = 16px, default padding
        const paddingRight = isMobile ? 16 : 32
        const availableWidth =
          containerWidth -
          paddingLeft -
          paddingRight
        const totalGaps = 3 * gap // 3 gaps between 4 columns
        const cellWidth =
          (availableWidth - totalGaps) / 4

        // Arrow should reach from center of source to center of target
        // So we need: gap + (nodeWidth/2) + (nodeWidth/2) = gap + nodeWidth
        // But on mobile, reduce slightly to account for visual padding
        const effectiveWidth = cellWidth + gap
        return isMobile
          ? effectiveWidth * 0.85
          : effectiveWidth // 15% reduction on mobile
      }
    }

    // Fallback to calculated approximation
    const baseWidth = nodeWidth + gap
    return isMobile ? baseWidth * 0.85 : baseWidth // 15% reduction on mobile
  }

// Calculate connector width specifically for right-connector-arrow
// This needs to be slightly larger on mobile to reach properly
const calculateConnectorWidth = (
  effectiveNodeWidth: number
): number => {
  const isMobile =
    typeof window !== 'undefined' &&
    window.innerWidth < 768
  // For right-connector, we need a bit more width on mobile to reach the edge
  return isMobile
    ? effectiveNodeWidth * 1.15
    : effectiveNodeWidth // 15% increase on mobile
}

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
  if (
    sourceTalent.row === talent.row &&
    sourceTalent.col < talent.col
  ) {
    // Calculate based on actual grid spacing: 56px node + gap
    // Dynamic calculation based on screen width and grid structure
    const effectiveNodeWidth =
      calculateEffectiveNodeWidth()
    const colDiff = talent.col - sourceTalent.col
    const arrowWidth =
      colDiff * effectiveNodeWidth

    return {
      class: `right-arrow ${glowClass}`,
      style: {
        '--arrow-width': `${arrowWidth}px`,
      },
    }
  }

  // Check for left arrow (same row, source col > target col)
  if (
    sourceTalent.row === talent.row &&
    sourceTalent.col > talent.col
  ) {
    // Use same dimensions as right arrow
    const effectiveNodeWidth =
      calculateEffectiveNodeWidth()
    const colDiff = sourceTalent.col - talent.col
    const arrowWidth =
      colDiff * effectiveNodeWidth

    return {
      class: `left-arrow ${glowClass}`,
      style: {
        '--arrow-width': `${arrowWidth}px`,
      },
    }
  }

  // Check for corner connection (down + right): ONLY for specific L-shaped connections
  // This should only apply when we need both down AND right arrows (like row+1, col+1)
  if (
    sourceTalent.row < talent.row &&
    sourceTalent.col < talent.col &&
    talent.row - sourceTalent.row === 1 &&
    talent.col - sourceTalent.col === 1
  ) {
    // For corner connections, return separate arrow elements
    const effectiveNodeHeight = 64
    const effectiveNodeWidth =
      calculateEffectiveNodeWidth()
    const rowDiff = talent.row - sourceTalent.row
    const colDiff = talent.col - sourceTalent.col
    const arrowHeight =
      rowDiff * effectiveNodeHeight
    const arrowWidth =
      colDiff * effectiveNodeWidth

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
            '--connector-width': `${calculateConnectorWidth(effectiveNodeWidth)}px`, // For the diagonal arrow itself
          },
        },
      ],
    }
  }

  // Check for down arrow (source row < target row)
  if (sourceTalent.row < talent.row) {
    const effectiveNodeHeight = 64
    const rowDiff = talent.row - sourceTalent.row
    const arrowHeight =
      rowDiff * effectiveNodeHeight

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
  const tierRequirementMet =
    pointsSpentInTree >=
    requiredForTier(talent.row)
  const dependencyMet = meetsDependencies(
    talent,
    allTalents
  )
  return (
    !(tierRequirementMet && dependencyMet) &&
    talent.points === 0
  )
}

// 🔼 Determine if the talent can be incremented
export const canIncrementTalent = (
  talent: Talent,
  pointsRemaining: number,
  locked: boolean
): boolean => {
  return (
    !locked &&
    talent.points < talent.maxPoints &&
    pointsRemaining > 0
  )
}

// 🔽 Determine if the talent can be decremented
export const canDecrementTalent = (
  talent: Talent,
  allTalents: Talent[],
  locked: boolean
): boolean => {
  const hasDependents = allTalents.some(
    dep =>
      dep.requires?.id === talent.id &&
      dep.points > (dep.requires.points ?? 0)
  )

  const cloneTalents = allTalents.map(t => ({
    ...t,
  }))
  const gatingStillValid =
    treeGatingValid(cloneTalents)

  return (
    !locked &&
    talent.points > 0 &&
    !hasDependents &&
    gatingStillValid
  )
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
    other =>
      other.requires?.id === talent.id &&
      other.points > 0
  )
  if (hasDependents) return false

  // 🧪 Simulate decrement
  const updatedTalents = allTalents.map(t =>
    t.id === talent.id
      ? { ...t, points: t.points - 1 }
      : { ...t }
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
