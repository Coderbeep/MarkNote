import { useCallback } from 'react';

interface ResizerProps {
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
}

export const Resizer = ({ width, setWidth }: ResizerProps) => {
  const startResize = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const startX = e.clientX;
    const startWidth = width;

    const onResize = (e: MouseEvent) => {
      const newWidth = startWidth + (e.clientX - startX);
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
