import { useState, useMemo } from 'react'
import type { ClassName, Tree } from './types'
import {
  canIncrementTalent,
  canSafelyDecrementTalent,
  isTalentLocked,
} from './talentUtils'
import { talentData } from './data/talentData'

const TOTAL_TALENT_POINTS = 51;

export const useTalentTrees = () => {
  const [selectedClass, setSelectedClass] = useState<ClassName>('warrior');
  const [trees, setTrees] = useState<Tree[]>(talentData[selectedClass]);

  const totalPointsSpent = useMemo(() => {
    return trees.reduce((sum, tree) => sum + tree.talents.reduce((s, talent) => s + talent.points, 0), 0);
  }, [trees]);

  const pointsRemaining = useMemo(() => {
    return Math.max(0, TOTAL_TALENT_POINTS - totalPointsSpent);
  }, [totalPointsSpent]);

  const resetTree = (idx: number) => {
    setTrees(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], talents: copy[idx].talents.map(t => ({ ...t, points: 0 })) };
      return copy;
    });
  };

  const resetAll = () => {
    setTrees(JSON.parse(JSON.stringify(talentData[selectedClass])));
  };

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
    setSelectedClass, // Add to allow class switching
  };
};