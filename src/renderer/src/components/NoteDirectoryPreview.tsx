import { cn } from '@renderer/utils'
import { ComponentProps } from 'react'
import { IoFolderOpenOutline } from 'react-icons/io5'

export type NoteDirectoryPreviewProps = {
  name: string
  onClick?: () => void
} & ComponentProps<'div'>

export const NoteDirectoryPreview = ({ name, onClick }: NoteDirectoryPreviewProps) => {
  return (
    <div
      className={cn(
        'cursor-pointer px-2 py-0.5 rounded-md transition-colors duration-75 hover:bg-zinc-500/75'
      )}
      onClick={onClick}
    >
      <div className="my-1 flex items-center h-3">
        <IoFolderOpenOutline className="mr-2 text-gray-500" size={15} />
        <h3 className="font-bold truncate text-sm text-gray-600">{name}</h3>
      </div>
    </div>
  )
}
