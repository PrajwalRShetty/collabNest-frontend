
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';

const ViewSponsorProfile = () => {
  const { sponsorId } = useParams();
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSponsorData = async () => {
      try {
        const [profileRes, projectsRes] = await Promise.all([
          axios.get(`/sponsor/profile/${sponsorId}`),
          axios.get(`/sponsor/projects/${sponsorId}`)
        ]);
        setProfile(profileRes.data);
        setProjects(projectsRes.data.projects);
      } catch (err) {
        setError('Failed to fetch sponsor data');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsorData();
  }, [sponsorId]);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-6">
          <img
            src={profile.profileLogo || "/profile.jpeg"}
            alt={profile.name}
            className="w-32 h-32 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-gray-600">{profile.bio}</p>
            <p className="text-gray-500">{profile.location}</p>
          </div>
        </div>
      </div>

      {/* Active Projects Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Active Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.filter(project => project.status === 'pending').map((project) => (
            <div key={project._id} className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-3">{project.description}</p>
              
              <div className="mb-3">
                <h4 className="font-medium text-sm mb-1">Required Skills:</h4>
                <div className="flex flex-wrap gap-1">
                  {project.skillsRequired?.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Budget:</span> ${project.budget}</p>
                <p><span className="font-medium">Deadline:</span> {new Date(project.applicationDeadline).toLocaleDateString()}</p>
                <p><span className="font-medium">Duration:</span> {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</p>
                <p className="text-green-600 font-medium">Status: {project.status}</p>
              </div>
            </div>
          ))}
          {projects.filter(project => project.status === 'pending').length === 0 && (
            <p className="text-gray-500">No active projects at the moment.</p>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <div className="space-y-2">
          <p><span className="font-medium">Email:</span> {profile.contactInfo?.email}</p>
          {profile.contactInfo?.phoneNo && (
            <p><span className="font-medium">Phone:</span> {profile.contactInfo.phoneNo}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewSponsorProfile;
