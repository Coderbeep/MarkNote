import { useMarkdownEditor } from "@renderer/hooks/useMarkdownEditor";
import MuyaEditor from "./MuyaEditor";

const MuyaEditorWithHook: React.FC = () => {
    const {
      editorRef,
      selectedFile,
      fileContent,
      handleAutoSaving,
      handleBlur,
    } = useMarkdownEditor();
  
    return (
      <MuyaEditor
        fileContent={fileContent}
        handleAutoSaving={handleAutoSaving}
      />
    );
  }
  
  export default MuyaEditorWithHook;