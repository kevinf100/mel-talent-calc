import type { CLASS_NAMES } from './constants'

export type Talent = {
  id: string
  name: string
  ranks: string[]
  spellIds: string[]
  row: number
  col: number
  points: number
  maxPoints: number
  icon: string
  requires?: { id: string; points: number }
  abilityData?: {
    leftSide?: string[]
    rightSide?: string[]
    bottom?: string[]
  }
}

export type Tree = {
  name: string
  talents: Talent[]
  backgroundImage: string
  specIcon: string
}

export type TalentOrderItem = {
  name: string
  rank: number
  icon: string
  description: string
  abilityData?: Talent['abilityData']
}

export type ClassName =
  (typeof CLASS_NAMES)[number]

export type TalentData = {
  [key in ClassName]: Tree[]
}
