import { type ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

export type TLayoutProps = {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  sidebar?: ReactNode
}

export const Layout = ({
  children,
  header,
  footer,
  sidebar,
}: TLayoutProps) => {
  return (
    <div className='bg-[#13191b] no-flicker'>
      <div
        className='min-h-screen flex flex-col overflow-x-hidden sm:max-w-screen-3xl sm:mx-auto w-full smooth-mount'
        style={{
          boxShadow:
            'rgba(11, 6, 4, 0.8) 0px 0px 50px, rgba(11, 6, 4, 0.6) 0px 0px 100px, rgba(11, 6, 4, 0.3) 0px 0px 500px',
        }}
      >
        {/* Optional header */}
        {header && (
          <header className='w-full bg-[#13191b] bg-gradient-to-r from-neutral-900 mb-2'>
            {header}
          </header>
        )}

        <main className='flex-1 w-full'>
          <div className='flex w-full items-start gap-4 bg-[#13191b] bg-gradient-to-r from-neutral-900 '>
            {/* Sidebar (if provided) */}
            {sidebar && (
              <aside className='w-64 shrink-0'>
                {sidebar}
              </aside>
            )}

            {/* Main content area */}
            <div className='flex-1 overflow-x-auto'>
              {children}
            </div>
          </div>
        </main>

        {/* Optional footer */}
        {footer && (
          <footer className='w-full'>
            {footer}
          </footer>
        )}

        <Toaster
          position='top-center'
          toastOptions={{
            className: 'pointer-events-auto',
          }}
        />
      </div>
    </div>
  )
}
