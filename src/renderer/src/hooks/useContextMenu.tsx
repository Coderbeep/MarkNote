import { useState } from 'react'

export const useContextMenu = () => {
  const [contextMenuVisible, setContextMenuVisible] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })

  const handleContextMenu = (event) => {
    event.preventDefault()
    setContextMenuPosition({ x: event.clientX, y: event.clientY })
    setContextMenuVisible(true)
  }

  const handleCloseContextMenu = () => {
    setContextMenuVisible(false)
  }

  return {
    contextMenuVisible,
    contextMenuPosition,
    handleContextMenu,
    handleCloseContextMenu
  }
}
