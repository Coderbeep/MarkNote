const { contextBridge, ipcRenderer } = require('electron')

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

contextBridge.exposeInMainWorld('api', {
  openFolderDialog: () => ipcRenderer.invoke('open-folder-dialog'),
  getFiles: (folderPath) => ipcRenderer.invoke('get-files', folderPath),
  openFile: (filePath) => ipcRenderer.invoke('open-file', filePath)
})