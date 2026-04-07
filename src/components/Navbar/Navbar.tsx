import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../Button/Button';
import './Navbar.css';

const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
    const intervalId = (target as any).intervalId;
    if (intervalId) clearInterval(intervalId);
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
    <nav ref={navRef} className={`brutal-nav ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <a
        href="#"
        className="nav-logo magnetic"
        style={{ textDecoration: 'none' }}
        onMouseMove={handleMagneticMove}
        onMouseLeave={handleMagneticLeave}
      >
        <img src="Images_&_Videos/PNG-LOGO-01.png" alt="Falcon Tech Labs Logo" className="logo-img" />
      </a>

      {/* Hamburger Toggle */}
      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
          <span></span>
          <span></span>
        </div>
      </button>

      <div className={`nav-container ${isMenuOpen ? 'active' : ''}`}>
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
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <Button>
            LET'S TALK
          </Button>
        </div>
      </div>
    </nav>
  );
};

