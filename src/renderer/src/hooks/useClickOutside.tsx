import { RefObject, useEffect } from 'react'

export const useClickOutside = (
  ref: RefObject<HTMLElement | undefined>, // reference to the object
  callback: () => void, // function to call when clicked outside
  addEventListener = true
) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
      callback() // if the click is outside the object, call the callback function
    }
  }

  useEffect(() => {
    if (addEventListener) {
      document.addEventListener('mousedown', handleClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])
}
