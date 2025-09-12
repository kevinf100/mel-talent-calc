import EpochLogoDesktop from '../assets/images/full-logo.webp?w=185&h=48&quality=70&imagetools'
import EpochLogoMobile from '../assets/images/full-logo.webp?w=370&h=96&quality=70&imagetools'

export function Header() {
  return (
    <div>
      {' '}
      {/* React header - shows after critical version is hidden */}
      {/* Top Bar */}
      <div className='w-[85%] mx-auto h-[90px] flex items-center justify-center [@media(min-width:640px)]:!justify-start px-4 [@media(min-width:640px)]:px-0'>
        <a
          href='https://ascension.gg/'
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
    </div>
  )
}
