import { FileNode, NoteContent, NoteInfo } from './models'

export type GetNotes = (dir: string) => Promise<{
  notes: NoteInfo[]
  directories: string[]
}>

export type ReadNote = (title: NoteInfo['title']) => Promise<string>
export type WriteNote = (title: NoteInfo['title'], content: NoteContent) => Promise<void> // not returning any kind of value
export type CreateNote = () => Promise<NoteInfo['title'] | false>
export type DeleteNote = (title: NoteInfo['title']) => Promise<boolean> // whether the note was deleted or not
export type GetFiles = (dir: string) => Promise<FileNode | Promise<FileNode>>
