
import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';
import EnrolledStudents from '../components/EnrolledStudent';

const SponsorDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get('/sponsor/projects');
        setProjects(response.data.projects);
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600 mb-4">{project.description}</p>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Required Skills:</h3>
              <div className="flex flex-wrap gap-2">
                {project.skillsRequired.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700">Budget: ${project.budget}</p>
              <p className="text-gray-700">
                Deadline: {new Date(project.applicationDeadline).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                Status: {project.status}
              </p>
              <p className="text-gray-700">
                Enrolled Students: {project.enrolledStudents.length}</p>
              <p className="text-gray-700">
                Selected Students: {project.selectedStudents.length}
              </p>
            </div>

            <button
              onClick={() => setSelectedProjectId(project._id)}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              View Enrolled Students
            </button>
          </div>
        ))}
      </div>

      {selectedProjectId && (
        <EnrolledStudents
          projectId={selectedProjectId}
          onClose={() => setSelectedProjectId(null)}
        />
      )}
    </div>
  );
};

export default SponsorDashboard;
