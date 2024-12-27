import { useCallback } from 'react';

interface ResizerProps {
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
}

const MAX_SIDEBAR_WIDTH = 600;
const MIN_SIDEBAR_WIDTH = 300;

export const Resizer = ({ width, setWidth }: ResizerProps) => {
  const startResize = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const startX = e.clientX;
    const startWidth = width;

    const onResize = (e: MouseEvent) => {
      const newWidth = startWidth + (e.clientX - startX);
      if (newWidth < MIN_SIDEBAR_WIDTH || newWidth > MAX_SIDEBAR_WIDTH) return;
      setWidth(newWidth);
    };

    const stopResize = () => {
      document.removeEventListener('mousemove', onResize);
      document.removeEventListener('mouseup', stopResize);
    };

    document.addEventListener('mousemove', onResize);
    document.addEventListener('mouseup', stopResize);

    e.preventDefault();
    e.stopPropagation();
  }, [width, setWidth]);

  return (
    <div
      className="resizer"
      onMouseDown={startResize}
    />
  );
};
