type TGlobalPointsSummaryProps = {
  trees: { talents: { points: number }[] }[]
  levelCap?: number
}

export const GlobalPointsSummary = (globalPointsSummaryProps: TGlobalPointsSummaryProps) => {
  const { trees, levelCap = 61 } = globalPointsSummaryProps;

  const total = trees.reduce((sum, t) => sum + t.talents.reduce((s, talent) => s + talent.points, 0), 0)
  const remaining = Math.max(0, levelCap - total)

  return (
    <div className="mb-4 text-sm text-ink flex justify-between items-center bg-parchment p-2 rounded shadow">
      <div>
        <strong>Total Points Spent:</strong> {total} / {levelCap}
      </div>
      <div>
        <strong>Points Remaining:</strong> {remaining}
      </div>
    </div>
  )
}