import toast from 'react-hot-toast'
import { MetalBordersSmall } from '../components/MetalBordersSmall'
import ArcaneIntellectIcon from '../assets/icons/spell_holy_magicalsentry.webp?w=57&h=57&imagetools'

export const showNewVersionToast = () =>
  toast.custom(
    ({ id }) => (
      <div
        className='w-[550px] h-auto cursor-pointer'
        onDoubleClick={() => toast.dismiss(id)}
      >
        <MetalBordersSmall>
          <div
            className='flex flex-col bg-[#2a2a2af7] px-6 py-4 text-green-400'
            style={{
              boxShadow: 'rgb(0 0 0 / 90%) 0px 10px 20px 20px',
            }}
          >
            {/* Only this section has the gap */}
            <div className="flex flex-col gap-4">
              <div className='flex items-start gap-4'>
                <div
                  className='w-[57px] h-[57px] rounded-full flex-shrink-0 z-30'
                  style={{
                    filter: 'drop-shadow(0 0 15px oklch(0.53 0.23 257.42))',
                    boxShadow: '0px 0px 20px 5px #199cffab',
                  }}
                >
                  <div
                    className='w-full h-full rounded-full'
                    style={{
                      backgroundImage: `url(${ArcaneIntellectIcon})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      mask: 'radial-gradient(circle, black 55%, transparent 73%)',
                      WebkitMask: 'radial-gradient(circle, black 55%, transparent 73%)',
                    }}
                  />
                </div>
                <h1 className='text-2xl sm:text-3xl text-gold-text self-center'>
                  New Version Released!
                </h1>
              </div>

              <p className='text-base sm:text-lg text-white leading-snug'>
                The site has been updated with a new URL structure for sharing
                talent builds. Old links like the one you used are no longer
                supported. Please create a new build. This version also includes{' '}
                <i>Talent Order tracking</i>, which can be found below the Talent Trees.
              </p>
            </div>
            <p className='text-gray-400 italic sm:hidden block mt-2'>
              (Double tap to dismiss)
            </p>
            <p className='text-gray-400 italic sm:block hidden mt-2'>
              (Double click to dismiss)
            </p>
          </div>
        </MetalBordersSmall>
      </div>
    ),
    {
      duration: 10_000,
      position: 'bottom-left',
    }
  )
