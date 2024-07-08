import { ActionButton, ActionButtonProps } from '@/components/Button/ActionButton'
import { IoIosAddCircleOutline } from 'react-icons/io'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const handleCreation = async () => {
    await console.info('Create new note')
  }

  return (
    <ActionButton {...props} onClick={handleCreation}>
      <IoIosAddCircleOutline className="text-2xl" />
    </ActionButton>
  )
}
