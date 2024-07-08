export type NoteInfo = {
  title: string
  lastEditTime: number
}

export type NoteContent = string

export type DirectoryInfo = {
  name: string
  fullPath: string
  depth: number
}


export type FileNode =
  | {
      type: 'folder'
      name: string
      path: string
      data?: FileNode[]
    }
  | {
      type: 'file'
      name: string
      path: string
      lastEditTime: number
    }
