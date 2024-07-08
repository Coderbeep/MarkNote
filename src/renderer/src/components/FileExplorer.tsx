import useFileExplorer from '@renderer/hooks/useFileExplorer'
import { expandedFoldersAtom, filesAtom } from '@renderer/store'
import { useAtomValue, useSetAtom } from 'jotai'
import { useState } from 'react'
import { NoteDirectoryPreview } from './NoteDirectoryPreview'
import { NotePreview } from './NotePreview'

export function FileExplorer({ files }) {
  // recursive component
  // if files not initialized - get it from the store
  // the store loads the files from the main notes
  if (!files) {
    files = useAtomValue(filesAtom)
  }

  const [expanded, setExpanded] = useState(false)
  const { handleFileClick } = useFileExplorer()

  const expandedFolders = useAtomValue(expandedFoldersAtom)
  const setExpandedFolders = useSetAtom(expandedFoldersAtom)

  const handleToggle = (folderPath) => {
    setExpanded(!expanded)

    setExpandedFolders((prev) => ({
      ...prev,
      [folderPath]: !prev[folderPath]
    }))
  }

  if (files.type === 'folder') {
    return (
      <div>
        <NoteDirectoryPreview name={files.name} onClick={() => handleToggle(files.path)} />
        <div className={`pl-3 ml-3.5 mr-2 border-l ${expandedFolders[files.path] ? 'block' : 'hidden'}`}>
          {files.data.map((file) => {
            if (file.type === 'file')
              return (
                <NotePreview
                  key={file.name} // Added key prop
                  title={file.name}
                  lastEditTime={file.lastEditTime}
                  onClick={() => handleFileClick(file)}
                />
              )
            else if (file.type === 'folder') return <FileExplorer key={file.name} files={file} />
          })}
        </div>
      </div>
    )
  } else if (files.type === 'file') {
    return <NotePreview title={files.name} lastEditTime={files.lastEditTime} />
  } else {
    return null // Handle case when files is neither folder nor file
  }
}
