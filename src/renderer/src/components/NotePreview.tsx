import { useContextMenu } from '@renderer/hooks/useContextMenu'
import { cn } from '@renderer/utils'
import { NoteInfo } from '@shared/models'
import { ComponentProps } from 'react'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { ContextMenu } from './ContextMenu/ContextMenu'

export type NotePreviewProps = NoteInfo & {
  isActive?: boolean
} & ComponentProps<'div'>

export const NotePreview = ({
  title,
  content,
  lastEditTime,
  isActive = false,
  className,
  ...props
}: NotePreviewProps) => {
  const { contextMenuVisible, contextMenuPosition, handleContextMenu, handleCloseContextMenu } =
    useContextMenu()

  return (
    <div
      className={cn(
        'cursor-pointer pl-3 py-0.5 rounded-md transition-colors duration-75',
        {
          'bg-zinc-400/75': isActive,
          'hover:bg-zinc-500/75': !isActive
        },
        className
      )}
      {...props}
      onContextMenu={handleContextMenu} // on right click event raise the context menu
    >
      <div className="my-1 flex items-center h-3">
        <div>
          <IoDocumentTextOutline className="mr-2 text-gray-500" size={15} />
        </div>
        <h3 className="font-bold truncate text-sm text-gray-600">{title}</h3>
      </div>
      {contextMenuVisible && (
        <ContextMenu
          items={[
            { label: 'Edit', onClick: () => console.info('Edit') },
            { label: 'Delete', onClick: () => console.info('Delete') },
            { label: 'Share', onClick: () => console.info('Share') }
          ]}
          position={contextMenuPosition}
          onClose={handleCloseContextMenu}
        />
      )}
    </div>
  )
}
