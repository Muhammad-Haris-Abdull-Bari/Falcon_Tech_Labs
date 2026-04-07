import React, { useEffect, useRef, useState } from 'react';
import { useMousePosition } from '../../hooks/useMousePosition';
import './Cursor.css';

export const Cursor: React.FC = () => {
  const { x, y } = useMousePosition();
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Custom lerp for smooth magnetic cursor
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const requestRef = useRef<number>();

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      setCursorPos((prev) => ({
        x: lerp(prev.x, x, 0.15),
        y: lerp(prev.y, y, 0.15),
      }));
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [x, y]);

  // Handle magnetic hover globally
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.magnetic')) {
        cursorRef.current?.classList.add('magnet');
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.magnetic')) {
        cursorRef.current?.classList.remove('magnet');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div
      id="cursor"
      ref={cursorRef}
      style={{
        transform: `translate(${cursorPos.x}px, ${cursorPos.y}px) translate(-50%, -50%)`
      }}
    />
  );
};
