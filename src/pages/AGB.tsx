import React from 'react';
import '../styles/Legal.css';

const AGB: React.FC = () => {
  return (
    <div className="legal-page">
      <div className="legal-content">
        <h1>Allgemeine Geschäftsbedingungen</h1>
        
        <div className="legal-section">
          <h2>1. Geltungsbereich</h2>
          <p>Diese Allgemeinen Geschäftsbedingungen gelten für alle gegenwärtigen und zukünftigen Geschäftsbeziehungen zwischen Farbfink – Fassadengestaltung (nachfolgend "Farbfink") und dem Auftraggeber.</p>
        </div>

        <div className="legal-section">
          <h2>2. Vertragsschluss</h2>
          <p>Der Vertrag kommt durch die Auftragsbestätigung von Farbfink zustande. Alle Vereinbarungen, die zwischen Farbfink und dem Auftraggeber zwecks Ausführung des Vertrages getroffen werden, sind schriftlich niederzulegen.</p>
        </div>

        <div className="legal-section">
          <h2>3. Leistungsumfang</h2>
          <p>Der Leistungsumfang ergibt sich aus der schriftlichen Auftragsbestätigung. Nachträgliche Änderungen des Leistungsinhalts bedürfen der schriftlichen Bestätigung durch Farbfink.</p>
        </div>

        <div className="legal-section">
          <h2>4. Preise und Zahlung</h2>
          <p>Alle Preise verstehen sich in Euro zzgl. der gesetzlichen Mehrwertsteuer. Rechnungen sind innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug zahlbar.</p>
        </div>

        <div className="legal-section">
          <h2>5. Eigentumsvorbehalt</h2>
          <p>Bis zur vollständigen Bezahlung bleiben die gelieferten Leistungen Eigentum von Farbfink. Der Auftraggeber ist nicht berechtigt, die Leistungen vor vollständiger Bezahlung zu verwerten.</p>
        </div>

        <div className="legal-section">
          <h2>6. Gewährleistung</h2>
          <p>Farbfink gewährleistet, dass die Leistung frei von Sachmängeln ist. Die Gewährleistungsfrist beträgt 12 Monate ab Abnahme der Leistung.</p>
        </div>

        <div className="legal-section">
          <h2>7. Haftung</h2>
          <p>Farbfink haftet für Schäden nur bei Vorsatz oder grober Fahrlässigkeit. Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen.</p>
        </div>

        <div className="legal-section">
          <h2>8. Schlussbestimmungen</h2>
          <p>Es gilt das Recht der Bundesrepublik Deutschland. Erfüllungsort und Gerichtsstand ist Sassenberg.</p>
          <p>Sollten einzelne Bestimmungen des Vertrages mit dem Auftraggeber einschließlich dieser AGB ganz oder teilweise unwirksam sein oder werden, so wird hierdurch die Gültigkeit der übrigen Bestimmungen nicht berührt.</p>
        </div>
      </div>
    </div>
  );
};

export default AGB; 