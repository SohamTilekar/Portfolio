import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Home from './pages/Home.jsx';
import Resumes from './pages/Resumes.jsx';

function App() {
  return (
    <Router>
        <ScrollToTop />
        <div className="scroll-progress"></div>
        <div className="bg-pattern"></div>
        
        <Nav />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resumes" element={<Resumes />} />
          <Route path="*" element={<Home />} />
        </Routes>

        <Footer />

        {/* Image Modal - kept globally if needed by any page */}
        <div id="imageModal" className="modal">
            <div className="modal-backdrop" onClick={() => window.closeModal()}></div>
            <div className="modal-controls">
                <button className="modal-btn" onClick={() => window.zoomIn()}>+</button>
                <button className="modal-btn" onClick={() => window.zoomOut()}>-</button>
                <button className="close" onClick={() => window.closeModal()}>&times;</button>
            </div>
            <div className="modal-viewer">
                <img className="modal-content" id="modalImg" alt="Modal view" />
            </div>
        </div>
    </Router>
  );
}

export default App;
