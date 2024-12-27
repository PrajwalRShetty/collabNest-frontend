// StudentProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';

const ViewStudentProfile = () => {
  const { studentId } = useParams(); // Gets the studentId from the URL
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/student/profile/${studentId}`);
        setProfile(response.data);
      } catch (err) {
        setError('Failed to fetch profile');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [studentId]);

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
            className="w-32 h-32 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-gray-600">{profile.headline}</p>
            <p className="text-gray-500">{profile.location}</p>
            <p className="text-gray-500">{profile.connectionCount} connections</p>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Skills & Learning Progress</h2>
        <div className="space-y-6">
          {profile.skills?.map((skill, index) => (
            <div key={index} className="border rounded-lg p-4">
              {/* Skill Name */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-blue-800">
                  {skill.skillName}
                </h3>
              </div>

              {/* {profile.role === 'student' && (
                <> */}
              {skill.learningPath && skill.learningPath.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-md font-medium mb-2">Learning Path</h4>
                  <div className="space-y-2">
                    {skill.learningPath.map((path, pathIndex) => (
                      <div 
                        key={pathIndex}
                        className="flex items-center space-x-2"
                      >
                        <span className="text-green-600">•</span>
                        <span className="text-gray-700">{path}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources */}
              {skill.resources && skill.resources.length > 0 && (
                <div>
                  <h4 className="text-md font-medium mb-2">Learning Resources</h4>
                  <div className="space-y-2">
                    {skill.resources.map((resource, resourceIndex) => (
                      <div 
                        key={resourceIndex}
                        className="flex items-center space-x-2"
                      >
                        <span className="text-blue-600">📚</span>
                        <a
                          href={resource}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          {resource}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
                {/* </>
              )} */}
            </div>
          ))}
        </div>
      </div>


      {/* Additional sections based on connection status */}
      {profile.isConnected && (
        <>
          {/* Education Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            <p>{profile.education}</p>
          </div>

          {/* Projects Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.projects?.map((project, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.skills_involved?.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  {project.github_link && (
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                    >
                      GitHub Repository
                    </a>
                  )}
                </div>
              ))}
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
              {profile.contactInfo?.portfolio_link && (
                <p>
                  <span className="font-medium">Portfolio:</span>{' '}
                  <a
                    href={profile.contactInfo.portfolio_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Portfolio
                  </a>
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewStudentProfile;
