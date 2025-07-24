import { useState, useMemo, useEffect } from 'react'
import type { ClassName, Tree } from './types'
import {
  canIncrementTalent,
  canSafelyDecrementTalent,
  isTalentLocked
} from './talentUtils'
import { loadTalentData } from './data/talentLoader'
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
  totalTalentPoints = 61
}: UseTalentTreesProps) => {
  const [trees, setTrees] = useState<Tree[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load talent data when component mounts or class changes
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const talentData = await loadTalentData(selectedClass)
        
        // Handle URL decoding if present
        const params = new URLSearchParams(window.location.search)
        const encoded = params.get('data')
        const classInURL = params.get('class')
        
        let initialTrees: Tree[]
        
        // Only apply encoded data if the class in URL matches the selected class
        if (!encoded || classInURL !== selectedClass) {
          initialTrees = JSON.parse(JSON.stringify(talentData))
        } else {
          const decoded = decodeTalentBuild(encoded)
          initialTrees = JSON.parse(JSON.stringify(talentData))
          
          decoded.forEach(([globalIdx, pts]) => {
            let remaining = globalIdx
            for (const tree of initialTrees) {
              if (remaining < tree.talents.length) {
                tree.talents[remaining].points = pts
                break
              }
              remaining -= tree.talents.length
            }
          })
        }
        
        setTrees(initialTrees)
        updateURL(initialTrees, selectedClass)
      } catch (err) {
        setError(`Failed to load talent data: ${err instanceof Error ? err.message : String(err)}`)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
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

  const pointsSpentPerTree = useMemo(() => {
    const result: Record<string, number> = {}
    for (const tree of trees) {
      result[tree.name] = tree.talents.reduce((sum, talent) => sum + talent.points, 0)
    }
    return result
  }, [trees])

  const primaryTree = useMemo(() => {
    let maxPoints = 10
    let primary = { name: '', specIcon: '' }
  
    for (const tree of trees) {
      const points = pointsSpentPerTree[tree.name] ?? 0
      if (points > maxPoints) {
        maxPoints = points
        primary = {
          name: tree.name,
          specIcon: tree.specIcon
        }
      }
    }
  
    return primary
  }, [trees, pointsSpentPerTree])

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

  const resetAll = async () => {
    try {
      const talentData = await loadTalentData(selectedClass)
      const reset = JSON.parse(JSON.stringify(talentData))
      setTrees(reset)
      updateURL(reset, selectedClass)
    } catch (err) {
      setError(`Failed to reset: ${err instanceof Error ? err.message : String(err)}`)
    }
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
    isLoading,
    error,
    currentLevel,
    totalPointsSpent,
    totalTalentPoints,
    pointsRemaining,
    pointsSpentPerTree,
    primaryTree,
    modify,
    resetTree,
    resetAll,
    setSelectedClass,
  }
}