import { useState, useEffect } from 'react'
import { useAsset } from './useAsset'

interface OptimizedImageOptions {
  /**
   * Base image path (without query params)
   */
  imagePath: string
  
  /**
   * Mobile image options (width, quality, etc.)
   * @default 'format=avif&quality=70&w=400&imagetools'
   */
  mobileQuery?: string
  
  /**
   * Desktop image options (width, quality, etc.)
   * @default 'format=avif&quality=70&w=800&imagetools'
   */
  desktopQuery?: string
  
  /**
   * Mobile breakpoint in pixels
   * @default 768
   */
  mobileBreakpoint?: number
  
  /**
   * CSS fallback background for LCP optimization
   * Can be a gradient, solid color, or any valid CSS background value
   */
  fallbackBackground?: string
  
  /**
   * Opacity for the fallback background
   * @default 0.7
   */
  fallbackOpacity?: number
}

interface OptimizedImageResult {
  /**
   * Current optimized image URL (mobile or desktop)
   */
  imageUrl: string | undefined
  
  /**
   * Whether the image has finished loading
   */
  isLoaded: boolean
  
  /**
   * Whether we're on mobile (useful for conditional rendering)
   */
  isMobile: boolean
  
  /**
   * CSS styles for the fallback background
   */
  fallbackStyles: React.CSSProperties
  
  /**
   * CSS styles for the main image background
   */
  imageStyles: React.CSSProperties
}

/**
 * Hook for loading optimized responsive images with LCP fallback support
 * 
 * @example
 * ```tsx
 * const { imageUrl, isLoaded, fallbackStyles, imageStyles } = useOptimizedImage({
 *   imagePath: 'ui/parchment-sprite-bg.webp',
 *   fallbackBackground: 'linear-gradient(135deg, #f4e9d1 0%, #e8d5b7 50%, #d4c2a1 100%)'
 * })
 * 
 * return (
 *   <div className="relative">
 *     {!isLoaded && <div style={fallbackStyles} />}
 *     <div style={imageStyles} />
 *   </div>
 * )
 * ```
 */
export const useOptimizedImage = ({
  imagePath,
  mobileQuery = 'format=avif&quality=70&w=400&imagetools',
  desktopQuery = 'format=avif&quality=70&w=800&imagetools',
  mobileBreakpoint = 768,
  fallbackBackground,
  fallbackOpacity = 0.7
}: OptimizedImageOptions): OptimizedImageResult => {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Handle responsive breakpoint
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= mobileBreakpoint)
    }
    
    // Set initial state
    handleResize()
    
    // Listen for resize events
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileBreakpoint])
  
  // Load optimized images
  const mobileImageUrl = useAsset(`${imagePath}?${mobileQuery}`)
  const desktopImageUrl = useAsset(`${imagePath}?${desktopQuery}`)
  
  const currentImageUrl = isMobile ? mobileImageUrl : desktopImageUrl
  
  // Preload and track image loading
  useEffect(() => {
    if (currentImageUrl) {
      // Check if image is already cached
      const img = new Image()
      const handleLoad = () => {
        setIsLoaded(true)
      }
      
      img.onload = handleLoad
      img.onerror = handleLoad // Still hide fallback on error
      img.src = currentImageUrl
      
      // If image is already complete (cached), fire load immediately
      if (img.complete) {
        handleLoad()
      }
    }
  }, [currentImageUrl])
  
  const fallbackStyles: React.CSSProperties = {
    background: fallbackBackground,
    opacity: fallbackOpacity,
    position: 'absolute',
    inset: 0,
    zIndex: 0,
  }
  
  const imageStyles: React.CSSProperties = {
    backgroundImage: currentImageUrl ? `url(${currentImageUrl})` : undefined,
    backgroundRepeat: 'repeat',
    backgroundClip: 'content-box',
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 300ms ease',
    position: 'absolute',
    inset: 0,
    zIndex: 0,
  }
  
  return {
    imageUrl: currentImageUrl,
    isLoaded,
    isMobile,
    fallbackStyles,
    imageStyles
  }
}
