import { useState, useMemo, useEffect, useRef } from 'react'
import type { ClassName, Tree } from './types'
import {
  canIncrementTalent,
  canSafelyDecrementTalent,
  isTalentLocked
} from './talentUtils'
import { talentData } from './data/talentData'
import {
  decodeTalentBuild,
  encodeTalentBuild
} from '../utils/base64Utils'

const additionalTalentPointsLevels = [14, 19, 24, 29, 34, 39, 44, 49, 54, 60]

type UseTalentTreesProps = {
  selectedClass: ClassName
  setSelectedClass: (className: ClassName) => void
  totalTalentPoints?: number
}

export const useTalentTrees = ({
  selectedClass,
  setSelectedClass,
  totalTalentPoints = 21
}: UseTalentTreesProps) => {
  const [trees, setTrees] = useState<Tree[]>(() => {
    const params = new URLSearchParams(window.location.search)
    const encoded = params.get('data')

    if (!encoded) {
      return JSON.parse(JSON.stringify(talentData[selectedClass]))
    }

    const decoded = decodeTalentBuild(encoded)
    const rebuilt = JSON.parse(JSON.stringify(talentData[selectedClass]))

    decoded.forEach(([globalIdx, pts]) => {
      let remaining = globalIdx
      for (const tree of rebuilt) {
        if (remaining < tree.talents.length) {
          tree.talents[remaining].points = pts
          break
        }
        remaining -= tree.talents.length
      }
    })

    return rebuilt
  })

  const prevClassRef = useRef<ClassName | null>(null)

  useEffect(() => {
    if (prevClassRef.current !== null && prevClassRef.current !== selectedClass) {
      const defaultTrees = JSON.parse(JSON.stringify(talentData[selectedClass]))
      setTrees(defaultTrees)
      updateURL(defaultTrees, selectedClass)
    }
    prevClassRef.current = selectedClass
  }, [selectedClass])

  const totalPointsSpent = useMemo(() => {
    return trees.reduce(
      (sum, tree) => sum + tree.talents.reduce((s, talent) => s + talent.points, 0),
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
    for (let level = 1; level < pointsByLevel.length; level++) {
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

  const updateURL = (trees: Tree[], selectedClass: ClassName) => {
    const isEmptyBuild = trees.every(tree =>
      tree.talents.every(t => t.points === 0)
    )

    const params = new URLSearchParams()
    params.set('class', selectedClass)

    if (!isEmptyBuild) {
      const encoded = encodeTalentBuild(trees)
      params.set('data', encoded)
    }

    const url = `${window.location.origin}?${params.toString()}`
    window.history.replaceState(null, '', url)
  }

  const resetTree = (idx: number) => {
    setTrees(prev => {
      const copy = [...prev]
      copy[idx] = {
        ...copy[idx],
        talents: copy[idx].talents.map(t => ({ ...t, points: 0 }))
      }
      updateURL(copy, selectedClass)
      return copy
    })
  }

  const resetAll = () => {
    const reset = JSON.parse(JSON.stringify(talentData[selectedClass]))
    setTrees(reset)
    updateURL(reset, selectedClass)
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

      copy[treeIdx] = { ...copy[treeIdx], talents }
      updateURL(copy, selectedClass)
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
    setSelectedClass
  }
}