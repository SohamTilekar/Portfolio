import React from 'react';

const Footer = () => {
  return (
    <footer>
        <div className="footer-stack" style={{ textAlign: 'center', marginBottom: '20px', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
            <p>Built with <strong>Node.js, React, Tailwind CSS, and Webpack</strong></p>
            <p>Hosted on <strong>GitHub Pages</strong> with <strong>Docker</strong> support</p>
        </div>
        <p>Built with &lt;3 by Soham Tilekar &bull; 2026</p>
    </footer>
  );
};

export default Footer;
