
type MetalBordersProps = {
    children: React.ReactNode
  }
  
  export const MetalBorders = ({
    children,
  }: MetalBordersProps) => {
    return (<div className="relative w-full h-full bg-transparent">
        {/* Border pieces */}
        <div className="absolute w-[66px] h-[61px] top-0 left-0 corner top-left" />
        <div className="absolute w-[66px] h-[61px] top-0 right-0 corner top-right" />
        <div className="absolute w-[66px] h-[60px] bottom-0 left-0 corner bottom-left" />
        <div className="absolute w-[66px] h-[60px] bottom-0 right-0 corner bottom-right" />
      
        <div className="absolute h-[42px] bottom-0 left-[66px] w-[calc(100%-132px)] edge top" />
        <div className="absolute h-[42px] top-0 left-[66px] w-[calc(100%-132px)] edge bottom" />
      
        <div className="absolute top-[61px] left-[6px] w-[23px] h-[calc(100%-121px)] edge left" />
        <div className="absolute top-[61px] right-[6px] w-[23px] h-[calc(100%-121px)] edge right" />
      
        {/* Content fits inside with padding */}
        <div className=" top-[20px] left-[20px] right-[20px] bottom-[20px] p-4">
          {children}
        </div>
      </div>);
  };
  