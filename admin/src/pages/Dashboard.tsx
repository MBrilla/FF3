import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import ProjectForm from '../components/ProjectForm'
import Layout from '../components/Layout'
import Stats from '../components/Stats'

interface Project {
  id: number
  title: string
  description: string
  image: string
  images: string[]
  categories: string[]
  kunde: string
  datum: string
  standort: string
  flache: string
  created_at: string
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | undefined>()
  const [searchTerm, setSearchTerm] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        throw error
      }
      
      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
      alert('Error fetching projects')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw error

      setProjects(projects.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Error deleting project')
    }
  }

  const handleEdit = (project: Project) => {
    setSelectedProject(project)
    setIsFormOpen(true)
  }

  const handleFormSubmit = () => {
    setIsFormOpen(false)
    setSelectedProject(undefined)
    fetchProjects()
  }

  const handleFormCancel = () => {
    setIsFormOpen(false)
    setSelectedProject(undefined)
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.kunde?.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  const stats = {
    totalProjects: projects.length,
    recentUploads: projects.filter(p => {
      const uploadDate = new Date(p.created_at)
      const now = new Date()
      const diffDays = Math.floor((now.getTime() - uploadDate.getTime()) / (1000 * 60 * 60 * 24))
      return diffDays <= 7
    }).length
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    )
  }

  if (isFormOpen) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={handleFormCancel} className="btn-secondary">
              ← Back
            </button>
            <h1 className="text-2xl font-bold">
              {selectedProject ? 'Edit Project' : 'Create New Project'}
            </h1>
          </div>
          <div className="card p-6">
            <ProjectForm
              project={selectedProject}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Projects Overview</h1>
          <button onClick={() => setIsFormOpen(true)} className="btn-primary">
            + Add New Project
          </button>
        </div>

        <Stats {...stats} />

        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded ${view === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded ${view === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-gray-500 text-lg">No projects found</p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="btn-primary mt-4"
            >
              Create your first project
            </button>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="card group">
                <div className="relative">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full aspect-[4/3] object-cover rounded-t-xl"
                    />
                  ) : (
                    <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center rounded-t-xl">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                  {project.images && project.images.length > 0 && (
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      {project.images.slice(0, 3).map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Gallery ${index + 1}`}
                          className="w-12 h-12 object-cover rounded-lg border-2 border-white shadow-sm"
                        />
                      ))}
                      {project.images.length > 3 && (
                        <div className="w-12 h-12 bg-black/50 rounded-lg border-2 border-white shadow-sm flex items-center justify-center text-white text-sm">
                          +{project.images.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-gray-600 line-clamp-2 mt-1">
                        {project.description}
                      </p>
                      {project.categories && project.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.categories.map((category) => (
                            <span
                              key={category}
                              className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded"
                            >
                              {category.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    {project.kunde && (
                      <div>
                        <h3 className="font-medium text-gray-500">Client</h3>
                        <p className="text-gray-900">{project.kunde}</p>
                      </div>
                    )}
                    {project.datum && (
                      <div>
                        <h3 className="font-medium text-gray-500">Date</h3>
                        <p className="text-gray-900">{project.datum}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <button
                      onClick={() => handleEdit(project)}
                      className="btn-secondary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <div key={project.id} className="card">
                <div className="flex gap-6 p-6">
                  <div className="w-48 flex-shrink-0">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full aspect-[4/3] object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center rounded-lg">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {project.title}
                        </h2>
                        <p className="text-gray-600 mt-1">
                          {project.description}
                        </p>
                        {project.categories && project.categories.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {project.categories.map((category) => (
                              <span
                                key={category}
                                className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded"
                              >
                                {category.toUpperCase()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="btn-secondary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                      {project.kunde && (
                        <div>
                          <h3 className="font-medium text-gray-500">Client</h3>
                          <p className="text-gray-900">{project.kunde}</p>
                        </div>
                      )}
                      {project.datum && (
                        <div>
                          <h3 className="font-medium text-gray-500">Date</h3>
                          <p className="text-gray-900">{project.datum}</p>
                        </div>
                      )}
                      {project.standort && (
                        <div>
                          <h3 className="font-medium text-gray-500">Location</h3>
                          <p className="text-gray-900">{project.standort}</p>
                        </div>
                      )}
                      {project.flache && (
                        <div>
                          <h3 className="font-medium text-gray-500">Area</h3>
                          <p className="text-gray-900">{project.flache}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
} 