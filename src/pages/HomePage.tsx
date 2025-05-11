import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
import ImageSlider from '../components/ImageSlider';

const images = [
  '/Slider/QiubiteGRAD.png',
  '/Slider/flowerGRAD.png',
  '/Slider/cranegirlrGRAD.png',
  '/Slider/umutmalt1GRAD.png',
];

const HomePage: React.FC = () => {
  const [visibleWords, setVisibleWords] = useState(0);

  useEffect(() => {
    const queries = [
      { name: 'max-width: 400px', mq: window.matchMedia('(max-width: 400px)') },
      { name: 'max-width: 600px', mq: window.matchMedia('(max-width: 600px)') },
      { name: 'max-width: 900px', mq: window.matchMedia('(max-width: 900px)') },
      { name: 'desktop (min-width: 901px)', mq: window.matchMedia('(min-width: 901px)') },
    ];

    function logActiveQuery() {
      const active = queries.find(q => q.mq.matches);
      if (active) {
        console.log('Active media query:', active.name);
      }
    }

    queries.forEach(q => q.mq.addEventListener('change', logActiveQuery));
    logActiveQuery(); // Log on mount

    window.addEventListener('resize', logActiveQuery);

    return () => {
      queries.forEach(q => q.mq.removeEventListener('change', logActiveQuery));
      window.removeEventListener('resize', logActiveQuery);
    };
  }, []);

  useEffect(() => {
    // Reveal each word in sequence, then stop
    if (visibleWords < 3) {
      const wordTimeout = setTimeout(() => {
        setVisibleWords((prev) => prev + 1);
      }, 350); // Quick reveal, adjust as needed
      return () => clearTimeout(wordTimeout);
    }
  }, [visibleWords]);

  return (
    <div className="homepage-container">
      <section className="hero">
        <div className="slider-container">
          <ImageSlider images={images} interval={5000} />
        </div>
        <div className="hero-content">
          <div className="animated-text-container">
            <div className="word-pop-row">
              <span className={`pop-word${visibleWords > 0 ? ' visible' : ''}`}>Kunst.</span>
              <span className={`pop-word${visibleWords > 1 ? ' visible' : ''}`}>Konzept.</span>
              <span className={`pop-word${visibleWords > 2 ? ' visible' : ''}`}>Kontrast.</span>
            </div>
          </div>
          <h2 className="hero-subline">Individuelle Gestaltung für Raum & Objekt.</h2>
        </div>
      </section>

      <section className="intro-section">
        <div className="intro-content">
          <h1>
            Willkommen bei Farbfink 
          </h1>
          <h1>Kreative Fassadengestaltung & Kunst im Raum</h1>
          <h2>
            Wir begleiten jedes Projekt von der Idee bis zum fertigen Werk. Mit Leidenschaft für Kunst, Handwerk und Stil.
          </h2>
          <Link to="/projekte" className="projekte-image-button">
            <img src="./output-onlinepngtools (1).png" alt="Projekte" style={{ width: '320px', maxWidth: '90%', borderRadius: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;