import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Hero.css';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // Initial reveal animation (optional, GSAP alternative to pure CSS if desired)
    gsap.fromTo('.char',
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.5
      }
    );
  }, { scope: containerRef });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!titleRef.current) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      const rx = (e.clientY - cy) * 0.03;
      const ry = (e.clientX - cx) * 0.03;

      const clamp = (num: number, min: number, max: number) =>
        Math.min(Math.max(num, min), max);

      titleRef.current.style.transform = `translateZ(50px) rotateX(${-clamp(
        rx,
        -15,
        15
      )}deg) rotateY(${clamp(ry, -15, 15)}deg)`;
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const textToChar = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char">{char}</span>
    ));
  };

  return (
    <section ref={containerRef} className="hero">
      <div className="hero-title-container">
        <h1 ref={titleRef}>
          <div className="word">{textToChar('Falcon')}</div><br />
          <div className="word">{textToChar('Tech Labs')}</div>
        </h1>
      </div>

      <div className="tape-wrapper">
        <div className="tape-text">
          M. HARIS ✦ SCROLL VELOCITY ✦ INTERACTIVE SYSTEMS ✦ M. HARIS
          ✦ SCROLL VELOCITY ✦ INTERACTIVE SYSTEMS ✦
        </div>
      </div>
    </section>
  );
};
