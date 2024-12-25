import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';

const StudentProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    skill: '',
    budget: '',
    status: 'active'
  });

  // Fetch all available projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/student/available-projects');
      if (response.data && response.data.projects) {
        console.log('Fetched projects:', response.data.projects); // Debug log
        setProjects(response.data.projects);
      }
      setError(null);
    } catch (err) {
      setError('Failed to fetch projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle project application
  const handleApply = async (projectId) => {
    try {
      await axiosInstance.post(`/student/apply-project/${projectId}`);
      // Update the project status in the UI
      setProjects(projects.map(project => 
        project._id === projectId 
          ? { ...project, hasApplied: true }
          : project
      ));
      alert('Application submitted successfully!');
    } catch (err) {
      alert('Failed to submit application. Please try again.');
      console.error('Error applying to project:', err);
    }
  };

  // Filter projects based on user input
  const filteredProjects = projects.filter(project => {
    const matchesSkill = project.skillsRequired.some(skill =>
      skill.toLowerCase().includes(filters.skill.toLowerCase())
    );
    
    const matchesBudget = filters.budget === '' || 
      (filters.budget === '0-1000' && project.budget <= 1000) ||
      (filters.budget === '1001-5000' && project.budget > 1000 && project.budget <= 5000) ||
      (filters.budget === '5001+' && project.budget > 5000);
    
    const matchesStatus = filters.status === 'all' || project.status === 'pending';

    return matchesSkill && matchesBudget && matchesStatus;
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-red-500 text-center p-4">
      Error: {error}
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      {/* Filters */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by skill..."
            className="border rounded p-2"
            onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
          />
          <select
            className="border rounded p-2"
            onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
          >
            <option value="">All Budgets</option>
            <option value="0-1000">$0 - $1000</option>
            <option value="1001-5000">$1001 - $5000</option>
            <option value="5001+">$5001+</option>
          </select>
          <select
            className="border rounded p-2"
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="active">Active Projects</option>
            <option value="all">All Projects</option>
          </select>
        </div>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project._id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Required Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {project.skillsRequired.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded"
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
                Start Date: {new Date(project.startDate).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                End Date: {new Date(project.endDate).toLocaleDateString()}
              </p>
              {project.sponsorName && (
                <p className="text-gray-700">Posted by: {project.sponsorName}</p>
              )}
            </div>

            <button
              onClick={() => handleApply(project._id)}
              disabled={project.hasApplied}
              className={`w-full py-2 px-4 rounded ${
                project.hasApplied
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {project.hasApplied ? 'Applied' : 'Apply Now'}
            </button>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No projects found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default StudentProjects;
