// High priority parchment background import for faster LCP
import ParchmentBgDesktop from '../assets/ui/parchment-sprite-bg.webp?w=800&q=85&imagetools'

type ParchmentBordersProps = {
  children: React.ReactNode
}

export const ParchmentBorders = ({
  children,
}: ParchmentBordersProps) => {
  return (
    <div className='relative w-full h-full md:min-h-[340px] min-h-[440px] parchment p-3'>
      {/* Critical LCP background is now in HTML for immediate rendering */}
      
      {/* Parchment background - visible and optimized */}
      <div 
        className='p-8 absolute inset-0'
        style={{
          backgroundImage: `url(${ParchmentBgDesktop})`,
          backgroundRepeat: 'repeat',
          backgroundClip: 'content-box',
          zIndex: 1
        }}
      />

      {/* Corners */}
      <div className='absolute w-[169px] h-[170px] top-0 left-0 corner top-left' />
      <div className='absolute w-[169px] h-[170px] top-0 right-0 corner top-right' />
      <div className='absolute w-[169px] h-[170px] bottom-0 left-0 corner bottom-left' />
      <div className='absolute w-[169px] h-[170px] bottom-0 right-0 corner bottom-right' />

      {/* Horizontal Edges */}
      <div className='absolute h-[170px] top-0 left-[169px] w-[calc(100%-338px)] edge top' />
      <div className='absolute h-[170px] bottom-0 left-[169px] w-[calc(100%-338px)] edge bottom' />

      {/* Vertical Edges */}
      <div className='absolute top-[170px] left-[3px] w-[169px] h-[calc(100%-340px)] edge left' />
      <div className='absolute top-[170px] right-[3px] w-[169px] h-[calc(100%-340px)] edge right' />

      {/* Content Area */}
      <div className='pt-12 p-6 sm:pb-8 sm:pt-14 sm:p-12 relative z-20 flex overflow-hidden'>
        {' '}
        {/* Higher z-index for content */}
        {children}
      </div>
    </div>
  )
}
