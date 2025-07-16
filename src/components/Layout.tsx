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
    <div className='min-h-screen flex flex-col bg-gray-100 text-base overflow-x-hidden'>
      {/* Optional header */}
      {header && (
        <header className='w-full'>
          {header}
        </header>
      )}

      <main className='flex-1 w-full'>
        <div className='flex w-full items-start gap-4 bg-[#13191b]'>
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
          duration: 99999999,
          className: 'pointer-events-auto',
        }}
      />
    </div>
  )
}
