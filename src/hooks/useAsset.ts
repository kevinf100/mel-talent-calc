import { useState, useEffect } from 'react'
import { loadAsset } from '../assetsLoader'

export const useAsset = (relativePath: string) => {
  const [url, setUrl] = useState<string>('')

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      if (!relativePath) return ''
      const assetUrl = await loadAsset(relativePath)
      if (!cancelled) {
        setUrl(assetUrl)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [relativePath])

  return url
}
