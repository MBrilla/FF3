import { useState } from 'react'
import { supabase } from '../lib/supabase'

interface ProjectFormProps {
  project?: {
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
  }
  onSubmit: () => void
  onCancel: () => void
}

// Define available categories
const AVAILABLE_CATEGORIES = [
  { id: 'freiearbeiten', label: 'FREIE ARBEITEN' },
  { id: 'fassaden', label: 'FASSADEN' },
  { id: 'innenraume', label: 'INNENRÄUME' },
  { id: 'objekte', label: 'OBJEKTE' },
  { id: 'leinwande', label: 'LEINWÄNDE' }
]

export default function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const [title, setTitle] = useState(project?.title || '')
  const [description, setDescription] = useState(project?.description || '')
  const [mainImage, setMainImage] = useState<File | null>(null)
  const [galleryImages, setGalleryImages] = useState<File[]>([])
  const [kunde, setKunde] = useState(project?.kunde || '')
  const [datum, setDatum] = useState(project?.datum || '')
  const [standort, setStandort] = useState(project?.standort || '')
  const [flache, setFlache] = useState(project?.flache || '')
  const [categories, setCategories] = useState<string[]>(project?.categories || [])
  const [loading, setLoading] = useState(false)
  const [mainImagePreview, setMainImagePreview] = useState(project?.image || '')
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(project?.images || [])

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setMainImage(file)
      setMainImagePreview(URL.createObjectURL(file))
    }
  }

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setGalleryImages(files)
      const previews = files.map(file => URL.createObjectURL(file))
      setGalleryPreviews(previews)
    }
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString())
    e.currentTarget.classList.add('dragging')
  }

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('dragging')
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.add('drag-over')
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('drag-over')
  }

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()
    e.currentTarget.classList.remove('drag-over')
    
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'))
    if (sourceIndex === targetIndex) return

    // Reorder previews
    const newPreviews = [...galleryPreviews]
    const [movedItem] = newPreviews.splice(sourceIndex, 1)
    newPreviews.splice(targetIndex, 0, movedItem)
    setGalleryPreviews(newPreviews)

    // Reorder files if they exist
    if (galleryImages.length > 0) {
      const newFiles = [...galleryImages]
      const [movedFile] = newFiles.splice(sourceIndex, 1)
      newFiles.splice(targetIndex, 0, movedFile)
      setGalleryImages(newFiles)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let mainImageUrl = project?.image || ''
      let galleryUrls = project?.images || []

      // Upload main image if changed
      if (mainImage) {
        const fileExt = mainImage.name.split('.').pop()
        const fileName = `main_${Math.random()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, mainImage)

        if (uploadError) throw uploadError
        
        const { data: { publicUrl } } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName)
          
        mainImageUrl = publicUrl
      }

      // Upload new gallery images if any
      if (galleryImages.length > 0) {
        const newGalleryUrls = await Promise.all(
          galleryImages.map(async (file) => {
            const fileExt = file.name.split('.').pop()
            const fileName = `gallery_${Math.random()}.${fileExt}`
            const { error: uploadError } = await supabase.storage
              .from('project-images')
              .upload(fileName, file)

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
              .from('project-images')
              .getPublicUrl(fileName)

            return publicUrl
          })
        )
        galleryUrls = newGalleryUrls
      }

      // If we have existing images and no new uploads, use the reordered previews
      if (galleryImages.length === 0 && galleryPreviews.length > 0) {
        galleryUrls = galleryPreviews
      }

      const projectData = {
        title,
        description,
        image: mainImageUrl,
        images: galleryUrls, // This will maintain the order
        categories,
        kunde,
        datum,
        standort,
        flache
      }

      if (project?.id) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', project.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([projectData])
        if (error) throw error
      }

      onSubmit()
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Error saving project')
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryToggle = (categoryId: string) => {
    setCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="input"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="label">Categories</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {AVAILABLE_CATEGORIES.map((category) => (
              <label
                key={category.id}
                className="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={categories.includes(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                  className="form-checkbox h-4 w-4 text-primary"
                />
                <span>{category.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="label">Client</label>
          <input
            type="text"
            value={kunde}
            onChange={(e) => setKunde(e.target.value)}
            className="input"
          />
        </div>

        <div>
          <label className="label">Date</label>
          <input
            type="text"
            value={datum}
            onChange={(e) => setDatum(e.target.value)}
            className="input"
          />
        </div>

        <div>
          <label className="label">Location</label>
          <input
            type="text"
            value={standort}
            onChange={(e) => setStandort(e.target.value)}
            className="input"
          />
        </div>

        <div>
          <label className="label">Area</label>
          <input
            type="text"
            value={flache}
            onChange={(e) => setFlache(e.target.value)}
            className="input"
          />
        </div>

        <div className="md:col-span-2">
          <label className="label">Main Image</label>
          <div className="flex items-center gap-4">
            {mainImagePreview ? (
              <img
                src={mainImagePreview}
                alt="Main preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
            <input
              type="file"
              onChange={handleMainImageChange}
              accept="image/*"
              className="input flex-1"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="label">Gallery Images</label>
          <div className="space-y-4">
            <div className="flex gap-4 overflow-x-auto pb-4">
              {galleryPreviews.map((preview, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                  className="relative group transition-transform duration-200"
                >
                  <img
                    src={preview}
                    alt={`Gallery ${index + 1}`}
                    className="w-32 h-32 object-cover rounded-lg flex-shrink-0 cursor-move"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">Drag to reorder</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setGalleryPreviews(prev => prev.filter((_, i) => i !== index))
                      setGalleryImages(prev => prev.filter((_, i) => i !== index))
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
              {galleryPreviews.length === 0 && (
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-400">No images</span>
                </div>
              )}
            </div>
            <input
              type="file"
              onChange={handleGalleryImagesChange}
              accept="image/*"
              multiple
              className="input"
            />
            {galleryPreviews.length > 0 && (
              <p className="text-sm text-gray-500">
                Drag and drop images to reorder them. The order will be preserved on the frontend.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
        >
          {loading ? 'Saving...' : project?.id ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  )
} 