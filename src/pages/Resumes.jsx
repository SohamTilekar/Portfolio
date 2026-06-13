import React from 'react';
import { Link } from 'react-router-dom';

const Resumes = () => {
  return (
    <main className="resume-list-container" style={{ maxWidth: '800px', margin: '120px auto 60px', padding: '0 20px' }}>
        <h2 style={{ marginBottom: '40px', fontSize: '2rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', fontFamily: '"Fira Code", monospace' }}>
            Professional Resumes
            <span style={{ height: '1px', flexGrow: 1, background: 'linear-gradient(90deg, var(--accent-primary), transparent)', marginLeft: '20px' }}></span>
        </h2>
        
        <div className="resume-item glass-card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '30px', marginBottom: '20px', transition: 'transform 0.3s ease' }}>
            <div className="resume-icon" style={{ fontSize: '3rem', color: 'var(--accent-primary)' }}>
                <i className="fab fa-java"></i>
            </div>
            <div className="resume-info" style={{ flex: 1 }}>
                <h3 style={{ marginBottom: '8px', color: '#fff', fontFamily: '"Fira Code", monospace' }}>(New) Core Java Development Resume</h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Tailored specifically for Core Java Internships, highlighting multi-threading, custom HTTP servers, JVM sandboxing, process execution, and cryptographic security.</p>
            </div>
            <div className="resume-actions" style={{ display: 'flex', gap: '15px' }}>
                <a href="Resume-Java-Internship/index.html" className="resume-btn btn-view" style={{ padding: '10px 20px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600', textDecoration: 'none', transition: 'all 0.3s', background: 'var(--accent-primary)', color: 'var(--bg-color)' }}>View Online</a>
            </div>
        </div>

        <div className="resume-item glass-card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '30px', marginBottom: '20px', transition: 'transform 0.3s ease' }}>
            <div className="resume-icon" style={{ fontSize: '3rem', color: 'var(--accent-primary)' }}>
                <i className="fas fa-file-invoice"></i>
            </div>
            <div className="resume-info" style={{ flex: 1 }}>
                <h3 style={{ marginBottom: '8px', color: '#fff', fontFamily: '"Fira Code", monospace' }}>Standard Systems Engineer Resume</h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Comprehensive overview of systems programming, kernel development, and compiler expertise. Optimized for ATS and professional review.</p>
            </div>
            <div className="resume-actions" style={{ display: 'flex', gap: '15px' }}>
                <a href="Resume/index.html" className="resume-btn btn-view" style={{ padding: '10px 20px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600', textDecoration: 'none', transition: 'all 0.3s', background: 'var(--accent-primary)', color: 'var(--bg-color)' }}>View Online</a>
            </div>
        </div>

        <div className="resume-item glass-card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '30px', marginBottom: '20px', transition: 'transform 0.3s ease' }}>
            <div className="resume-icon" style={{ fontSize: '3rem', color: 'var(--accent-primary)' }}>
                <i className="fas fa-microchip"></i>
            </div>
            <div className="resume-info" style={{ flex: 1 }}>
                <h3 style={{ marginBottom: '8px', color: '#fff', fontFamily: '"Fira Code", monospace' }}>RISC-V Extended (Landscape)</h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Detailed architectural focus featuring RISC-V extensions, hardware-software co-design, and deep-dive technical projects.</p>
            </div>
            <div className="resume-actions" style={{ display: 'flex', gap: '15px' }}>
                <a href="Resume-RISCV-Ext-Landscape/index.html" className="resume-btn btn-view" style={{ padding: '10px 20px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600', textDecoration: 'none', transition: 'all 0.3s', background: 'var(--accent-primary)', color: 'var(--bg-color)' }}>View Online</a>
            </div>
        </div>

        <div style={{ marginTop: '60px', textAlign: 'center' }}>
            <Link to="/" className="btn" style={{ textDecoration: 'none' }}>&larr; Back to Portfolio</Link>
        </div>
    </main>
  );
};

export default Resumes;
