import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';

const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    let iter = 0;
    const original = target.dataset.text || '';
    
    // Clear any existing interval
    if ((target as any).intervalId) {
      clearInterval((target as any).intervalId);
    }

    (target as any).intervalId = setInterval(() => {
      target.innerText = original
        .split("")
        .map((_, i) => {
          if (i < iter) return original[i];
          return alpha[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iter >= original.length) {
        clearInterval((target as any).intervalId);
      }
      iter += 1 / 3;
    }, 30);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    clearInterval((target as any).intervalId);
    target.innerText = target.dataset.text || '';
  };

  // Keep magnetic behavior for elements
  const handleMagneticMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dist = 0.5;

    const moveX = (e.clientX - centerX) * dist;
    const moveY = (e.clientY - centerY) * dist;

    el.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = 'translate(0, 0)';
  };

  return (
    <nav ref={navRef} className={`brutal-nav ${isScrolled ? 'scrolled' : ''}`}>
      <a
        href="#"
        className="nav-logo magnetic"
        style={{ textDecoration: 'none' }}
        onMouseMove={handleMagneticMove}
        onMouseLeave={handleMagneticLeave}
      >
        M. HARIS
      </a>
      <ul className="nav-menu">
        {['WORK', 'ABOUT', 'LABS'].map((item) => (
          <li key={item}>
            <a
              href="#"
              className="nav-link magnetic"
              data-text={item}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMagneticMove}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
      <button
        className="cta-btn magnetic"
        onMouseMove={handleMagneticMove}
        onMouseLeave={handleMagneticLeave}
      >
        <span>LET'S TALK</span>
      </button>
    </nav>
  );
};
