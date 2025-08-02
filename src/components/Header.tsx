import { useState, useEffect } from 'react'

// Responsive header background images - improved quality
import HeaderBgMobile from '../assets/images/header-bg.webp?w=1000&h=400&quality=85&position=left&imagetools'
import HeaderBgTablet from '../assets/images/header-bg.webp?w=1400&h=350&quality=88&imagetools'
import HeaderBgDesktop from '../assets/images/header-bg.webp'
import HeaderBgBlur from '../assets/images/header-bg.webp?w=40&h=20&blur=5&quality=30&imagetools'
import EpochLogoMobile from '../assets/images/full-logo.webp?w=370&h=96&quality=70&imagetools'
import EpochLogoDesktop from '../assets/images/full-logo.webp?w=185&h=48&quality=70&imagetools'

export function Header() {
  const [imageLoaded, setImageLoaded] =
    useState(false)
  const [fontsLoaded, setFontsLoaded] =
    useState(false)

  // Check if fonts are loaded
  useEffect(() => {
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        setFontsLoaded(true)
      })
    } else {
      // Fallback for browsers without Font Loading API
      setTimeout(() => setFontsLoaded(true), 100)
    }
  }, [])

  // Preload the appropriate image based on screen size
  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new Image()
      img.onload = () => setImageLoaded(true)
      img.src = src
    }

    // Determine which image to preload based on viewport
    const mediaQuery = window.matchMedia(
      '(max-width: 640px)'
    )
    if (mediaQuery.matches) {
      preloadImage(HeaderBgMobile)
    } else if (
      window.matchMedia('(max-width: 1024px)')
        .matches
    ) {
      preloadImage(HeaderBgTablet)
    } else {
      preloadImage(HeaderBgDesktop)
    }
  }, [])

  return (
    <div>
      {' '}
      {/* React header - shows after critical version is hidden */}
      {/* Top Bar */}
      <div className='w-[85%] mx-auto h-[90px] flex items-center justify-center [@media(min-width:640px)]:!justify-start px-4 [@media(min-width:640px)]:px-0'>
        <a
          href='https://www.project-epoch.net/'
          target='_blank'
          rel='noopener noreferrer'
          className='flex p-4 [@media(min-width:640px)]:p-0'
        >
          <img
            src={EpochLogoDesktop}
            srcSet={`${EpochLogoMobile} 370w, ${EpochLogoDesktop} 185w`}
            sizes='(max-width: 768px) 370px, 185px'
            alt='Epoch Logo'
            className='flex h-12 w-auto'
            style={{
              filter:
                'drop-shadow(2px 4px 6px black)',
            }}
            width='185'
            height='48'
          />
        </a>
      </div>
      {/* Header Banner */}
      <div
        className='w-full h-[150px] md:h-[200px] relative flex items-center justify-center overflow-hidden'
        style={{
          borderTop: '3px solid #fffff',
          boxShadow:
            'inset 0 0 8px rgba(0, 0, 0, 0.36), 0px 0px 20px 10px rgba(0, 0, 0, 0.36)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '#2b2b2b',
          borderLeft: 0,
          borderRight: 0,
          filter:
            'drop-shadow(2px 4px 6px black)',
        }}
      >
        {/* Multi-layer progressive loading strategy */}
        {/* 1. Immediate CSS gradient background */}
        <div
          className='absolute inset-0 w-full h-full z-0'
          style={{
            background:
              'radial-gradient(ellipse at center, #2a2017 0%, #1a1510 50%, #0a0805 100%)',
          }}
        />

        {/* 2. Small blur placeholder (loads very fast) */}
        <div
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500 z-0 ${
            imageLoaded
              ? 'opacity-0'
              : 'opacity-100'
          }`}
          style={{
            backgroundImage: `url(${HeaderBgBlur})`,
            filter: 'blur(3px)',
            transform: 'scale(1.05)',
            willChange: 'opacity',
          }}
        />

        {/* Responsive LCP Background Image */}
        <picture>
          <source
            media='(max-width: 640px)'
            srcSet={HeaderBgMobile}
            type='image/webp'
          />
          <source
            media='(max-width: 1024px)'
            srcSet={HeaderBgTablet}
            type='image/webp'
          />
          <img
            src={HeaderBgDesktop}
            alt='Fantasy game background for talent calculator header'
            className={`header-bg-img object-cover absolute inset-0 w-full h-full  transition-opacity duration-500 z-10 ${
              imageLoaded
                ? 'opacity-100'
                : 'opacity-0'
            }`}
            fetchPriority='high'
            loading='eager'
            decoding='async'
            width='1200'
            height='200'
            onLoad={() => setImageLoaded(true)}
            style={{ willChange: 'opacity' }}
          />
        </picture>
        {/* Content - Use critical CSS classes for immediate render */}
        <h1
          className={`critical-h1 ${fontsLoaded ? '' : 'font-loading'}`}
        >
          Talent Calculator
        </h1>
      </div>
    </div>
  )
}
