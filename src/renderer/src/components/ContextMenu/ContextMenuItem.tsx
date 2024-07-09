import { cn } from '@renderer/utils'
import { ComponentProps } from 'react'

export type ContextMenuItemProps = {
  label: string
} & ComponentProps<'div'>

export const ContextMenuItem = ({ label }: ContextMenuItemProps) => {
  const handleItemClick = () => {
    console.info('Item clicked')
  }

  return (
    <div
      className={cn(
        'cursor-pointer p-2 hover:bg-gray-200 rounded-md transition-colors duration-75'
      )}
      onClick={handleItemClick}
    >
      {label}
    </div>
  )
}
