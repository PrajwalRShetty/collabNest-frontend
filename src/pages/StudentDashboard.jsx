// StudentProjects.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';

const StudentDashboard = () => {
  const [projects, setProjects] = useState({
    appliedProjects: [],
    selectedProjects: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get('/student/projects');
        setProjects(response.data);
      } catch (err) {
        setError('Failed to fetch projects');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-red-500 text-lg font-semibold bg-red-50 px-6 py-4 rounded-lg">
        Error: {error}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Selected Projects Section */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          Selected Projects
        </h2>
        {projects.selectedProjects.length === 0 ? (
          <p className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
            No selected projects yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.selectedProjects.map((project) => (
              <div 
                key={project.projectId} 
                className="border rounded-xl p-6 hover:shadow-md transition-shadow duration-300 bg-gray-50"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 flex items-center">
                  <span className="mr-2">
                    🏢
                  </span>
                  {project.sponsorName}
                </p>
                <p className="mb-4 text-gray-700">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skillsRequired?.map((skill, index) => (
                    <span 
                      key={index} 
                      className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="text-sm space-y-2 text-gray-600 border-t pt-4">
                  <p className="flex justify-between">
                    <span className="font-medium">Start Date:</span>
                    <span>{new Date(project.startDate).toLocaleDateString()}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">End Date:</span>
                    <span>{new Date(project.endDate).toLocaleDateString()}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Project Status:</span>
                    <span className="capitalize text-green-600 font-medium">
                      {project.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Applied Projects Section */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          Applied Projects
        </h2>
        {projects.appliedProjects.length === 0 ? (
          <p className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
            No applications yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.appliedProjects.map((project) => (
              <div 
                key={project.projectId} 
                className="border rounded-xl p-6 hover:shadow-md transition-shadow duration-300 bg-gray-50"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 flex items-center">
                  <span className="mr-2">
                    🏢
                  </span>
                  {project.sponsorName}
                </p>
                <p className="mb-4 text-gray-700">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skillsRequired?.map((skill, index) => (
                    <span 
                      key={index} 
                      className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="text-sm space-y-2 text-gray-600 border-t pt-4">
                  <p className="flex justify-between">
                    <span className="font-medium">Applied Date:</span>
                    <span>{new Date(project.appliedDate).toLocaleDateString()}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Status:</span>
                    <span className={`capitalize font-medium ${
                      project.status === 'accepted' ? 'text-green-600' : 
                      project.status === 'rejected' ? 'text-red-600' : 
                      'text-yellow-600'
                    }`}>
                      {project.status}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Deadline:</span>
                    <span>{new Date(project.applicationDeadline).toLocaleDateString()}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default StudentDashboard;
