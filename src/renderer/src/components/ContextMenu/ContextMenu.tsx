import { useClickOutside } from '@renderer/hooks/useClickOutside'
import { useRef } from 'react'
import { MenuDeleteNoteItem,  } from './MenuDeleteNoteItem'
import { MenuEditNoteItem } from './MenuEditNoteItem'


export const ContextMenu = ({ position, onClose, clickedFile }) => {
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
      <MenuEditNoteItem onClose={onClose} file={clickedFile}/>
      <MenuDeleteNoteItem onClose={onClose} file={clickedFile} />
    </div>
  )
}
