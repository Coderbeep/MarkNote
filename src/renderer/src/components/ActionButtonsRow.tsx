import { ComponentProps } from 'react'
import { DeleteNodeButton } from './Button/DeleteNoteButton'
import { NewNoteButton } from './Button/NewNoteButton'

export const ActionButtonsRow = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <NewNoteButton />
      <DeleteNodeButton />
    </div>
  )
}
