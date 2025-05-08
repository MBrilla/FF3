import React from 'react';
import '../styles/Legal.css';

const Datenschutz: React.FC = () => {
  return (
    <div className="legal-page">
      <div className="legal-content">
        <h1>Datenschutzerklärung</h1>
        
        <div className="legal-section">
          <h2>Verantwortlich im Sinne der Datenschutzgesetze</h2>
          <p>Insbesondere der EU-Datenschutzgrundverordnung (DSGVO), ist:</p>
          <p>Umut Yilgenci – Farbfink</p>
          <p>Kampstraße 1</p>
          <p>48336 Sassenberg</p>
        </div>

        <div className="legal-section">
          <h2>Ihre Betroffenenrechte</h2>
          <p>Unter den angegebenen Kontaktdaten können Sie jederzeit folgende Rechte ausüben:</p>
          <ul>
            <li>Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung (Art. 15 DSGVO)</li>
            <li>Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO)</li>
            <li>Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO)</li>
            <li>Einschränkung der Datenverarbeitung (Art. 18 DSGVO)</li>
            <li>Widerspruch gegen die Verarbeitung Ihrer Daten bei uns (Art. 21 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>Zwecke der Datenverarbeitung</h2>
          <p>Wir verarbeiten Ihre personenbezogenen Daten nur zu den in dieser Datenschutzerklärung genannten Zwecken. Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als den genannten Zwecken findet nicht statt. Wir geben Ihre persönlichen Daten nur an Dritte weiter, wenn:</p>
          <ul>
            <li>Sie Ihre ausdrückliche Einwilligung dazu erteilt haben</li>
            <li>die Verarbeitung zur Abwicklung eines Vertrags mit Ihnen erforderlich ist</li>
            <li>die Verarbeitung zur Erfüllung einer rechtlichen Verpflichtung erforderlich ist</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>SSL-Verschlüsselung</h2>
          <p>Um die Sicherheit Ihrer Daten bei der Übertragung zu schützen, verwenden wir dem aktuellen Stand der Technik entsprechende Verschlüsselungsverfahren (z. B. SSL) über HTTPS.</p>
        </div>
      </div>
    </div>
  );
};

export default Datenschutz; 