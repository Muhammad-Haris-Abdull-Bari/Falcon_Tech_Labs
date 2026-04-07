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
      <h2 style={{ marginBottom: '1.5rem' }}>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }} className="magnetic">
          <img
            src="/Images_&_Videos/PNG-LOGO-01.png"
            alt="Falcon Tech Labs Logo"
            style={{
              height: '80px',
              width: 'auto',
              display: 'block',
              transition: 'transform 0.3s var(--easing)'
            }}
          />
        </a>
      </h2>
      <p>© {new Date().getFullYear()}</p>
    </footer>
  );
};
