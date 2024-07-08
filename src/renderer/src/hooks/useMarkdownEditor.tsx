import { MDXEditorMethods } from '@mdxeditor/editor'
import { saveFileAtom, selectedFileAtom, selectedFileContentAtom } from '@renderer/store'
import { autoSaveInterval } from '@shared/constants'
import { useAtomValue, useSetAtom } from 'jotai'
import { throttle } from 'lodash'
import { useRef } from 'react'

export const useMarkdownEditor = () => {
  const selectedFile = useAtomValue(selectedFileAtom)
  const fileContent = useAtomValue(selectedFileContentAtom)
  const saveFile = useSetAtom(saveFileAtom)
  const editorRef = useRef<MDXEditorMethods>(null)

  const handleAutoSaving = throttle(
    async (content: string) => {
      if (!selectedFile) return

      console.info('Auto saving:', selectedFile.name)

      await saveFile(content, selectedFile.path)
    },
    autoSaveInterval,
    {
      leading: false,
      trailing: true
    }
  )

  const handleBlur = async () => {
    if (!selectedFile) return

    handleAutoSaving.cancel()

    const content = editorRef.current?.getMarkdown()

    if (content != null) {
      await saveFile(content, selectedFile.path)
    }
  }

  return {
    editorRef,
    selectedFile,
    fileContent: fileContent ?? '',
    handleAutoSaving,
    handleBlur
  }
}
