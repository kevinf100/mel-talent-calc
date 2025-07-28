import type { Talent } from './types'

const FIXED_OFFSET = 58

const calculateEffectiveNodeWidth = (
  windowWidth: number,
  containerWidth: number,
  isDesktop: boolean
): number => {
  const gridContainer = document.querySelector(
    '.grid.grid-cols-4'
  )
  if (!gridContainer) return isDesktop ? 42 : 42 // fallback
  const padding = windowWidth >= 1024 ? 16 : 0
  const gap = isDesktop ? 24 : 32
  const availableWidth =
    containerWidth - padding * 2
  const totalGaps = gap * 3
  const columnWidth =
    (availableWidth - totalGaps) / 4

  return columnWidth + gap - FIXED_OFFSET
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

export const getArrowProps = (
  talents: Talent[],
  talent: Talent,
  locked: boolean,
  availablePoints: number,
  isDesktop: boolean,
  windowWidth: number,
  containerWidth: number
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

  // Left / Right Arrow
  if (sourceTalent.row === talent.row) {
    const colDiff = Math.abs(
      talent.col - sourceTalent.col
    )
    const effectiveNodeWidth =
      calculateEffectiveNodeWidth(
        windowWidth,
        containerWidth,
        isDesktop
      )
    const arrowWidth =
      colDiff * effectiveNodeWidth

    return {
      class: `${sourceTalent.col < talent.col ? 'right-arrow' : 'left-arrow'} ${glowClass}`,
      style: {
        '--arrow-width': `${arrowWidth}px`,
      },
    }
  }

  // Corner Connection (Down + Right)
  if (
    sourceTalent.row < talent.row &&
    sourceTalent.col < talent.col &&
    talent.row - sourceTalent.row === 1 &&
    talent.col - sourceTalent.col === 1
  ) {
    const effectiveNodeHeight = 45
    const effectiveNodeWidth =
    calculateEffectiveNodeWidth(
      windowWidth,
      containerWidth,
      isDesktop
    ) + 43

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
            '--arrow-height': `${arrowHeight}px`,
          },
        },
        {
          type: 'right-connector',
          glow: isGlowAllowed,
          style: {
            '--arrow-width': `${arrowWidth}px`,
            '--connector-width': `${effectiveNodeWidth}px`,
          },
        },
      ],
    }
  }

  // Down Arrow
  if (sourceTalent.row < talent.row) {
    const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent);

    const rowDiff = talent.row - sourceTalent.row
    const extraHeight = talent.row > 6 ? rowDiff * 5 + 4 : 0
    const arrowHeight = 87 * rowDiff - 59 + (isIOS ? 0 : extraHeight)
  
    return {
      class: `down-arrow ${glowClass}`,
      style: {
        '--arrow-height': `${arrowHeight}px`,
      },
    }
  }

  return { class: '', style: {} }
}

export type RequirementParams = {
  disabled: boolean
  currentPoints: number
  totalPointsInTree: number
  tierRequirement: number
  requires?: { id: string; points: number }
  requiredTalentPoints?: number
  requiredTalentName?: string
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

export const canSafelyDecrementTalent = (
  talent: Talent,
  allTalents: Talent[]
): boolean => {
  if (talent.points <= 0) return false

  const hasDependents = allTalents.some(
    other =>
      other.requires?.id === talent.id &&
      other.points > 0
  )
  if (hasDependents) return false

  const updatedTalents = allTalents.map(t =>
    t.id === talent.id
      ? { ...t, points: t.points - 1 }
      : { ...t }
  )

  const tierViolation = updatedTalents.some(t => {
    if (t.points === 0) return false
    const required = requiredForTier(t.row)
    const belowSpent = updatedTalents
      .filter(u => u.row < t.row)
      .reduce((sum, u) => sum + u.points, 0)
    return belowSpent < required
  })
  if (tierViolation) return false

  return treeGatingValid(updatedTalents)
}