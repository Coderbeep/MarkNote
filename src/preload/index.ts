import { CreateNote, DeleteNote, GetFiles, GetNotes, ReadNote, WriteNote } from '@shared/types'

const { contextBridge, ipcRenderer } = require('electron')

if (!process.contextIsolated) {
  throw new Error('contextIsolation has to be enabled')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    ipcRenderer: {
      // Define specific methods that you want to expose to the renderer process
      send: (channel, data) => {
        ipcRenderer.send(channel, data)
      },
      on: (channel, listener) => {
        ipcRenderer.on(channel, listener)
      },
      once: (channel, listener) => {
        ipcRenderer.once(channel, listener)
      },
      removeListener: (channel, listener) => {
        ipcRenderer.removeListener(channel, listener)
      }
    },
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
    readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke('readNote', ...args),
    writeNote: (...args: Parameters<WriteNote>) => ipcRenderer.invoke('writeNote', ...args),
    createNote: (...args: Parameters<CreateNote>) => ipcRenderer.invoke('createNote', ...args),
    deleteNote: (...args: Parameters<DeleteNote>) => ipcRenderer.invoke('deleteNote', ...args),
    getFiles: (...args: Parameters<GetFiles>) => ipcRenderer.invoke('getFiles', ...args)
  })
} catch (error) {
  console.error(error)
}

console.log('preload script loaded')
