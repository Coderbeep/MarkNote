import { cn } from '@renderer/utils'
import { ComponentProps } from 'react'
import { IconType } from 'react-icons'
import { IoBuildOutline } from 'react-icons/io5'


export const ContextMenuItem = ({
  label,
  onClick,
  icon = IoBuildOutline
}) => {
  return (
    <div
      className={cn(
        'cursor-pointer pr-3 pl-2 py-0.5 rounded-md transition-colors duration-75 hover:bg-zinc-300/75'
      )}
      onClick={onClick}
    >
      <div className="my-1 flex items-center h-3">
        <div>{icon({ className: 'mr-2 text-gray-500' })}</div>
        <h3 className="font-bold truncate text-sm text-gray-600">{label}</h3>
      </div>
    </div>
  )
}
