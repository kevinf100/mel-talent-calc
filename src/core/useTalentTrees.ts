import { useState, useMemo } from 'react'
import type { Tree } from './types'
import {
  treeGatingValid,
  meetsDependencies,
  requiredForTier,
} from './talentUtils'
import { initialTalentTrees } from './talentData'

const TOTAL_TALENT_POINTS = 15

export const useTalentTrees = () => {
  const [trees, setTrees] = useState<Tree[]>(initialTalentTrees)

  const totalPointsSpent = useMemo(() => {
    return trees.reduce(
      (sum, tree) =>
        sum + tree.talents.reduce((s, talent) => s + talent.points, 0),
      0
    )
  }, [trees])

  const pointsRemaining = useMemo(() => {
    return Math.max(0, TOTAL_TALENT_POINTS - totalPointsSpent)
  }, [totalPointsSpent])

  const resetTree = (idx: number) => {
    setTrees(prev => {
      const copy = [...prev]
      copy[idx] = {
        ...copy[idx],
        talents: copy[idx].talents.map(t => ({ ...t, points: 0 })),
      }
      return copy
    })
  }

  const resetAll = () => {
    setTrees(JSON.parse(JSON.stringify(initialTalentTrees)))
  }

  const modify = (
    treeIdx: number,
    talentId: string,
    e: React.MouseEvent | { shiftKey: boolean; type: string }
  ) => {
    setTrees(prev => {
      const copy = [...prev]
      const talents = copy[treeIdx].talents.map(t => ({ ...t }))
      const target = talents.find(t => t.id === talentId)
      if (!target) return prev

      const treePoints = talents.reduce((sum, t) => sum + t.points, 0)
      const locked =
        treePoints < requiredForTier(target.row) ||
        !meetsDependencies(target, talents)

      const isShift = e.shiftKey || e.type === 'contextmenu'

      if (isShift) {
        const hasDependents = talents.some(
          t => t.requires?.id === target.id && t.points > t.requires.points
        )
        if (target.points > 0 && !hasDependents) {
          target.points -= 1
          if (!treeGatingValid(talents)) {
            target.points += 1 // revert
          }
        }
      } else {
        if (
          target.points < target.maxPoints &&
          !locked &&
          pointsRemaining > 0
        ) {
          target.points += 1
        }
      }

      copy[treeIdx] = { ...copy[treeIdx], talents }
      return copy
    })
  }

  return {
    trees,
    totalTalentPoints: TOTAL_TALENT_POINTS,
    totalPointsSpent,
    pointsRemaining,
    modify,
    resetTree,
    resetAll,
  }
}
