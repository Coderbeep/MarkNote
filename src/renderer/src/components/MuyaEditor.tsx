import {
  CodeBlockLanguageSelector,
  EmojiSelector,
  ImageEditTool,
  ImageResizeBar,
  ImageToolBar,
  InlineFormatToolbar,
  Muya,
  ParagraphFrontButton,
  ParagraphFrontMenu,
  ParagraphQuickInsertMenu,
  PreviewToolBar,
  TableColumnToolbar,
  TableDragBar,
  TableRowColumMenu,
  en
} from '@muyajs/core'

import '@muyajs/core/lib/style.css'

Muya.use(EmojiSelector)
Muya.use(InlineFormatToolbar)
Muya.use(ImageToolBar)
Muya.use(ImageResizeBar)
Muya.use(CodeBlockLanguageSelector)

Muya.use(ParagraphFrontButton)
Muya.use(ParagraphFrontMenu)
Muya.use(TableColumnToolbar)
Muya.use(ParagraphQuickInsertMenu)
Muya.use(TableDragBar)
Muya.use(TableRowColumMenu)
Muya.use(PreviewToolBar)
Muya.use(ImageEditTool)

import { useMarkdownEditor } from '@renderer/hooks/useMarkdownEditor'
import { useEffect, useRef } from 'react'

const DEFAULT_MARKDOWN = `---
title: muya
author: jocs
---

# Inline Format

**strong** *emphasis* \`inline code\` &gt; <u>underline</u> <mark>highlight</mark> <ruby>北京<rt>Beijing</rt></ruby> [Baidu](http://www.baidu.com) H0~2~ X^5^

GitHub and Extra
Inline format
===

:man:  ~~del~~ http://google.com $a \\ne b$`

interface MuyaEditorProps {
  initialFileContent: string
}

export const MuyaEditor: React.FC<MuyaEditorProps> = ({
  initialFileContent = DEFAULT_MARKDOWN
}) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const muyaRef = useRef<Muya | null>(null)

  const { selectedFile, fileContent, handleAutoSaving, handleBlur } = useMarkdownEditor()

  useEffect(() => {
    if (editorRef.current && !muyaRef.current) {
      muyaRef.current = new Muya(editorRef.current, {
        markdown: initialFileContent
      })
      muyaRef.current.locale(en)
      muyaRef.current.init()

      // Add event listener to save content on changes
      muyaRef.current.eventCenter.subscribe('content-change', () => {
        const content = muyaRef.current?.getMarkdown()
        if (content != null) {
          handleAutoSaving(content)
        }
      })
    } else if (muyaRef.current) {
      // Update the markdown content when fileContent changes
      muyaRef.current.setContent(initialFileContent)
    }

    return () => {
      if (muyaRef.current) {
        // Cleanup if needed
        // muyaRef.current.destroy();
      }
    }
  }, [initialFileContent, handleAutoSaving])

  useEffect(() => {
    if (muyaRef.current) {
      const handleFocusOut = () => {
        handleBlur()
      }
      muyaRef.current.eventCenter.subscribe('blur', handleFocusOut)

      return () => {}
    }
  }, [handleBlur])

  useEffect(() => {
    if (selectedFile) {
      console.info('New file selected:', selectedFile.name)
      console.info('File content:', fileContent)
      muyaRef.current?.setContent(fileContent)
    }
  }, [selectedFile])

  return <div ref={editorRef} />
}
