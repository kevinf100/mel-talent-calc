import toast from 'react-hot-toast'
import { MetalBordersSmall } from '../components/MetalBordersSmall'

export const showCopyToast = () =>
  toast.custom(() => (
    <div className='w-[400px] h-auto'>
      <MetalBordersSmall>
        <div className='bg-[#2a2a2af7] p-3 text-sm shadow-lg' style={{
          boxShadow: 'rgb(63 199 255 / 32%) 0px 10px 20px 20px'
        }}>
          Link copied!
        </div>{' '}
      </MetalBordersSmall>
    </div>
  ))
