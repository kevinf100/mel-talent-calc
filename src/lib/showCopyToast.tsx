import toast from 'react-hot-toast'
import { MetalBordersSmall } from '../components/MetalBordersSmall'
import SuccessIcon from '../assets/icons/success_icon.webp?w=64&h=64&imagetools'

export const showCopyToast = () =>
  toast.custom(() => (
    <div className='w-[550px] h-auto'>
      <MetalBordersSmall>
        <div
          className='flex bg-[#2a2a2af7] justify-between px-6 py-3 pt-4 sm:pt-3 text-3xl sm:text-4xl text-green-400'
          style={{
            boxShadow:
              'rgb(0 0 0 / 90%) 0px 10px 20px 20px',
          }}
        >
          <h1 className='flex self-center'>
            Link copied to clipboard!
          </h1>

          <div
            className='w-16 h-16 rounded-full flex-shrink-0 z-30'
            style={{
              filter:
                'drop-shadow(0 0 20px var(--color-green-400))',
              boxShadow:
                '0px 0px 20px 0px oklch(0.78 0.32 147.09 / 0.5)',
            }}
          >
            <div
              className='w-full h-full rounded-full'
              style={{
                backgroundImage: `url(${SuccessIcon})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                mask: 'radial-gradient(circle, black 55%, transparent 73%)',
                WebkitMask:
                  'radial-gradient(circle, black 55%, transparent 73%)',
              }}
            />
          </div>
        </div>
      </MetalBordersSmall>
    </div>
  ), { duration: 2_500, position: 'top-center' })
