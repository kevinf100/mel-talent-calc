import type { Tree } from "../core/types"

// 🔒 Encode build as binary Base64
export const encodeTalentBuild = (trees: Tree[]): string => {
  const bytes: number[] = []

  let cumulative = 0
  trees.forEach(tree => {
    tree.talents.forEach((talent, index) => {
      if (talent.points > 0) {
        bytes.push(cumulative + index, talent.points)
      }
    })
    cumulative += tree.talents.length
  })

  const binary = String.fromCharCode(...bytes)
  return btoa(binary)
}

// 🔓 Decode Base64 back into talent pairs
export const decodeTalentBuild = (data: string): [number, number][] => {
  try {
    const binary = atob(data)
    const bytes = Array.from(binary).map(char => char.charCodeAt(0))

    const result: [number, number][] = []
    for (let i = 0; i < bytes.length; i += 2) {
      result.push([bytes[i], bytes[i + 1]])
    }

    return result
  } catch {
    return []
  }
}