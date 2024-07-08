import { ComponentProps, forwardRef, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export const RootLayout = ({ children, className, ...props }: ComponentProps<'main'>) => {
  return (
    <main className={twMerge('flex flex-row h-screen', className)} {...props}>
      {children}
    </main>
  )
}

export const Sidebar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  const [width, setWidth] = useState(250)
  const isResizing = useRef(false)

  const handleMouseDown = () => {
    isResizing.current = true
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing.current) {
      const newWidth = e.clientX
      if (newWidth >= 200 && newWidth <= 500) {
        setWidth(newWidth)
      }
    }
  }

  const handleMouseUp = () => {
    isResizing.current = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  useEffect(() => {
    // cleanup if the component is unmounted (?)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div style={{ display: 'flex' }}>
      <aside
        className={twMerge('mt-10 h-[100vh + 10px] overflow-auto', className)}
        style={{ width }}
        {...props}
      >
        {children}
      </aside>
      <div
        onMouseDown={handleMouseDown}
        style={{
          width: '10px',
          cursor: 'col-resize',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          height: '100vh'
        }}
      />
    </div>
  )
}

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={twMerge('flex-1 overflow-auto', className)} {...props}>
      {children}
    </div>
  )
)

Content.displayName = 'Content'
