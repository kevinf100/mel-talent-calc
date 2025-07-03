export type TTalentTreeScrollerProps = {
  trees: React.ReactNode[]
}

export const TalentTreeScroller = ({
  trees,
}: {
  trees: React.ReactNode[]
}) => {
  return (
    <div className='w-full overflow-x-auto snap-x snap-mandatory scroll-smooth relative'>
      <div className='flex min-w-full md:justify-between md:space-x-0 md:min-w-0 md:flex-nowrap'>
        {trees.map((tree, index) => (
          <div
            key={index}
            className='snap-center md:snap-start flex-shrink-0 w-full md:w-auto md:flex-1 md:max-w-[33.33%]'
          >
            {tree}
          </div>
        ))}
      </div>
    </div>
  )
}
