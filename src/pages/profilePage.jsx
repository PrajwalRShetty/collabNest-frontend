import React, { useState, useEffect } from "react";
import UserProfile from "../components/UserProfile";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import axiosInstance from "../utils/axios";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null); // Error state for UI feedback
  const [isLoading, setIsLoading] = useState(false); // Loading state for API calls

  const updateProfile = async (updateData) => {
    try {
      const response = await axiosInstance.put("/student/update-profile", updateData);
      if (response.status === 200) {
        console.log("helo",response.data.profile);
        setProfile({
          ...response.data.profile,
          name: response.data.user.name, // Ensure name is updated in the state
        });
        setError(null);
      }
    } catch (error) {
      setError("Error updating profile");
      console.error("Error updating profile:", error.response?.data || error.message);
    }
  };

  // Fetch profile data from the backend
  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/student/profile");
      setProfile(response.data.profile);
      setSkills(response.data.profile.skills);
      setProjects(response.data.profile.projects);
      setError(null); // Clear previous errors
    } catch (error) {
      setError("Error fetching profile");
      console.error("Error fetching profile:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new project
  const addProject = async (project) => {
    try {
      const response = await axiosInstance.post("/student/add-project", project);
      if (response.status === 201) {
        // Update projects state directly instead of refetching profile
        setProjects((prevProjects) => [...prevProjects, response.data.project]);
        setError(null);
      }
    } catch (error) {
      setError("Error adding project");
      console.error("Error adding project:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Unable to load profile. Please try again later.</div>;
  }

  return (
    <div className="container mx-auto p-4 ">
      {/* Display error messages */}
      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* User Profile Section */}
      <UserProfile profile={profile} updateProfile={updateProfile} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Skills Section */}
        <Skills skills={skills} addSkill={fetchProfile} />

        {/* Projects Section */}
        <Projects projects={projects} addProject={addProject} />
      </div>
    </div>
  );
};

export default ProfilePage;
