import { Content, RootLayout } from './components'
import CMImageContextMenu from './components/CMImageContextMenu'
import Editor from './components/myEditor'

function App() {


  return (
    <RootLayout>
      <CMImageContextMenu />
      <Content className="border-l border-l-white/20">
        <Editor />
      </Content>
    </RootLayout>
  )
}

export default App
