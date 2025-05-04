import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <img src="./paintdrip.png" alt="Paint Drip" className="navbar-paintdrip" />
      <img src="./paintsplatter.png" alt="Paint Splatter" className="navbar-paintsplatter" />
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src="./Farbfinklogo.svg" alt="Farbfink Logo" className="logo-img" />
            <img src="./farbfinktext.png" alt="Farbfink Text" className="logo-text" />
          </Link>
        </div>
        
        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link">Start</Link>
          <Link to="/farbfink" className="nav-link">Farbfink</Link>
          <Link to="/leistungen" className="nav-link">Leistungen</Link>
          <Link to="/projekte" className="nav-link">Projekte</Link>
          <Link to="/kontakt" className="nav-link">Kontakt</Link>
        </div>

        <div className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;