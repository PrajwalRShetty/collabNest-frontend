import React, { useState, useEffect } from "react";
import ProjectSponsorProfile from "../components/SponsorProfile";
import Projects from "../components/SponsorProjects";
import axiosInstance from "../utils/axios";

const SponsorProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null); 
  const [isLoading, setIsLoading] = useState(false); 

  const updateProfile = async (updateData) => {
    try {
      console.log(updateData);
      const response = await axiosInstance.put("/sponsor/update-profile", updateData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setProfile({
          ...response.data.profile,
          name: response.data.user.name,
          backgroundImage: response.data.profile.backgroundImage,
        });
        setError(null);
      }
    } catch (error) {
      setError("Error updating profile");
      console.error("Error updating profile:", error.response?.data || error.message);
    }
  };

  // Fetch sponsor profile data
  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/sponsor/profile");
      setProfile(response.data.profile);
      setError(null); 
    } catch (error) {
      setError("Error fetching profile");
      console.error("Error fetching profile:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get("/sponsor/projects");
      console.log('Fetched projects with IDs:', response.data.projects);
      setProjects(response.data.projects);
      setError(null);
    } catch (error) {
      setError("Error fetching projects");
      console.error("Error fetching projects:", error.response?.data || error.message);
    }
  };

  // Add a new project
  const addProject = async (newProject) => {
    try {
      const response = await axiosInstance.post("/sponsor/projects", newProject);
      setProjects([...projects, response.data.project]); 
      setError(null);
    } catch (error) {
      setError("Error adding project");
      console.error("Error adding project:", error.response?.data || error.message);
    }
  };

  // Update a project
  const updateProject = async (updatedProject) => {
    try {
      const response = await axiosInstance.put(`/sponsor/projects/${updatedProject._id}`, updatedProject);
      setProjects(
        projects.map((project) =>
          project._id === updatedProject._id ? response.data.project : project
        )
      );
      setError(null);
    } catch (error) {
      setError("Error updating project");
      console.error("Error updating project:", error.response?.data || error.message);
    }
  };

  // Delete a project
  const deleteProject = async (projectId) => {
    try {
      await axiosInstance.delete(`/sponsor/projects/${projectId}`);
      setProjects(projects.filter((project) => project._id !== projectId));
      setError(null);
    } catch (error) {
      setError("Error deleting project");
      console.error("Error deleting project:", error.response?.data || error.message);
    }
  };


  useEffect(() => {
    fetchProfile();
    fetchProjects();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Unable to load profile. Please try again later.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Display error messages */}
      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* Sponsor Profile Section */}
      <ProjectSponsorProfile profile={profile} updateProfile={updateProfile} />

      <div className="mt-6 px-4 py-4">
        <Projects
          projects={projects}
          addProject={addProject}
          updateProject={updateProject}
          deleteProject={deleteProject}
        />
      </div>

    </div>
  );
};

export default SponsorProfilePage;
