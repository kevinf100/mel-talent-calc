// useTalentTrees.ts
import { useState, useMemo, useEffect, useRef } from 'react'
import type { ClassName, Tree, TalentOrderItem, Talent } from './types'
import {
  canIncrementTalent,
  canSafelyDecrementTalent,
  isTalentLocked,
} from './talentUtils'
import { loadTalentData } from './data/talentLoader'
import {
  encodeTalentBuild,
  decodeTalentBuild,
  encodeTalentSlug,
  decodeTalentSlug,
} from '../utils/talentDataParser'

const additionalTalentPointsLevels = [14, 19, 24, 29, 34, 39, 44, 49, 54, 60]

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
  const [trees, setTrees] = useState<Tree[]>([])
  const [error, setError] = useState<string | null>(null)
  const [talentSpendOrder, setTalentSpendOrder] = useState<TalentOrderItem[]>([])

  // pristine base data to rebuild from (never mutated)
  const baseTreesRef = useRef<Tree[]>([])

  // ---- Load initial data ----------------------------------------------------
  useEffect(() => {
    const loadDataAsync = async () => {
      try {
        setError(null)
        const talentData = await loadTalentData(selectedClass)

        const pathSegments = window.location.pathname
          .split('/')
          .filter(Boolean)

        const [classFromPath, encodedBuild, orderSlug] = pathSegments

        const cloneBase =
          typeof structuredClone !== 'undefined'
            ? structuredClone(talentData)
            : JSON.parse(JSON.stringify(talentData))

        baseTreesRef.current = cloneBase

        let initialTrees: Tree[]
        let initialOrder: TalentOrderItem[] = []

        const cloned = deepClone(baseTreesRef.current)
        if (classFromPath === selectedClass && encodedBuild) {
          initialTrees = decodeTalentBuild(encodedBuild, cloned)
        } else {
          initialTrees = cloned
        }

        if (classFromPath === selectedClass && orderSlug) {
          initialOrder = decodeTalentSlug(orderSlug, initialTrees)
        }

        setTalentSpendOrder(initialOrder)
        setTrees(initialTrees)
      } catch (err) {
        setError(
          `Failed to load talent data: ${
            err instanceof Error ? err.message : String(err)
          }`
        )
      }
    }

    loadDataAsync()
  }, [selectedClass])

  // ---- URL Update Helper ----------------------------------------------------
  const updateUrl = (treesToUse = trees, orderToUse = talentSpendOrder) => {
    const encodedData = encodeTalentBuild(treesToUse)
    let url = `${window.location.origin}/${selectedClass}`
    
    if (encodedData) { // encodeTalentBuild returns '' if empty
      url += `/${encodedData}`
      const orderSlug = encodeTalentSlug(orderToUse, treesToUse)
      if (orderSlug.length > 0) {
        url += `/${orderSlug}`
      }
    }

    window.history.replaceState(null, '', url)
  }

  // ---- derived --------------------------------------------------------------
  const totalPointsSpent = useMemo(
    () =>
      trees.reduce(
        (sum, tree) => sum + tree.talents.reduce((s, t) => s + t.points, 0),
        0
      ),
    [trees]
  )

  const pointsByLevel = useMemo(() => {
    const list: number[] = []
    for (let level = 1; level <= 100; level++) {
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

  const pointsRemaining = useMemo(
    () => Math.max(0, totalTalentPoints - totalPointsSpent),
    [totalTalentPoints, totalPointsSpent]
  )

  const pointsSpentPerTree = useMemo(() => {
    const result: Record<string, number> = {}
    for (const tree of trees) {
      result[tree.name] = tree.talents.reduce((sum, t) => sum + t.points, 0)
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
        primary = { name: tree.name, specIcon: tree.specIcon }
      }
    }
    return primary
  }, [trees, pointsSpentPerTree])

  // ---- helpers --------------------------------------------------------------
  const deepClone = <T,>(obj: T): T =>
    typeof structuredClone !== 'undefined'
      ? structuredClone(obj)
      : JSON.parse(JSON.stringify(obj))

  const rebuildTreesFromOrder = (order: TalentOrderItem[]): Tree[] => {
    const clone = deepClone(baseTreesRef.current)

    const rankCount: Record<string, number> = Object.create(null)

    for (const item of order) {
      const targetName = item.name
      rankCount[targetName] = (rankCount[targetName] ?? 0) + 1
      const desiredRank = rankCount[targetName]

      const { tree, talent } = findTalentByName(clone, targetName) ?? {}
      if (!tree || !talent) continue

      // Apply ranks up to desiredRank (respecting maxPoints)
      const newPoints = Math.min(desiredRank, talent.maxPoints)
      talent.points = newPoints
    }

    return clone
  }

  const findTalentByName = (
    treesArr: Tree[],
    name: string
  ): { tree: Tree; talent: Talent } | undefined => {
    for (const tree of treesArr) {
      const talent = tree.talents.find(t => t.name === name)
      if (talent) return { tree, talent }
    }
    return undefined
  }

  // ---- reset ---------------------------------------------------------------
  const resetTree = (idx: number) => {
    setTalentSpendOrder(prev => {
      const base = baseTreesRef.current
      const namesInTree = new Set(base[idx].talents.map(t => t.name))
      const next = prev.filter(item => !namesInTree.has(item.name))
      const rebuilt = rebuildTreesFromOrder(next)
      setTrees(rebuilt)
      updateUrl(rebuilt, next)
      return next
    })
  }

  const resetAll = async () => {
    try {
      const talentData = await loadTalentData(selectedClass)
      const fresh = deepClone(talentData)
      baseTreesRef.current = fresh
      setTalentSpendOrder([])
      const resetTrees = deepClone(baseTreesRef.current)
      setTrees(resetTrees)
      updateUrl(resetTrees, [])
    } catch (err) {
      setError(`Failed to reset: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  // ---- modify (order-first) -----------------------------------------------
  const modify = (
    treeIdx: number,
    talentId: string,
    e: React.MouseEvent | { shiftKey: boolean; type: string }
  ) => {
    const isDecrement = e.shiftKey || e.type === 'contextmenu'
  
    const targetTalent = trees[treeIdx].talents.find(t => t.id === talentId)
    if (!targetTalent) return
  
    const targetName = targetTalent.name
  
    setTalentSpendOrder(prevOrder => {
      const nextOrder = [...prevOrder]
  
      if (isDecrement) {
        // Check if it is safe to decrement this talent
        const safeToDecrement = canSafelyDecrementTalent(targetTalent, trees[treeIdx].talents)
        if (!safeToDecrement) {
          // Disallow decrement if it breaks requirements
          return prevOrder
        }
  
        // Find the last occurrence of this talent in the order array to remove
        const lastIdx = [...nextOrder]
          .map((item, i) => ({ item, i }))
          .reverse()
          .find(x => x.item.name === targetName)?.i
  
        if (lastIdx != null) {
          nextOrder.splice(lastIdx, 1)
        }
      } else {
        const pointsSpent = totalPointsSpent
        const locked = isTalentLocked(targetTalent, trees[treeIdx].talents, pointsSpent)
  
        if (!canIncrementTalent(targetTalent, pointsRemaining, locked)) {
          // Can't increment due to lock or no points remaining
          return prevOrder
        }
  
        const newRank = nextOrder.filter(o => o.name === targetName).length + 1
        nextOrder.push({ name: targetName, rank: newRank, icon: targetTalent.icon })
      }
  
      const rebuilt = rebuildTreesFromOrder(nextOrder)
      setTrees(rebuilt)
      updateUrl(rebuilt, nextOrder)
  
      return nextOrder
    })
  }
  

  return {
    trees,
    error,
    currentLevel,
    totalPointsSpent,
    totalTalentPoints,
    pointsRemaining,
    pointsSpentPerTree,
    primaryTree,
    talentSpendOrder,
    cumulativePointsByLevel,
    pointsByLevel,
    modify,
    resetTree,
    resetAll,
    setSelectedClass,
    updateUrl, // exposed for external class-change triggers
  }
}
