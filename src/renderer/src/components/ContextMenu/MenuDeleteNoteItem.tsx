import { IoTrashOutline } from 'react-icons/io5'
import { ContextMenuItem } from './ContextMenuItem'
import { useAtom } from 'jotai'
import { deleteFileAtom } from '@renderer/store'

export const MenuDeleteNoteItem = ({ onClose, file }) => {
  const [, deleteFile] = useAtom(deleteFileAtom)
   

  const handleFileClick = () => {
    console.info('Delete')
    deleteFile(file.path)
    onClose()
  }

  return <ContextMenuItem label="Delete note" icon={IoTrashOutline} onClick={handleFileClick} />
}
