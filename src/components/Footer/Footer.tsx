import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        height: '40vh',
        background: 'var(--bg)',
        color: 'var(--fg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid #222'
      }}
    >
      <h2 style={{ fontFamily: 'Syncopate', fontSize: '3rem', marginBottom: '1rem' }}>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }} className="magnetic">
          M. HARIS
        </a>
      </h2>
      <p>© {new Date().getFullYear()}</p>
    </footer>
  );
};
