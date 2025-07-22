import HeaderBg from '../assets/images/header-bg.webp'
import EpochLogo from '../assets/images/full-logo.webp'

export function Header() {
  return (
    <div>
      {/* Top Bar */}
      <div className="w-[85%] mx-auto h-[90px] flex items-center justify-center sm:justify-start px-4">
        <a href="https://www.project-epoch.net/" target="_blank" rel="noopener noreferrer" className="flex p-4">
          <img src={EpochLogo} alt="Epoch Logo" className="flex h-12 w-auto" style={{ filter: 'drop-shadow(2px 4px 6px black)'}}/>
        </a>
      </div>

      {/* Header Banner */}
      <div
        className="w-full h-[200px] relative flex items-center justify-center overflow-hidden"
        style={{
          borderTop: '3px solid #fffff',
          boxShadow: 'inset 0 0 8px rgba(0, 0, 0, 0.36), 0px 0px 20px 10px rgba(0, 0, 0, 0.36)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '#2b2b2b',
          borderLeft: 0,
          borderRight: 0,
          filter: 'drop-shadow(2px 4px 6px black)'
        }}
      >
        {/* LCP Background Image */}
        <img 
          src={HeaderBg} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover z-0"
          fetchPriority="high"
          loading="eager"
        />
        {/* Content */}
        <h1 className="relative z-10 text-5xl sm:text-7xl text-gold-text">
          Talent Calculator
        </h1>
      </div>
    </div>
  )
}
