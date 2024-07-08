import { selectedFileAtom, selectedFileContentAtom } from '@renderer/store'
import { useAtom, useAtomValue } from 'jotai'
import { useCallback, useTransition } from 'react'

function useFileExplorer() {
  const [selectedFile, setSelectedFile] = useAtom(selectedFileAtom)
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
