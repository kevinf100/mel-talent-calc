import { useClassCrest } from '../hooks/useClassCrest';
import type { ClassName } from '../core/types';

const ClassCrest = ({ selectedClass }: { selectedClass: ClassName }) => {
  const { large, small } = useClassCrest(selectedClass);

  return (
    <picture
      className="
        absolute z-0 sm:opacity-50 opacity-40 pointer-events-none fade-mask
        
        w-[565px] h-[665px]             /* default size (desktop) */
        right-[-30%] top-[15%]
        sm:right-[-10%] sm:top-[10%]
        md:right-0 md:top-0
        [@media(min-width:994px)]:top-[-100px]

        /* For mobile ≤450px: smaller size & reposition */
        [@media(max-width:403px)]:w-[280px]
        [@media(max-width:403px)]:h-[330px]
        [@media(max-width:403px)]:top-[220px]
        [@media(max-width:403px)]:right-[-20%]
        [@media(max-width:403px)]:scale-125
        [@media(max-width:403px)]:opacity-33
      "
    >
      <source
        srcSet={`${small} 1x, ${large} 2x`}
        media="(max-width: 403px)"
        type="image/webp"
      />
      <img
        src={large}
        alt={`${selectedClass} crest`}
        width={565}
        height={665}
        className="w-full h-full object-contain"
        decoding="async"
        loading="eager" // or lazy if offscreen
      />
    </picture>
  );
};

export default ClassCrest;
