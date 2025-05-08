import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import ProjektePage from './pages/ProjektePage.tsx'
import ProjectDetailPage from './pages/ProjectDetailPage.tsx'
import Kontakt from './pages/Kontakt'
import Impressum from './pages/Impressum.tsx'
import Datenschutz from './pages/Datenschutz.tsx'
import AGB from './pages/AGB.tsx'
import LeistungenPage from './pages/LeistungenPage'
import AboutUsPage from './pages/AboutUsPage.tsx'
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/leistungen" element={<LeistungenPage />} />
            <Route path="/projekte" element={<ProjektePage />} />
            <Route path="/projekte/:projectId" element={<ProjectDetailPage />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/agb" element={<AGB />} />
            <Route path="/farbfink" element={<AboutUsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
