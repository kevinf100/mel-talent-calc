import HeaderBg from '../assets/images/header-bg.webp'
import EpochLogo from '../assets/images/full-logo.webp'

export function Header() {
  return (
    <div>
      {/* Top Bar */}
      <div className="w-full h-[90px] flex items-center justify-center sm:justify-start px-4">
        <a href="https://www.project-epoch.net/" target="_blank" rel="noopener noreferrer" className="flex p-4">
          <img src={EpochLogo} alt="Epoch Logo" className="flex h-12 w-auto" style={{ filter: 'drop-shadow(2px 4px 6px black)'}}/>
        </a>
      </div>

      {/* Header Banner */}
      <div
        className="w-full h-[200px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url('${HeaderBg}')`,
          borderTop: '3px solid #fffff',

        }}
      >
        <h1 className="text-5xl sm:text-7xl text-gold-text">
          Talent Calculator
        </h1>
      </div>
    </div>
  )
}
