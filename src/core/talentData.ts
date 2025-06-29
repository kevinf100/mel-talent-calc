import type { Tree } from './types'
import { makeTalents } from './talentUtils'

export const initialTalentTrees: Tree[] = [
  {
    name: 'Fury',
    talents: [
      // Tier‑0
      {
        id: 'flurry',
        label: 'Flurry',
        description: 'Increases attack speed',
        row: 0,
        points: 0,
        maxPoints: 5,
        col: 0,
      },
      {
        id: 'abominations-fury',
        label: 'Abominations Fury',
        description: 'Increases attack power',
        row: 0,
        points: 0,
        maxPoints: 5,
        col: 1,
      },
      {
        id: 'booming-voice',
        label: 'Booming Voice',
        description: 'Increases shout duration',
        row: 0,
        points: 0,
        maxPoints: 5,
        col: 2,
      },
      // Tier‑1 with dependencies
      {
        id: 'unending-rage',
        label: 'Unending Rage',
        description:
          'Requires 5 points in Flurry',
        row: 1,
        points: 0,
        maxPoints: 3,
        requires: { id: 'flurry', points: 5 },
        col: 0,
      },
      {
        id: 'big-dick',
        label: 'Big Dick',
        description:
          'Increases attack power',
        row: 1,
        points: 0,
        maxPoints: 5,
        col: 1,
      },
      // Tier‑2
      {
        id: 'bloodthirst',
        label: 'Bloodthirst',
        description:
          'Requires 5 points in Abominations Fury',
        row: 2,
        points: 0,
        maxPoints: 1,
        requires: { id: 'abominations-fury', points: 5 },
        col: 1,
      },
      {
        id: 'satana',
        label: 'Satan',
        description:
          'Increases attack power',
        row: 2,
        points: 0,
        maxPoints: 5,
        col: 2,
      },
      ...makeTalents('fury', 3, 2, 4),
    ],
  },
  {
    name: 'Arms',
    talents: makeTalents('arms', 0, 7, 4),
  },
  {
    name: 'Protection',
    talents: makeTalents('prot', 0, 7, 4),
  },
]
