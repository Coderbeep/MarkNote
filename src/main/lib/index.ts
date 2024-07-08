// Reading and writing notes files

import { appDirectoryName, fileEncoding } from '@shared/constants'
import { FileNode, NoteInfo } from '@shared/models'
import { CreateNote, DeleteNote, GetFiles, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { dialog } from 'electron'
import { ensureDir, readFile, readdir, remove, stat, writeFile } from 'fs-extra'
import { homedir } from 'os'
import path from 'path'

export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}

// method for getting all the files from the root directory returning FileNode type

export const getNotes: GetNotes = async (dir: string) => {
  if (dir === '') {
    dir = getRootDir()
  }
  await ensureDir(dir)

  const allFiles = await readdir(dir, {
    encoding: fileEncoding,
    withFileTypes: true
  })

  const directoriesNames = allFiles.filter((file) => file.isDirectory()).map((dir) => dir.name)

  const notes = allFiles
    .filter((file) => file.isFile() && file.name.endsWith('.md'))
    .map((file) => file.name)
  const notesPromise = await Promise.all(notes.map(getNoteInfoFromFilename))

  return { notes: notesPromise, directories: directoriesNames }
}

export const getFiles: GetFiles = async (dirPath: string) => {
  if (dirPath === '') {
    dirPath = getRootDir()
  }

  await ensureDir(dirPath) // Ensure the directory exists

  const allFiles = await readdir(dirPath, { withFileTypes: true })

  const fileNodes: FileNode[] = []

  for (const file of allFiles) {
    const filePath = path.join(dirPath, file.name)
    const stats = await stat(filePath)

    if (file.isDirectory()) {
      const subFiles = await getFiles(filePath)
      const folderNode: FileNode = {
        type: 'folder',
        name: file.name,
        path: filePath,
        data: subFiles.type === 'folder' ? subFiles.data : []
      }
      fileNodes.push(folderNode)
    } else {
      const fileNode: FileNode = {
        type: 'file',
        name: file.name,
        path: filePath,
        lastEditTime: stats.mtime.getTime()
      }
      fileNodes.push(fileNode)
    }
  }

  return {
    type: 'folder',
    name: path.basename(dirPath),
    path: dirPath,
    data: fileNodes
  }
}

export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${filename}`)
  return {
    title: filename.replace('.md', ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (filename) => {
  return readFile(`${filename}`, { encoding: fileEncoding })
}

export const writeNote: WriteNote = async (filename, content) => {
  return writeFile(`${filename}`, content, { encoding: fileEncoding })
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)
  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New note',
    defaultPath: `${rootDir}/Unititled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    console.info('Note creation has been canceled')
    return false
  }

  const { name: filename, dir: parentDir } = path.parse(filePath)

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Invalid directory',
      message: `Notes must be created in ${rootDir}`
    })
    return false
  }

  console.info(`Creating note ${filename}`)
  await writeFile(filePath, '', { encoding: fileEncoding })

  return filename
}

export const deleteNote: DeleteNote = async (filename) => {
  const rootDir = getRootDir()

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete note',
    message: `Are you sure you want to delete ${filename}?`,
    buttons: ['Delete', 'Cancel'], // 0 is Delete, 1 is Cancel
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    console.info('Note deletion canceled')
    return false
  }

  console.info(`Deleting note: ${filename}`)
  await remove(`${rootDir}/${filename}.md`)
  return true
}
