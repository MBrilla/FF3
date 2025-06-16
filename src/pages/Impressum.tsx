import React from 'react';
import '../styles/Legal.css';

const Impressum: React.FC = () => {
  return (
    <div className="legal-page">
      <div className="legal-content">
        <h1>Impressum</h1>
        <h2>Angaben gemäß § 5 TMG</h2>
        
        <div className="legal-section">
          <p>Umut Yilgenci</p>
          <p>Farbfink Fassadengestaltung</p>
          <p>Kampstraße 1</p>
          <p>48336 Sassenberg</p>
          <p>Steuernummer: 346/5103/7734</p>
        </div>

        <div className="legal-section">
          <h3>Kontakt</h3>
          <p>Telefon: +49 163 151 3330</p>
          <p>E-Mail: farbfink.info@gmail.com</p>
        </div>

        <div className="legal-section">
          <h3>Umsatzsteuer-ID</h3>
          <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
          <p>Steuernummer: 346/5103/7734</p>
        </div>

        <div className="legal-section">
          <h3>Streitschlichtung</h3>
          <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
          <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
            Verbraucherschlichtungsstelle teilzunehmen.</p>
        </div>
      </div>
    </div>
  );
};

export default Impressum;