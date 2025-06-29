export type Talent = {
    id: string
    label: string
    description: string
    row: number
    col: number
    points: number
    maxPoints: number
    requires?: { id: string; points: number }
  }
  
  export type Tree = {
    name: string
    talents: Talent[]
  }