import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';

const StudentProjects = () => {
  const navigate = useNavigate();
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
        console.log('Fetched projects:', response.data.projects);
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

  const handleApply = async (projectId) => {
    try {
      await axiosInstance.post(`/student/apply-project/${projectId}`);
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
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Available Projects</h1>
        <p className="text-gray-600">Discover and apply for exciting project opportunities</p>
      </div>

      {/* Filters Section */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Skills</label>
            <input
              type="text"
              placeholder="Search by skill..."
              className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Budget Range</label>
            <select
              className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
            >
              <option value="">All Budgets</option>
              <option value="0-1000">₹0 - ₹1,000</option>
              <option value="1001-5000">₹1,001 - ₹5,000</option>
              <option value="5001+">₹5,001+</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Project Status</label>
            <select
              className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="active">Active Projects</option>
              <option value="all">All Projects</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center mb-6">
          {error}
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div key={project._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                <span className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full">
                  ₹{project.budget}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4 ">{project.description}</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Required Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.skillsRequired.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Deadline: {new Date(project.applicationDeadline).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{project.sponsorName}</span>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6">
            <button
              onClick={() => handleApply(project._id)}
              disabled={project.hasApplied}
              className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 ${
                project.hasApplied
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow'
              }`}
            >
              {project.hasApplied ? 'Applied' : 'Apply Now'}
            </button>
          </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">
            No projects found matching your criteria.
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProjects;
