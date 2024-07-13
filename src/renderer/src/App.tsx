import { useRef, useState } from 'react'
import { Content, FloatingNoteTitle, MarkdownEditor, MuyaEditor, RootLayout, Sidebar } from './components'
import { FileExplorer } from './components/FileExplorer'
import MyMDEditor from './components/myMDEditor'

function App() {
  const contentContainerRef = useRef<HTMLDivElement>(null)
  const muyaRef = useRef<any>(null) // Ref for Muya instance
  const [files, setLoadedFiles] = useState(null)
  const [isLoading, setLoading] = useState(true)

  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.ctrlKey && event.key === 'z') {
  //       event.preventDefault() // Prevent browser's default behavior (like undoing text input)
  //       muyaRef.current?.undo()
  //       console.info('Undo')
  //     }
  //   }

  //   const handleCtrlClick = (event: MouseEvent) => {
  //     if (event.ctrlKey) {
  //       const target = event.target as HTMLElement

  //       let LinkElement: HTMLAnchorElement | null = null
  //       let childs = target.childNodes as NodeListOf<HTMLElement>

  //       for (let i = 0; i < childs.length; i++) {
  //         // console.info(childs[i].attributes.getNamedItem('href').value)
  //         if (childs[i].nodeName === 'A') {
  //           let value = childs[i].attributes.getNamedItem('href') as Attr
  //           // extract the value of the href attribute
  //           let href = value.value
  //           // print the type of the href attribute
  //           console.info(href.toString())

  //           if (value) {
  //             window.open(href.toString(), '_blank') // Open link in a new tab
  //           }
  //         }
  //       }
  //     }
  //   }

  //   // Add event listeners
  //   document.addEventListener('keydown', handleKeyDown)
  //   document.addEventListener('click', handleCtrlClick)

  //   return () => {
  //     // Cleanup: remove event listeners
  //     document.removeEventListener('keydown', handleKeyDown)
  //     document.removeEventListener('click', handleCtrlClick)
  //   }
  // }, []) // Empty dependency array ensures this effect runs only once

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }

  return (
    <RootLayout>
      <Sidebar className="p-2">
        <FileExplorer files={null} />
      </Sidebar>
      <Content ref={contentContainerRef} className="border-l border-l-white/20 text-slate-800">
        {/* <FloatingNoteTitle /> */}
        {/* <MarkdownEditor /> */}
        {/* <div contentEditable={true}> </div> */}
        {/* <MyMDEditor /> */}
        <MuyaEditor muyaRef={muyaRef} />
        {/* <EditorJsComponent /> */}
        {/* <MyMDEditor /> */}
        {/* <newEditor /> */}
        {/* <ReactEditorMD /> */}
      </Content>
    </RootLayout>
  )
}

export default App
