const assets = import.meta.glob('./assets/**/*.{png,webp}', { query: 'url' })

export const loadAsset = async (input: string): Promise<string> => {
  // 1. Remove 'src/' prefix if present
  let cleanInput = input.startsWith('src/') ? input.slice(4) : input

  // 2. Remove leading './' if present
  if (cleanInput.startsWith('./')) {
    cleanInput = cleanInput.slice(2)
  }

  // 3. If input is bare filename (no slash), default to icons folder
  let path: string
  if (!cleanInput.includes('/')) {
    path = `./assets/icons-webp/${cleanInput}`
  } else if (cleanInput.startsWith('assets/')) {
    // If it already starts with assets/, just add './' for glob key
    path = `./${cleanInput}`
  } else {
    // Otherwise, prepend assets/
    path = `./assets/${cleanInput}`
  }

  const loader = assets[path]

  if (!loader) {
    console.warn(`Asset not found: ${input} (normalized to ${path})`)
    return ''
  }

  const mod = await loader() as { default: string }
  return mod.default
}
