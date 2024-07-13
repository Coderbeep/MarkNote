// EditorJsComponent.tsx
import React, { useEffect, useRef } from 'react'
import EditorJS, { OutputData } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'

const EditorJsComponent: React.FC = () => {
  const editorRef = useRef<EditorJS | null>(null)

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: 'editor-js',
        tools: {
          header: Header,
          list: List,
        },
        autofocus: true,
        onReady: () => {
          console.log('Editor.js is ready to work!')
        },
        onChange: async () => {
          const outputData: OutputData = await editorRef.current!.save()
          console.log('Editor content: ', outputData)
        },
      })
    }

    return () => {
    //   if (editorRef.current) {
    //     editorRef.current.destroy()
    //     editorRef.current = null
    //   }
    }
  }, [])

  return <div id="editor-js" style={{ padding: '20px', background: '#fff' }} />
}

export default EditorJsComponent
