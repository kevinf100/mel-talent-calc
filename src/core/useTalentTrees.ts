import { useState } from 'react'
import type { Tree } from './types'
import {
  treeGatingValid,
  meetsDependencies,
  requiredForTier,
} from './talentUtils'
import { initialTalentTrees } from './talentData'

export const useTalentTrees = () => {
  const [trees, setTrees] = useState<Tree[]>(
    initialTalentTrees
  )

  const resetTree = (idx: number) => {
    setTrees(p => {
      const c = [...p]
      c[idx] = {
        ...c[idx],
        talents: c[idx].talents.map(t => ({
          ...t,
          points: 0,
        })),
      }
      return c
    })
  }

  const resetAll = () => {
    setTrees(
      JSON.parse(
        JSON.stringify(initialTalentTrees)
      )
    )
  }

  const modify = (
    treeIdx: number,
    talentId: string,
    e: React.MouseEvent
  ) => {
    setTrees(prev => {
      const copy = [...prev]
      const talents = copy[treeIdx].talents.map(
        t => ({ ...t })
      )
      const target = talents.find(
        t => t.id === talentId
      )
      if (!target) return prev

      const total = talents.reduce(
        (s, t) => s + t.points,
        0
      )
      const locked =
        total < requiredForTier(target.row) ||
        !meetsDependencies(target, talents)

      if (
        e.shiftKey ||
        e.type === 'contextmenu'
      ) {
        const hasDependents = talents.some(
          t =>
            t.requires?.id === target.id &&
            t.points > t.requires.points
        )

        if (target.points > 0 && !hasDependents) {
          target.points -= 1
          if (!treeGatingValid(talents))
            target.points += 1
        }
      } else if (
        target.points < target.maxPoints &&
        !locked
      ) {
        target.points += 1
      }

      copy[treeIdx] = {
        ...copy[treeIdx],
        talents,
      }
      return copy
    })
  }

  return { trees, modify, resetTree, resetAll }
}
