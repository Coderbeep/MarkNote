import { ActionButton, ActionButtonProps } from '@/components'
import { IoMdTrash } from 'react-icons/io'

export const DeleteNodeButton = ({ ...props }: ActionButtonProps) => {
  const handleDeletion = async () => {
    await console.info('Deleting note')
  }

  return (
    <ActionButton onClick={handleDeletion} {...props}>
      <IoMdTrash className="text-2xl" />
    </ActionButton>
  )
}
