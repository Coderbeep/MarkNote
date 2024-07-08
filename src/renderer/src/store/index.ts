import { FileNode } from '@shared/models'
import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'

// application state atoms
// default value is given in the () argument

export const loadFiles = async () => {
  const x = await window.context.getFiles('')
  return x
}


export const selectedFileAtom = atom<FileNode | null>(null)

const selectedFileContentAsyncAtom = atom(async (get) => {
  const selectedFile = get(selectedFileAtom)
  let content = ''
  if (!selectedFile) return null

  if (selectedFile.type === 'file') {
    content = await window.context.readNote(selectedFile.path)
  }
  return content
})

export const selectedFileContentAtom = atom(
  (get) => get(selectedFileContentAsyncAtom)
);

export const filesAtomAsync = atom<FileNode | Promise<FileNode>>(loadFiles())

export const filesAtom = unwrap(filesAtomAsync, (prev) => prev)

export const isLoadingFilesAtom = atom<boolean>(true)

export const initializeFilesAtom = atom(
  null,
  async (get, set, _arg) => {
    set(isLoadingFilesAtom, true);
    try {
      const fetchedFiles = await window.context.getFiles(''); // Adjust this based on your store API
      set(filesAtom, fetchedFiles);
    } catch (error) {
      console.error('Error loading files:', error);
      // Handle error state if needed
    } finally {
      set(isLoadingFilesAtom, false);
    }
  }
);


export const saveFileAtom = atom(null, async (get, set, newContent: string, path: string) => {
  const selectedFile = get(selectedFileAtom)

  if (!selectedFile) return

  // save on disc
  await window.context.writeNote(path, newContent)
  // update the last edit time
})


export const expandedFoldersAtom = atom<Record<string, boolean>>({})