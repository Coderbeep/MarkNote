import { useClickOutside } from '@renderer/hooks/useClickOutside'
import { useRef } from 'react'

export const ContextMenu = ({ items, position, onClose }) => {
  const ref = useRef(null)
  
  useClickOutside(ref, () => {
    console.info('[OUTSIDE CLICK] - Context Menu closed')
    onClose()
  })

  return (
    <div
      ref={ref}
      style={{ top: position.y, left: position.x }}
      className="absolute bg-white shadow-lg rounded-md p-2 z-50"
    >
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            item.onClick()
            onClose()
          }}
          className="cursor-pointer p-2 hover:bg-gray-200"
        >
          {item.label}
        </div>
      ))}
    </div>
  )
}
