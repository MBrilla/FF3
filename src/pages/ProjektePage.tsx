import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Import Supabase client
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/ProjektePage.css';

type Project = {
  id: string;
  title: string;
  categories: string[];
  image: string; // URL from Supabase Storage
  description: string;
  kunde: string;
  datum: string;
  standort: string;
  flache: string;
  images?: string[]; // URLs from Supabase Storage
};

type Category = {
  id: string;
  label: string;
};

// Keep hardcoded categories for filtering UI for now
const categories: Category[] = [
  { id: 'alle', label: 'ALLE' },
  { id: 'freiearbeiten', label: 'FREIE ARBEITEN' },
  { id: 'fassaden', label: 'FASSADEN' },
  { id: 'innenraume', label: 'INNENRÄUME' },
  { id: 'objekte', label: 'OBJEKTE' }, 
  { id: 'leinwande', label: 'LEINWÄNDE' } 
];

// --- Removed hardcoded projectsData --- 

const ProjektePage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('alle');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook for navigation

  // Fetch projects from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('projects') // Your table name
          .select('*')
          .order('created_at', { ascending: false }); // Optional: order by creation date

        if (error) {
          throw error;
        }
        if (data) {
          // Ensure categories and images are arrays (handle potential nulls from DB)
          const formattedData = data.map(proj => ({ 
             ...proj, 
             categories: Array.isArray(proj.categories) ? proj.categories : [],
             images: Array.isArray(proj.images) ? proj.images : [] 
          }));
          setProjects(formattedData);
          setFilteredProjects(formattedData);
        } else {
          setProjects([]);
          setFilteredProjects([]);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
        setProjects([]);
        setFilteredProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []); // Empty dependency array means fetch only on mount

  // Filter projects when category changes
  useEffect(() => {
    if (selectedCategory === 'alle') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => 
          project.categories && project.categories.includes(selectedCategory)
        )
      );
    }
  }, [selectedCategory, projects]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleProjectClick = (project: Project) => {
    navigate(`/projekte/${project.id}`); // Navigate to detail page
  };

  return (
    <div className="projekte-page">
      {/* Re-add Heading Section */}
      <section className="page-heading-section">
        <h1>
          <span>UNSERE PROJEKTE</span>
          <span className="highlight">IN DER ÜBERSICHT</span>
        </h1>
      </section>

      {/* Category Filter Buttons */}
      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Loading and Error States */}
      {loading && <div className="loading-indicator">Loading Projekte...</div>}
      {error && <div className="error-message">Error: {error}</div>}

      {/* Project Grid */}
      {!loading && !error && (
        <div className="project-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-item" onClick={() => handleProjectClick(project)}>
              <div className="project-image-container">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjektePage; 