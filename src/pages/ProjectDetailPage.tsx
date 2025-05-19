import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Masonry from 'react-masonry-css';
import '../styles/ProjectDetailPage.css'; // We'll create this CSS file next

type Project = {
  id: string;
  title: string;
  categories: string[];
  image: string; 
  description: string;
  kunde: string;
  datum: string;
  standort: string;
  flache: string;
  images?: string[];
};

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>(); // Get project ID from URL
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) {
        setError('Project ID not found in URL.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId) // Filter by the ID from the URL
          .single(); // Expect only one result

        if (error) {
          throw error;
        }
        if (data) {
           // Format arrays just in case
           const formattedData = {
             ...data, 
             categories: Array.isArray(data.categories) ? data.categories : [],
             images: Array.isArray(data.images) ? data.images : [] 
          };
          setProject(formattedData);
        } else {
          setError('Projekt nicht gefunden.');
        }
      } catch (err) {
        console.error('Error fetching project details:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch project details');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]); // Re-fetch if projectId changes

  if (loading) {
    return <div className="loading-indicator page-padding">Loading Projekt...</div>;
  }

  if (error) {
    return <div className="error-message page-padding">Error: {error}</div>;
  }

  if (!project) {
    // This case should ideally be covered by the error state, but added for robustness
    return <div className="error-message page-padding">Projekt konnte nicht geladen werden.</div>;
  }

  // Masonry layout breakpoints
  const breakpointColumnsObj = {
    default: 3, // default number of columns
    1100: 3,    // 3 columns for viewport width 1100px and above
    700: 2,     // 2 columns for viewport width 700px to 1099px
    500: 1      // 1 column for viewport width below 700px
  };

  // --- Render Project Details --- 
  return (
    <div className="project-detail-page">
      {loading ? (
        <div className="loading-indicator page-padding">Loading Projekt...</div>
      ) : error ? (
        <div className="error-message page-padding">Error: {error}</div>
      ) : !project ? (
        <div className="error-message page-padding">Projekt konnte nicht geladen werden.</div>
      ) : (
        <div className="project-detail-container">
          {/* Main Image Section */}
          <div className="main-image-section">
            <img src={project.image} alt={project.title} className="main-image" />
          </div>

          {/* Project Info Section */}
          <div className="project-detail-info">
            <h2>Details</h2>
            <div className="meta-grid">
              <div className="meta-item">
                <span className="meta-label">Kunde:</span>
                <span className="meta-value">{project.kunde}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Datum:</span>
                <span className="meta-value">{project.datum}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Standort:</span>
                <span className="meta-value">{project.standort}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Fläche:</span>
                <span className="meta-value">{project.flache}</span>
              </div>
              {project.categories && project.categories.length > 0 && (
                <div className="meta-item meta-item-full-width">
                  <span className="meta-label">Kategorien:</span>
                  <span className="meta-value">{project.categories.join(', ')}</span>
                </div>
              )}
            </div>
            
            <h2>Beschreibung</h2>
            <p className="project-description-text">{project.description}</p>
          </div>

          {/* Gallery Section */}
          {project.images && project.images.length > 0 && (
            <div className="gallery-section">
              <h2>Galerie</h2>
              <div className="gallery-grid">
                {project.images.map((image, index) => (
                  <div key={index} className="gallery-item">
                    <img src={image} alt={`${project.title} - Bild ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectDetailPage; 