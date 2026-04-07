import React from 'react';
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', onClick, id }) => {
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
    <button
      id={id}
      className={`cta-btn magnetic ${className}`}
      onMouseMove={handleMagneticMove}
      onMouseLeave={handleMagneticLeave}
      onClick={onClick}
    >
      <span>{children}</span>
    </button>
  );
};
