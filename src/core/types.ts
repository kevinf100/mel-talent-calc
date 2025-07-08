export type Talent = {
  id: string
  name: string
  ranks: string[]
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

export type ClassName =
  | 'warrior'
  | 'paladin'
  | 'hunter'
  | 'rogue'
  | 'priest'
  | 'shaman'
  | 'mage'
  | 'warlock'


export type TalentData = {
  [key in ClassName]: Tree[]
}
