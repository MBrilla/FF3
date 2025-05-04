import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-logo-left">
        <img src="/Farbfinklogo.svg" alt="Farbfink Logo" className="footer-logo-img" />
      </div>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Kontakt</h3>
          <p>Farbfink – Fassadengestaltung</p>
          <p>Umut Yilgenci</p>
          <p>Kampstraße 1</p>
          <p>48336 Sassenberg</p>
        </div>
        <div className="footer-section">
          <h3>Rechtliches</h3>
          <nav>
            <Link to="/impressum">Impressum</Link>
            <Link to="/datenschutz">Datenschutzerklärung</Link>
            <Link to="/agb">AGB</Link>
          </nav>
        </div>
        <div className="footer-section">
          <h3>Social Media</h3>
          <nav>
            <a href="https://www.instagram.com/uy.dsgn" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="footer-social-icon" />
            </a>
          </nav>
        </div>
      </div>
      <div className="footer-logo-right"></div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Farbfink. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
};

export default Footer;