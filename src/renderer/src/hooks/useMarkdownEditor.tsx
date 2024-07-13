// import { useAtomValue, useSetAtom } from 'jotai';
// import { throttle } from 'lodash';
// import { useRef, useEffect } from 'react';
// import { saveFileAtom, selectedFileAtom, selectedFileContentAtom } from '@renderer/store';
// import { autoSaveInterval } from '@shared/constants';
// import '@toast-ui/editor/dist/toastui-editor.css';
// import { Editor as ToastUIEditor, EditorProps as ToastUIEditorProps } from '@toast-ui/react-editor';
// import { Editor as EditorType } from '@toast-ui/editor';

// export const useMarkdownEditor = () => {
//   const selectedFile = useAtomValue(selectedFileAtom);
//   const fileContent = useAtomValue(selectedFileContentAtom);
//   const saveFile = useSetAtom(saveFileAtom);
//   const editorRef = useRef<ToastUIEditor>(null);

//   const handleAutoSaving = throttle(
//     async (content: string) => {
//       if (!selectedFile) return;

//       console.info('Auto saving:', selectedFile.name);

//       await saveFile(content, selectedFile.path);
//     },
//     autoSaveInterval,
//     {
//       leading: false,
//       trailing: true,
//     }
//   );

//   const handleBlur = async () => {
//     if (!selectedFile) return;

//     handleAutoSaving.cancel();

//     const content = editorRef.current?.getInstance().getMarkdown();

//     if (content != null) {
//       await saveFile(content, selectedFile.path);
//     }
//   };

//   useEffect(() => {
//     const editorInstance = editorRef.current?.getInstance();
//     if (editorInstance && fileContent != null) {
//       editorInstance.setMarkdown(fileContent);
//     }
//   }, [fileContent]);

//   return {
//     editorRef,
//     selectedFile,
//     fileContent: fileContent ?? '',
//     handleAutoSaving,
//     handleBlur,
//   };
// };




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