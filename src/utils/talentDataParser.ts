// utils/talentDataParser.ts
import type {
  TalentOrderItem,
  Tree,
} from '../core/types'

/**
 * Encode the current build as a simple digit string per tree, joined with '-'
 */
export const encodeTalentBuild = (
  trees: Tree[]
): string => {
  // Find last non-empty tree index
  let lastNonEmptyTreeIndex = -1
  for (let i = trees.length - 1; i >= 0; i--) {
    if (
      trees[i].talents.some(t => t.points > 0)
    ) {
      lastNonEmptyTreeIndex = i
      break
    }
  }

  if (lastNonEmptyTreeIndex === -1) {
    return ''
  }

  const encodedTrees = []

  for (
    let i = 0;
    i <= lastNonEmptyTreeIndex;
    i++
  ) {
    const pointsArr = trees[i].talents.map(
      t => t.points
    )

    // Trim trailing zeros inside this tree's points
    while (
      pointsArr.length > 0 &&
      pointsArr[pointsArr.length - 1] === 0
    ) {
      pointsArr.pop()
    }

    // Join remaining points or '' if empty (empty tree)
    encodedTrees.push(pointsArr.join(''))
  }

  return encodedTrees.join('-')
}

export const decodeTalentBuild = (
  slug: string,
  trees: Tree[]
): Tree[] => {
  if (!slug) {
    // All empty
    return trees.map(tree => ({
      ...tree,
      talents: tree.talents.map(t => ({
        ...t,
        points: 0,
      })),
    }))
  }

  const segments = slug.split('-')
  return trees.map((tree, treeIdx) => {
    const pointsString = segments[treeIdx] || ''
    return {
      ...tree,
      talents: tree.talents.map((t, i) => ({
        ...t,
        points:
          parseInt(pointsString[i] || '0', 10) ||
          0,
      })),
    }
  })
}

export const encodeTalentSlug = (
  talentOrder: TalentOrderItem[],
  trees: Tree[]
): string => {
  const nameToMeta = new Map<
    string,
    {
      treeIdx: number
      talentIdx: number
      max: number
    }
  >()
  trees.forEach((tree, ti) =>
    tree.talents.forEach((talent, idx) =>
      nameToMeta.set(talent.name, {
        treeIdx: ti,
        talentIdx: idx,
        max: talent.maxPoints,
      })
    )
  )

  let result = ''
  let currentTree: number | null = null
  const segmentCounts: Record<string, number> = {}

  for (const { name } of talentOrder) {
    const meta = nameToMeta.get(name)
    if (!meta) continue

    const { treeIdx, talentIdx, max } = meta

    // New tree segment starts if tree changed from last talent
    if (treeIdx !== currentTree) {
      currentTree = treeIdx
      // Reset counts for this segment
      for (const key in segmentCounts) {
        delete segmentCounts[key]
      }
      result += `${treeIdx}`
    }

    // Increment count of points spent on this talent in this segment
    segmentCounts[name] =
      (segmentCounts[name] || 0) + 1
    const count = segmentCounts[name]
    const char = String.fromCharCode(
      65 + talentIdx
    ) // A-Z

    if (count === max) {
      // Replace all lowercase chars for this talent in this segment with uppercase
      const lowerChar = char.toLowerCase()
      const newResult = []
      for (let i = 0; i < result.length; i++) {
        const c = result[i]
        if (c === lowerChar) continue // skip lowercase chars of this talent
        newResult.push(c)
      }
      newResult.push(char) // add uppercase char once
      result = newResult.join('')
    } else {
      // Just add lowercase char
      result += char.toLowerCase()
    }
  }

  return result
}

/**
 * Decode a slug like 0A1B2ccc0A into a TalentOrderItem[].
 */
export const decodeTalentSlug = (
  slug: string,
  trees: Tree[]
): TalentOrderItem[] => {
  const result: TalentOrderItem[] = []
  if (!slug) return result

  // Map treeIdx + talentIdx → talentName for fast lookup
  const treeTalentMap: Map<string, string> =
    new Map()
  trees.forEach((tree, treeIdx) => {
    tree.talents.forEach((talent, talentIdx) => {
      treeTalentMap.set(
        `${treeIdx}-${talentIdx}`,
        talent.name
      )
    })
  })

  let segmentStart = 0

  // Split the slug into segments by detecting digits (tree indices)
  // For example: "0A2A0bbb" → ['0A', '2A', '0bbb']
  const segments: string[] = []
  for (let i = 0; i < slug.length; i++) {
    const c = slug[i]
    if (/\d/.test(c)) {
      if (segmentStart < i) {
        segments.push(slug.slice(segmentStart, i))
      }
      segmentStart = i
    }
  }
  // Push last segment
  if (segmentStart < slug.length) {
    segments.push(slug.slice(segmentStart))
  }

  // Parse each segment
  for (const segment of segments) {
    if (segment.length === 0) continue
    // First char is tree index
    const treeIdx = Number(segment[0])
    if (
      isNaN(treeIdx) ||
      treeIdx < 0 ||
      treeIdx >= trees.length
    )
      continue

    // The rest are talent chars
    const chars = segment.slice(1)

    // Count points for each talent in this segment (because multiple lowercase chars = multiple points)
    const talentPointCounts: Record<
      number,
      number
    > = {}

    for (const char of chars) {
      const isUpper = char >= 'A' && char <= 'Z'
      const talentIdx =
        char.toUpperCase().charCodeAt(0) - 65
      if (
        talentIdx < 0 ||
        talentIdx >= trees[treeIdx].talents.length
      )
        continue

      // If uppercase, max points = talent.maxPoints, else +1 point
      const talent =
        trees[treeIdx].talents[talentIdx]
      const pointsToAdd = isUpper
        ? talent.maxPoints
        : 1

      for (let p = 0; p < pointsToAdd; p++) {
        const rank =
          (talentPointCounts[talentIdx] ?? 0) + 1
        talentPointCounts[talentIdx] = rank
        result.push({
          name: talent.name,
          rank,
          icon: talent.icon,
          description: talent.ranks[rank - 1],
          abilityData: talent.abilityData,
        })
      }
    }
  }

  return result
}
