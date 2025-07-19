import toast from 'react-hot-toast'
import { MetalBordersSmall } from '../components/MetalBordersSmall'
import SuccessIcon from '../assets/icons/success_icon.webp'


export const showCopyToast = () =>
  toast.custom(() => (
    <div className='w-[550px] h-auto'>
      <MetalBordersSmall>
        <div className='flex bg-[#2a2a2af7] justify-between px-6 py-3 pt-4 sm:pt-3 text-3xl sm:text-4xl text-green-400' style={{
          boxShadow: 'rgb(0 0 0 / 90%) 0px 10px 20px 20px'
        }}>
          <h1 className='flex self-center'>Link copied to clipboard!</h1>
          <img className='flex self-center z-[30] flex w-16 h-16 rounded-full' src={SuccessIcon} alt="Success" style={{
            filter: 'drop-shadow(0 0 20px var(--color-green-400))'
          }}/>
        </div>
      </MetalBordersSmall>
    </div>
  ))
