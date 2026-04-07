import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useMousePosition } from '../../hooks/useMousePosition';
import './Cursor.css';

export const Cursor: React.FC = () => {
  const { x, y } = useMousePosition();
  const cursorSmallRef = useRef<HTMLDivElement>(null);
  const cursorBigRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    const checkTouch = () => {
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(touch);
      if (!touch) {
        document.documentElement.classList.add('no-touch');
      }
    };
    checkTouch();
  }, []);

  useGSAP(() => {
    if (isTouchDevice) return;

    // Follow mouse
    gsap.set([cursorSmallRef.current, cursorBigRef.current], {
      x: x,
      y: y
    });

    // Hover detection logic
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isTrigger = target.closest('.view-more-trigger');
      const isMagnetic = target.closest('.magnetic');

      const tl = gsap.timeline({
        defaults: { duration: 0.4, ease: "power2.out" }
      });

      if (isTrigger) {
        // Expand to "View More" big cursor
        tl.to(cursorSmallRef.current, { opacity: 0, scale: 0 }, 0)
          .to(cursorBigRef.current, { opacity: 1, scale: 1 }, 0);
      } else if (isMagnetic) {
        // Magnetic small cursor (existing behavior)
        tl.to(cursorSmallRef.current, { 
          opacity: 1, 
          scale: 4, 
          backgroundColor: 'transparent', 
          border: '1px solid var(--accent)' 
        }, 0)
          .to(cursorBigRef.current, { opacity: 0, scale: 0 }, 0);
      } else {
        // Default small cursor
        tl.to(cursorSmallRef.current, { 
          opacity: 1, 
          scale: 1, 
          backgroundColor: 'var(--accent)', 
          border: '0px solid transparent' 
        }, 0)
          .to(cursorBigRef.current, { opacity: 0, scale: 0 }, 0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <div 
        ref={cursorSmallRef} 
        id="cursor-small" 
        className="cursor-element"
      />
      <div 
        ref={cursorBigRef} 
        id="cursor-big" 
        className="cursor-element"
      >
        <p>View More</p>
      </div>
    </>
  );
};
