import React from 'react';
import { useForm } from '@formspree/react';
import '../styles/Kontakt.css';

const Kontakt: React.FC = () => {
  const [state, handleSubmit] = useForm("mnndqebw");

  if (state.succeeded) {
    return (
      <div className="kontakt-page">
        <div className="success-message">
          <h2>DANKE FÜR IHRE NACHRICHT!</h2>
          <p>Wir werden uns schnellstmöglich bei Ihnen melden.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="kontakt-page">
      <div className="kontakt-container">
        <div className="kontakt-left">
          <h1>
            <span>LASSEN SIE UNS</span>
            <span className="highlight">ZUSAMMENARBEITEN</span>
          </h1>
          <div className="contact-info">
            <div className="contact-details">
              <div className="contact-item">
                <h3>ADRESSE</h3>
                <p>Farbfink – Fassadengestaltung</p>
                <p>Umut Yilgenci</p>
                <p>Kampstraße 1</p>
                <p>48336 Sassenberg</p>
              </div>
              <div className="contact-item">
                <h3>ERREICHBARKEIT</h3>
                <p>Telefon: +49 163 151 3330</p>
                <p>E-Mail: farbfink.info@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="kontakt-right">
          <div className="contact-form">
            <h2>IHRE NACHRICHT</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  placeholder="NAME *"
                />
              </div>

              <div className="form-group">
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="E-MAIL *"
                />
              </div>

              <div className="form-group">
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="TELEFON"
                />
              </div>

              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="IHRE NACHRICHT *"
                  rows={4}
                />
              </div>

              <div className="form-group">
                <button type="submit" disabled={state.submitting}>
                  {state.submitting ? "WIRD GESENDET..." : "NACHRICHT SENDEN"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kontakt; 