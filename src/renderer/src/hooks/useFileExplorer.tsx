import { selectedFileAtom, selectedFileContentAtom } from '@renderer/store'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useTransition } from 'react'

function useFileExplorer() {
  const setSelectedFile = useSetAtom(selectedFileAtom)
  const selectedFileContent = useAtomValue(selectedFileContentAtom)
  const [isPending, startTransition] = useTransition()

  const handleFileClick = useCallback(
    (file) => {
      startTransition(() => {
        setSelectedFile(file)
      })
    },
    [setSelectedFile]
  )

  return {
    handleFileClick,
    isPending
  }
}

export default useFileExplorer
