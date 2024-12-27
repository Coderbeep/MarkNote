import { useState } from 'react'
import { Content, RootLayout, Sidebar } from './components'
import CMImageContextMenu from './components/CMImageContextMenu'
import Editor from './components/myEditor'
import { notesDirectoryPath } from '@shared/constants'
import { FileExplorer } from './components/FileExplorer'

function App() {
  const [text, setText] = useState('')

  const openFile = async (filePath: string) => {
    try {
      const result = await window['api'].openFile(filePath);
      setText(result);
    } catch (err) {
      console.error('Error opening file:', err);
    }
  }

  return (
    <RootLayout>
      <CMImageContextMenu />
      <Sidebar>
        <FileExplorer directoryPath={notesDirectoryPath} onFileSelect={openFile} />
      </Sidebar>
      <Content className="border-l border-l-white/20">
        <Editor text={text} setText={setText}/>
      </Content>
    </RootLayout>
  )
}

export default App
