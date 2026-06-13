import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();
  const isHome = location.pathname !== '/resumes';
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-height"), 10) || 70;
      const offset = element.getBoundingClientRect().top + window.scrollY - navHeight - 14;
      window.scrollTo({ top: offset, behavior: 'smooth' });
      window.history.pushState(null, null, id);
    }
  };

  const navStyle = {
    background: isScrolled ? 'rgba(10, 15, 29, 0.95)' : 'rgba(10, 15, 29, 0.8)',
    boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.5)' : 'none'
  };

  return (
    <nav style={navStyle}>
      <div className="nav-content">
        <Link to="/" className="logo-link">
            <img className="logo" src="asserts/PFP.png" width="48px" alt="Logo" style={{ verticalAlign: 'middle' }} />
            {!isHome && <span style={{ marginLeft: '10px', fontFamily: 'Fira Code, monospace', fontWeight: 'bold', color: 'var(--accent-primary)' }}>ST</span>}
        </Link>
        <div className="nav-links">
          {isHome ? (
            <>
              <a href="#about" onClick={(e) => handleScrollTo(e, '#about')}>👤 About</a>
              <a href="#skills" onClick={(e) => handleScrollTo(e, '#skills')}>🛠️ Skills</a>
              <a href="#projects" className="nav-projects-bold" onClick={(e) => handleScrollTo(e, '#projects')}>🚀 Projects</a>
              <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')}>📞 Contact</a>
            </>
          ) : (
            <>
              <Link to="/#about">👤 About</Link>
              <Link to="/#skills">🛠️ Skills</Link>
              <Link to="/#projects" className="nav-projects-bold">🚀 Projects</Link>
              <Link to="/#contact">📞 Contact</Link>
            </>
          )}
          
          <div className="nav-separator"></div>
          
          <a href="https://github.com/SohamTilekar" target="_blank" rel="noreferrer">
            <i className="fab fa-github"></i> GitHub
          </a>
          
          <div className="nav-dropdown">
            <Link to="/resumes" className="nav-dropdown-toggle" style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>
              <i className="fas fa-file-pdf"></i> Resume <i className="fas fa-chevron-down" style={{ fontSize: '0.7rem' }}></i>
            </Link>
            <div className="nav-dropdown-content">
              <a href="Resume/index.html">Standard Resume</a>
              <a href="Resume-RISCV-Ext-Landscape/index.html">RISC-V Extended</a>
              <a href="Resume-Java-Internship/index.html">Core Java Resume</a>
              <Link to="/resumes">View All Versions</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
