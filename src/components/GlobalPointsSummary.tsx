export const GlobalPointsSummary = ({
  totalTalentPoints,
  totalPointsSpent,
  pointsRemaining,
}: {
  totalTalentPoints: number
  totalPointsSpent: number
  pointsRemaining: number
}) => {
  return (
    <div className='mb-4 text-sm text-ink flex justify-between items-center bg-parchment p-2 rounded shadow'>
      <div>
        <strong>Total Points Spent:</strong>{' '}
        {totalPointsSpent} / {totalTalentPoints}
      </div>
      <div>
        <strong>Points Remaining:</strong>{' '}
        {pointsRemaining}
      </div>
    </div>
  )
}
