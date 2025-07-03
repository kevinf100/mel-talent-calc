import { TalentTree } from './TalentTree';
import { GlobalPointsSummary } from './GlobalPointsSummary';
import { useTalentTrees } from '../core/useTalentTrees';
import { TalentTreeScroller } from './TalentTreeScroller';

export const TalentGrid = () => {
  const { trees, modify, resetTree, resetAll, totalTalentPoints, totalPointsSpent, pointsRemaining } = useTalentTrees();

  return (
    <div className="space-y-4 sm:max-w-screen-xl sm:mx-auto w-full">
      <GlobalPointsSummary totalTalentPoints={totalTalentPoints} totalPointsSpent={totalPointsSpent} pointsRemaining={pointsRemaining} />

      <div className="flex justify-end">
        <button
          onClick={resetAll}
          className="px-3 py-2 bg-gold text-parchment rounded shadow hover:bg-gold/90 transition"
        >
          Reset All
        </button>
      </div>

      <TalentTreeScroller
        trees={trees.map((tree, i) => (
          <TalentTree 
            pointsRemaining={pointsRemaining}
            key={tree.name}
            name={tree.name}
            talents={tree.talents}
            onClickTalent={(id, e) => modify(i, id, e)}
            onResetTree={() => resetTree(i)}
          />
        ))}
      />
    </div>
  );
};

