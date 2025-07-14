import { type ReactNode } from 'react'

export type TLayoutProps = {
  children: ReactNode
}

export const Layout = (
  layoutProps: TLayoutProps
) => {
  const { children } = layoutProps

  return (
    <div className='min-h-screen flex flex-col items-center bg-gray-100'>
      <header className='w-full bg-white p-4 shadow'>
        Header
      </header>

      <main className='w-full flex-1 flex justify-center px-4'>
        <div className='w-full max-w-screen-xl'>
          {children}
        </div>
      </main>

      <footer className='w-full bg-white p-4 shadow'>
        Footer
      </footer>
    </div>
  )
}

export const Scroller = () => {
  return (
    <div className='overflow-x-auto w-full snap-x snap-mandatory'>
      <div className='inline-flex min-w-max space-x-4 bg-yellow-100 p-4'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className='snap-start flex-shrink-0 w-[320px] h-[400px] bg-blue-300 rounded shadow-md flex items-center justify-center text-white text-xl font-bold'
          >
            Tree {i + 1}
          </div>
        ))}
      </div>
    </div>
  )
}
