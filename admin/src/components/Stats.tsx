interface StatsProps {
  totalProjects: number
  recentUploads: number
}

export default function Stats({ totalProjects, recentUploads }: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">Total Projects</h3>
            <p className="text-2xl font-semibold text-gray-900">{totalProjects}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-purple-50 text-purple-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">Recent Uploads</h3>
            <p className="text-2xl font-semibold text-gray-900">{recentUploads}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 