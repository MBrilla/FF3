import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LeistungenPage.css';

const LeistungenPage: React.FC = () => {
  const processSteps = [
    {
      id: 'contact',
      title: 'Idee & Kontakt',
      description: 'Du hast eine Fläche, ein Anliegen oder nur eine vage Idee? Dann nimm gern Kontakt auf – per E-Mail, Telefon oder Social Media. Wir besprechen dein Vorhaben unverbindlich und direkt.'
    },
    {
      id: 'meeting',
      title: 'Erste Einschätzung',
      description: 'Per Bildern oder bei einem Vor-Ort-Termin verschaffen wir uns einen Eindruck vom Objekt. Mit gezielten Fragen klären wir, was technisch und gestalterisch möglich ist – und was du dir wünschst.'
    },
    {
      id: 'design',
      title: 'Entwurfsphase',
      description: 'Auf Basis deiner Infos entstehen erste digitale Entwürfe. Du erhältst eine Vorschau per E-Mail und kannst Feedback geben. Wir justieren das Design gemeinsam, bis es 100 % passt.'
    },
    {
      id: 'planning',
      title: 'Planung & Vorbereitung',
      description: 'Sind wir uns einig, planen wir die Umsetzung: Terminfindung, Materialauswahl, Wetterfenster und – wenn nötig – Vorarbeiten wie Grundierung oder Reinigung.'
    },
    {
      id: 'execution',
      title: 'Umsetzung & Abschluss',
      description: 'Am vereinbarten Termin setzen wir das Motiv um – vom Skizzieren bis zum letzten Detail. Je nach Fläche folgt ein optionaler Schutzauftrag. Danach: Abnahme, Freude & fertiges Kunstwerk.'
    }
  ];

  // Ref to store the animation frame request ID
  const rafId = useRef<number | null>(null);

  // Parallax Effect using requestAnimationFrame
  useEffect(() => {
    console.log('[Parallax Init]');
    // Only select img elements with .parallax-image, not icons or other content
    const parallaxImages = Array.from(document.querySelectorAll('img.parallax-image')) as HTMLElement[];
    if (parallaxImages.length === 0) {
        console.log('[Parallax Init] No parallax images found on mount.');
    }

    const handleParallax = () => {
      // Only select img elements with .parallax-image
      const currentImages = document.querySelectorAll('img.parallax-image');
      if (currentImages.length === 0) {
          rafId.current = requestAnimationFrame(handleParallax);
          return;
      }
      const windowHeight = window.innerHeight;
      currentImages.forEach((img, index) => {
        const speed = parseFloat(img.getAttribute('data-parallax-speed') || '0.4');
        const parent = img.parentElement;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        const elementVisible = rect.top < windowHeight && rect.bottom > 0;
        let translateValue = 0;
        if (elementVisible) {
          const elementCenterY = rect.top + rect.height / 2;
          const viewportCenterY = windowHeight / 2;
          const difference = elementCenterY - viewportCenterY;
          translateValue = difference * -1 * speed * 0.5;
        }
        if (index === 0) {
            console.log(`[Parallax Frame] Image 0 - Visible: ${elementVisible}, TranslateY: ${translateValue.toFixed(2)}`);
        }
        (img as HTMLElement).style.transform = `translateY(${translateValue}px)`;
      });
      rafId.current = requestAnimationFrame(handleParallax);
    };
    rafId.current = requestAnimationFrame(handleParallax);
    return () => {
      console.log('[Parallax Cleanup] Cancelling animation frame.');
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div className="leistungen-page">
      <section className="hero-section">
        <div className="hero-content-wrapper">
          <div className="hero-heading">
            <h1 className="text-align-left">
              <span className="animated-line line-1">MEHR ALS</span>
              <span className="animated-line line-2">FARBE AUF</span>
              <span className="animated-line line-3">MAUERN.</span>
            </h1>
          </div>
          <div className="hero-text">
            <p>
              Ob Fotorealismus, Graffiti- und Streetart, Comicstil oder weitere – wir gestalten Flächen, die beeindrucken.
              Unser Fokus liegt auf der perfekten Abstimmung zwischen Design und Umfeld: Raumwirkung, Umgebung, Architektur und Details greifen bei jedem Projekt harmonisch ineinander.
            </p>
            <p>
              Wir verwenden ausschließlich hochwertige Farben und Materialien, die brillante Ergebnisse und hohe Beständigkeit garantieren.
              Selbstverständlich bereiten wir jede Fläche fachgerecht und professionell vor – von der Grundierung bis zur abschließenden Klarlackierung.
            </p>
            <p>
              Für Unternehmen integrieren wir mithilfe von Schablonen alle Logos, Slogans und Corporate Designs exakt und markengerecht in das Gesamtkonzept – für einen überzeugenden Auftritt nach außen.
            </p>
          </div>
        </div>
      </section>

      <section className="services-section">
        {/* Full width image 1 */}
        <div className="service-item">
          <div className="service-full-image">
            <img 
              src="./Slider/flowerGRAD.png" 
              alt="Fassaden Vollbild" 
              className="parallax-image" 
              data-parallax-speed="0.4"
            />
          </div>
        </div>

        {/* Split layout 1 */}
        <div className="service-item">
          <div className="service-split">
            <div className="service-icon">
              <img src="./auschenwande.png" alt="Fassaden Icon" />
            </div>
            <div className="service-content">
              <h2>FASSADEN</h2>
              <p>Ob als visuelles Highlight, zur Verschönerung oder als kreative Werbefläche:
Künstlerisch gestaltete Fassaden schaffen Aufmerksamkeit und Wiedererkennung. Mit kreativen Konzepten und einem sicheren Gespür für Umgebung und Wirkung verwandeln wir kahle Mauern in markante Blickfänger.</p>
              <div className="cta-button-wrapper">
                <Link to="/projekte" className="cta-button">
                  <img src="./projekte button.png" alt="Zu unseren Projekten" style={{ width: 'clamp(200px, 30vw, 320px)' }} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Full width image 2 */}
        <div className="service-item">
          <div className="service-full-image">
            <img 
              src="./Leistungen/tigerGRAD.png" 
              alt="Innenräume Vollbild" 
              className="parallax-image"
              data-parallax-speed="0.3"
            />
          </div>
        </div>

        {/* Split layout 2 */}
        <div className="service-item">
          <div className="service-split">
            <div className="service-icon">
              <img src="./innen.png" alt="Innenräume Icon" />
            </div>
            <div className="service-content">
              <h2>INNENRÄUME</h2>
              <p>Individuell gestaltete Innenräume werten jede Umgebung auf – ob im privaten Zuhause, im Unternehmen oder in der Gastronomie. Gerade dort, wo man sich oft und lange aufhält, trägt eine durchdachte und visuell ansprechende Gestaltung wesentlich zur Atmosphäre und zum Wohlbefinden bei.</p>
              <div className="cta-button-wrapper">
                <Link to="/projekte" className="cta-button">
                  <img src="./projekte button.png" alt="Zu unseren Projekten" style={{ width: 'clamp(200px, 30vw, 320px)' }} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Full width image 3 */}
        <div className="service-item">
          <div className="service-full-image">
            <img 
              src="./Leistungen/birdGRAD.png" 
              alt="Objekte Vollbild" 
              className="parallax-image"
              data-parallax-speed="0.4"
            />
          </div>
        </div>

        {/* Split layout 3 */}
        <div className="service-item">
          <div className="service-split">
            <div className="service-icon">
              <img src="./objekte.png" alt="Objekte Icon" />
            </div>
            <div className="service-content">
              <h2>OBJEKTE</h2>
              <p>Objekte wie z.B. Stromkästen im öffentlichen Raum sind oft grau, unauffällig und werden häufig ungewollt beschriftet. Mit einer professionellen Gestaltung werden aus schlichten Stromkästen, Trafostationen und Ähnlichem echte Hingucker. Die Bemalung trägt nicht nur zur Verschönerung des Stadtbilds bei, sondern beugt auch unerwünschtem Vandalismus vor.</p>
              <div className="cta-button-wrapper">
                <Link to="/projekte" className="cta-button">
                  <img src="./projekte button.png" alt="Zu unseren Projekten" style={{ width: 'clamp(200px, 30vw, 320px)' }} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Full width image 4 */}
        <div className="service-item">
          <div className="service-full-image">
            <img 
              src="./Leistungen/canvasGRAD.png" 
              alt="Leinwände Vollbild" 
              className="parallax-image"
              data-parallax-speed="0.35"
            />
          </div>
        </div>

        {/* Split layout 4 */}
        <div className="service-item">
          <div className="service-split">
            <div className="service-icon">
              <img src="./leinwande.png" alt="Leinwände Icon" />
            </div>
            <div className="service-content">
              <h2>LEINWÄNDE</h2>
              <p>Wenn vor Ort nicht gesprüht werden kann oder soll, bieten wir individuelle Kunstwerke auf Leinwand oder hochwertigen Aluminiumverbundplatten.
Ob freie Arbeiten oder speziell für Sie angefertigte Unikate – diese Formate bringen urbane Gestaltung flexibel an jeden Ort.</p>
              <div className="cta-button-wrapper">
                <Link to="/projekte" className="cta-button">
                  <img src="./projekte button.png" alt="Zu unseren Projekten" style={{ width: 'clamp(200px, 30vw, 320px)' }} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="process-section">
        <h2>
          <span>SO LÄUFT EIN</span>
          <span className="highlight">FARBFINK AUFTRAG AB:</span>
        </h2>
        
        <div className="process-steps">
          {processSteps.map((step) => (
            <div key={step.id} className="process-step">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Info Section */}
      <section className="leistungen-pricing-info">
        <h3>WAS KOSTET DAS GANZE?</h3>
        <p>
          Unsere Arbeiten sind immer individuell auf das Projekt abgestimmt – deshalb können wir keine pauschalen Preise angeben.<br />
          Die Kosten richten sich nach mehreren Faktoren: dem gewünschten Motiv, der Größe der Fläche, dem Zustand des Untergrunds und dem Aufwand für Vorbereitung und Umsetzung.<br /><br />
          Melde dich einfach – wir beraten dich gerne und erstellen dir ein unverbindliches Angebot.
        </p>
      </section>

      <section className="contact-section">
        <h2>KONTAKTIEREN SIE UNS!</h2>
        <Link to="/kontakt" className="contact-button">Anfrage stellen</Link>
      </section>
    </div>
  );
};

export default LeistungenPage;