import { selectedFileAtom } from '@renderer/store'
import { useSetAtom } from 'jotai'
import { startTransition, useCallback } from 'react'
import { IoPencilOutline } from 'react-icons/io5'
import { ContextMenuItem } from './ContextMenuItem'

export const MenuEditNoteItem = ({ onClose, file }) => {
  const setSelectedFile = useSetAtom(selectedFileAtom)

  const handleFileClick = useCallback((file) => {
    startTransition(() => {
      setSelectedFile(file)
    })
    console.info('Edit')
    console.info(file)
    onClose()
  }, [])

  return (
    <ContextMenuItem
      label="Edit note"
      icon={IoPencilOutline}
      onClick={handleFileClick.bind(null, file)}
    />
  )
}
