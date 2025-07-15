import {
  useState,
  useMemo,
  useEffect,
} from 'react'
import type { ClassName, Tree } from './types'
import {
  canIncrementTalent,
  canSafelyDecrementTalent,
  isTalentLocked,
} from './talentUtils'
import { talentData } from './data/talentData'

const additionalTalentPointsLevels = [14,19,24,29,34,39,44,49,54,60]

type UseTalentTreesProps = {
  selectedClass: ClassName
  setSelectedClass: (className: ClassName) => void
  totalTalentPoints?: number
}

export const useTalentTrees = ({
  selectedClass,
  setSelectedClass,
  totalTalentPoints = 61,
}: UseTalentTreesProps) => {
  const [trees, setTrees] = useState<Tree[]>(
    talentData[selectedClass]
  )

  useEffect(() => {
    setTrees(talentData[selectedClass])
  }, [selectedClass])

  const totalPointsSpent = useMemo(() => {
    return trees.reduce(
      (sum, tree) =>
        sum +
        tree.talents.reduce(
          (s, talent) => s + talent.points,
          0
        ),
      0
    )
  }, [trees])

  const pointsByLevel = useMemo(() => {
    const list: number[] = []
    for (let level = 1; level <= 200; level++) {
      let points = 0
      if (level >= 10) points += 1
      if (additionalTalentPointsLevels.includes(level)) points += 1
      list[level] = points
    }
    return list
  }, [])

  const cumulativePointsByLevel = useMemo(() => {
    const cumulative: number[] = []
    let total = 0
    for (let level = 1; level <= pointsByLevel.length - 1; level++) {
      total += pointsByLevel[level]
      cumulative[level] = total
    }
    return cumulative
  }, [pointsByLevel])

  const currentLevel = useMemo(() => {
    for (let level = 10; level < cumulativePointsByLevel.length; level++) {
      if (cumulativePointsByLevel[level] >= totalPointsSpent) {
        return level
      }
    }
    return cumulativePointsByLevel.length - 1
  }, [totalPointsSpent, cumulativePointsByLevel])

  const pointsRemaining = useMemo(() => {
    return Math.max(0, totalTalentPoints - totalPointsSpent)
  }, [totalTalentPoints, totalPointsSpent])

  const resetTree = (idx: number) => {
    setTrees(prev => {
      const copy = [...prev]
      copy[idx] = {
        ...copy[idx],
        talents: copy[idx].talents.map(t => ({
          ...t,
          points: 0,
        })),
      }
      return copy
    })
  }

  const resetAll = () => {
    setTrees(
      JSON.parse(
        JSON.stringify(talentData[selectedClass])
      )
    )
  }

  const modify = (
    treeIdx: number,
    talentId: string,
    e:
      | React.MouseEvent
      | { shiftKey: boolean; type: string }
  ) => {
    setTrees(prev => {
      const copy = [...prev]
      const talents = copy[treeIdx].talents.map(t => ({ ...t }))
      const target = talents.find(t => t.id === talentId)
      if (!target) return prev

      const pointsSpent = talents.reduce((s, t) => s + t.points, 0)
      const locked = isTalentLocked(target, talents, pointsSpent)
      const isShift = e.shiftKey || e.type === 'contextmenu'

      if (isShift) {
        if (canSafelyDecrementTalent(target, talents)) {
          target.points -= 1
        }
      } else {
        if (canIncrementTalent(target, pointsRemaining, locked)) {
          target.points += 1
        }
      }

      copy[treeIdx] = {
        ...copy[treeIdx],
        talents,
      }
      return copy
    })
  }

  return {
    trees,
    currentLevel,
    totalPointsSpent,
    totalTalentPoints,
    pointsRemaining,
    modify,
    resetTree,
    resetAll,
    setSelectedClass,
  }
}
