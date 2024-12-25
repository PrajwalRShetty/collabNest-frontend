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

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      {/* Selected Projects Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Selected Projects</h2>
        {projects.selectedProjects.length === 0 ? (
          <p>No selected projects yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.selectedProjects.map((project) => (
              <div key={project.projectId} className="border rounded-lg p-4 shadow-sm bg-white">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-2">By {project.sponsorName}</p>
                <p className="mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.skillsRequired?.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <p>Start Date: {new Date(project.startDate).toLocaleDateString()}</p>
                  <p>End Date: {new Date(project.endDate).toLocaleDateString()}</p>
                  <p>Project-Status: <span className="capitalize">{project.status}</span></p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Applied Projects Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Applied Projects</h2>
        {projects.appliedProjects.length === 0 ? (
          <p>No applications yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.appliedProjects.map((project) => (
              <div key={project.projectId} className="border rounded-lg p-4 shadow-sm bg-white">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-2">By {project.sponsorName}</p>
                <p className="mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.skillsRequired?.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <p>Applied Date: {new Date(project.appliedDate).toLocaleDateString()}</p>
                  <p>Application Status: 
                    <span className={`capitalize ml-1 font-medium
                      ${project.status === 'accepted' ? 'text-green-600' : 
                        project.status === 'rejected' ? 'text-red-600' : 
                        'text-yellow-600'}`}>
                      {project.status}
                    </span>
                  </p>
                  <p>Deadline: {new Date(project.applicationDeadline).toLocaleDateString()}</p>
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
