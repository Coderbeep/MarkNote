import { selectedFileAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  const selectedNote = useAtomValue(selectedFileAtom)

  if (!selectedNote) return null

  // window.context.ipcRenderer.send('my-channel', `Hello from renderer ${selectedNote.title}!`)

  return (
    <div className={twMerge('flex justify-center', className)} {...props}>
      <span className="text-gray-400">{selectedNote.name}</span>
    </div>
  )
}
