type MetalBordersSmallProps = {
  children: React.ReactNode
}

export const MetalBordersSmall = ({
  children,
}: MetalBordersSmallProps) => {
  return (
    <div className='relative w-full h-full bg-transparent'>
      {/* Border pieces */}
      <div className='absolute w-[33px] h-[30px] top-0 left-0 corner-sm top-left-sm' />
      <div className='absolute w-[33px] h-[30px] top-0 right-0 corner-sm top-right-sm' />
      <div className='absolute w-[33px] h-[30px] bottom-0 left-0 corner-sm bottom-left-sm' />
      <div className='absolute w-[33px] h-[30px] bottom-0 right-0 corner-sm bottom-right-sm' />

      <div className='absolute h-[21px] bottom-0 left-[33px] w-[calc(100%-66px)] edge-sm top-sm' />
      <div className='absolute h-[21px] top-0 left-[33px] w-[calc(100%-66px)] edge-sm bottom-sm' />

      <div className='absolute top-[30px] left-[4px] w-[12px] h-[calc(100%-60px)] edge-sm left-sm' />
      <div className='absolute top-[30px] right-[3px] w-[12px] h-[calc(100%-60px)] edge-sm right-sm' />

      {/* Content fits inside with padding */}
      <div className='top-[10px] left-[10px] right-[10px] bottom-[10px] p-2'>
        {children}
      </div>
    </div>
  )
}
