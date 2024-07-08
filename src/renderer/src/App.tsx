import { useEffect, useRef, useState } from 'react'
import { Content, FloatingNoteTitle, MarkdownEditor, RootLayout, Sidebar } from './components'
import { ActionButtonsRow } from './components/ActionButtonsRow'
import { FileExplorer } from './components/FileExplorer'
import { filesMock } from './store/mocks'

function App() {
  // The ref is intiialized with null, and then it is passed to the Content components
  const contentContainerRef = useRef<HTMLDivElement>(null)
  const [files, setLoadedFiles] = useState(null)
  const [isLoading, setLoading] = useState(true)

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0) // If the ref is not null, scroll to the top
  }


  return (
    <RootLayout>
      <Sidebar className="p-2">
        <ActionButtonsRow className="flex justify-between mt-1" />
        {/* <NotePreviewList className="mt2 space-y-1" onSelect={resetScroll} /> */}
        {<FileExplorer files={null}/>}
      </Sidebar>
      <Content ref={contentContainerRef} className="border-l bg-zinc-900/50 border-l-white/20">
        <FloatingNoteTitle />
        <MarkdownEditor />
      </Content>
    </RootLayout>
  )
}

export default App
