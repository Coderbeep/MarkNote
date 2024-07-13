import React, { useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import { useMarkdownEditor } from '@renderer/hooks/useMarkdownEditor';

const MyMDEditor = () => {
  const { editorRef, handleAutoSaving, handleBlur } = useMarkdownEditor();

  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();

    if (editorInstance) {
      editorInstance.on('change', () => {
        const content = editorInstance.getMarkdown();
        handleAutoSaving(content);
      });

      editorInstance.on('blur', handleBlur);
    }

    return () => {
      if (editorInstance) {
        editorInstance.off('change');
        editorInstance.off('blur');
      }
    };
  }, [handleAutoSaving, handleBlur]);

  return (
    <div className="h-screen">
      <Editor
        ref={editorRef}
        initialValue="hello react editor world!"
        previewStyle="vertical"
        height="100%"
        initialEditType="markdown"
        useCommandShortcut={true}
      />
    </div>
  );
};

export default MyMDEditor;
