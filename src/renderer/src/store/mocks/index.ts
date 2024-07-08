import { DirectoryInfo, FileNode, NoteInfo } from '@shared/models'

export const notesMock: NoteInfo[] = [
  {
    title: 'NoteMock 1',
    lastEditTime: new Date().getTime()
  },
  {
    title: 'NoteMock 2',
    lastEditTime: new Date().getTime()
  },
  {
    title: 'NoteMock 3',
    lastEditTime: new Date().getTime()
  },
  {
    title: 'NoteMock 4 ',
    lastEditTime: new Date().getTime()
  }
]

export const dirLevel1NotesMock: NoteInfo[] = [
  {
    title: 'First note inside',
    lastEditTime: new Date().getTime()
  },
  {
    title: 'Second note inside',
    lastEditTime: new Date().getTime()
  }
]

export const dirsMock: DirectoryInfo[] = [
  {
    name: 'DirMock 1',
    fullPath: 'DirMock 1',
    depth: 0
  },
  {
    name: 'DirMock 2',
    fullPath: 'DirMock 2',
    depth: 0
  },
  {
    name: 'DirMock 3',
    fullPath: 'DirMock 3',
    depth: 0
  },
  {
    name: 'DirMock 4',
    fullPath: 'DirMock 4',
    depth: 0
  }
]

export const filesMock: FileNode = {
  type: 'folder',
  name: 'parent',
  data: [
    {
      type: 'folder',
      name: 'root',
      data: [
        {
          type: 'folder',
          name: 'src',
          data: [
            {
              type: 'file',
              name: 'index.js',
              lastEditTime: new Date().getTime()
            }
          ]
        },
        {
          type: 'folder',
          name: 'public',
          data: [
            {
              type: 'file',
              name: 'index.ts',
              lastEditTime: new Date().getTime()
            }
          ]
        },
        {
          type: 'file',
          name: 'index.html',
          lastEditTime: new Date().getTime()
        },
        {
          type: 'folder',
          name: 'data',
          data: [
            {
              type: 'folder',
              name: 'images',
              data: [
                {
                  type: 'file',
                  name: 'image.png',
                  lastEditTime: new Date().getTime()
                },
                {
                  type: 'file',
                  name: 'image2.webp',
                  lastEditTime: new Date().getTime()
                }
              ]
            },
            {
              type: 'file',
              name: 'logo.svg',
              lastEditTime: new Date().getTime()
            }
          ]
        },
        {
          type: 'file',
          name: 'style.css',
          lastEditTime: new Date().getTime()
        }
      ]
    }
  ]
}
