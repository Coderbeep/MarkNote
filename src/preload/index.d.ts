declare global {
  interface Window {
    context: {
      locale: string
      ipcRenderer: {
        send: (channel: string, data: any) => void
        on: (channel: string, listener: (event: any, ...args: any[]) => void) => void
        once: (channel: string, listener: (event: any, ...args: any[]) => void) => void
        removeListener: (channel: string, listener: (event: any, ...args: any[]) => void) => void
      }
      getNotes: GetNotes
      readNote: ReadNote
      writeNote: WriteNote
      createNote: CreateNote
      deleteNote: DeleteNote
      getFiles: GetFiles
    }
  }
}

// To ensure this file is treated as a module
export {}
