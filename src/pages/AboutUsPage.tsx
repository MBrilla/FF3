import React from 'react';
import '../styles/AboutUsPage.css';

const AboutUsPage: React.FC = () => {
  return (
    <div className="aboutus-page">
      <section className="aboutus-hero">
        <img src="/Farbfink/umutmalt1GRAD.png" alt="Umut Yilgenci" className="aboutus-hero-img" />
        <div className="aboutus-hero-content">
          <h1>FARBFINK</h1>
          <h2>Umut Yilgenci</h2>
          <p>Kunst. Konzept. Kontrast.</p>
        </div>
      </section>

      <section className="aboutus-mission">
      <img src="/Leistungen/kingfisherGRAD.png" alt="kingfisher" className="mission-img" />
        <div className="mission-content">
          <h2>ÜBER UNS</h2>
          <p>
            Farbfink ist das kreative Studio von <strong>Umut Yilgenci</strong>, einem Künstler, der für seine einzigartigen Fassaden- und Innenraumgestaltungen bekannt ist. Mit einer Leidenschaft für urbane Kunst, innovative Konzepte und mutige Farbkombinationen verwandelt Umut graue Flächen in lebendige Kunstwerke.
          </p>
        </div>
        
      </section>

      <section className="aboutus-quote">
        <div className="quote-content">
          <h3>"Kunst ist mehr als Farbe – sie ist ein Statement."</h3>
        </div>
      </section>

      <section className="aboutus-vision">
        <img src="/Farbfink/umutmalt3GRAD.png" alt="Kunstwerk in Entstehung" className="vision-img" />
        <div className="vision-content">
          <h2>UNSERE MISSION</h2>
          <p>
            Unsere Mission ist es, Räume zu inspirieren, Menschen zu verbinden und mit Kunst neue Perspektiven zu schaffen. Ob öffentliche Gebäude, Unternehmen oder private Räume – wir begleiten Sie von der ersten Idee bis zum fertigen Kunstwerk.
          </p>
          <p>
            Jedes Projekt ist ein Unikat – von großflächigen Murals bis zu detailverliebten Workshops. Lassen Sie sich von unseren Projekten inspirieren oder nehmen Sie direkt Kontakt auf. Wir freuen uns auf Ihre Vision!
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage; 