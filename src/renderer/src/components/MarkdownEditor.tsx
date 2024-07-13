import {
  MDXEditor,
  headingsPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin
} from '@mdxeditor/editor'
import { useMarkdownEditor } from '@renderer/hooks/useMarkdownEditor'

export const MarkdownEditor = () => {
  const { editorRef, selectedFile, fileContent, handleAutoSaving, handleBlur } = useMarkdownEditor()

  if (!selectedFile) return null

  editorRef.current

  return (
    <MDXEditor
      ref={editorRef}
      key={selectedFile.path}
      markdown={fileContent}
      plugins={[
        thematicBreakPlugin(),
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        linkDialogPlugin()
      ]}
      onChange={handleAutoSaving}
      onBlur={handleBlur}
      contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-slate prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
    />
  )
}
