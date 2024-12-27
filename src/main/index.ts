import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, app, dialog, ipcMain, shell } from 'electron'
import path, { join } from 'path'
import icon from '../../resources/icon.png?asset'
import { readFile, readdir, stat } from 'fs/promises'
import { notesDirectoryPath } from '@shared/constants'
import { FileItem } from '@shared/models'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    center: true,
    title: 'NoteMark',
    frame: false,
    vibrancy: 'under-window',
    visualEffectState: 'active',
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 15, y: 10 },
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});



// Define ipcMain handlers

ipcMain.handle('open-folder-dialog', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });

  if (result.canceled) return [];

  const folderPath = result.filePaths[0];
  const files = readdir(folderPath);
  return files;
})

ipcMain.handle('get-files', async (_, directoryPath: string) => {
  const files: FileItem[] = [];
  const filenames = await readdir(directoryPath);

  for (const filename of filenames) {
    const filePath = path.join(directoryPath, filename);
    const fileStat = await stat(filePath);

    const fileItem: FileItem = {
      filename: filename,
      path: filePath,
      isDirectory: fileStat.isDirectory(),
    }

    files.push(fileItem);
  }

  return files;
});

ipcMain.handle('open-file', async (_, filePath: string) => {
  try {
    const fullPath = path.resolve(notesDirectoryPath, filePath);
    const content = await readFile(fullPath, 'utf-8');
    return content;
  } catch (err) {
    console.error('Error reading file:', err);
    return '';
  }
});

