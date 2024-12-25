import React, { useState, useEffect } from "react";
import StudentProfile from "../components/StudentProfile";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import axiosInstance from "../utils/axios";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({
    skillName: "",
    learningPath: [],
    resources: [],
  }); // Separate state for the new skill
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null); 
  const [isLoading, setIsLoading] = useState(false); 


  const updateProfile = async (updateData) => {
    try {
      const response = await axiosInstance.put("/student/update-profile", updateData, {
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

  const handleAddSkill = async (skillData) => {
    try {
      const response = await axiosInstance.post("/student/skills", {
        skillName: skillData.skillName,
        learningPath: skillData.learningPath,
        resources: skillData.resources
      });
  
      if (response.status === 201) {
        setSkills(prevSkills => [...prevSkills, response.data.skill]);
        return true;
      }
    } catch (error) {
      console.error("Error adding skill:", error.response?.data || error.message);
      throw error;
    }
  };
  
  const handleDeleteSkill = async (skillName) => {
    try {
      const response = await axiosInstance.delete(`/student/skills`, {
        data: { skillName }
      });
  
      if (response.status === 200) {
        setSkills((prevSkills) =>
          prevSkills.filter((skill) => skill.skillName !== skillName)
        );
        setError(null);
      }
    } catch (error) {
      setError("Error deleting skill");
      console.error("Error deleting skill:", error.response?.data || error.message);
    }
  };

  const handleUpdateSkill = async (updatedSkill) => {
    try {
      const response = await axiosInstance.put("/student/skills", updatedSkill);
  
      if (response.status === 200 && response.data?.updatedSkill) {
        // Update the skills list after a successful update
        setSkills((prevSkills) =>
          prevSkills.map((skill) =>
            skill._id === updatedSkill._id ? response.data.updatedSkill : skill
          )
        );
        setError(null);
      } else {
        console.error("Invalid response structure:", response.data);
        setError("Error updating skill, invalid response from server.");
      }
    } catch (error) {
      setError("Error updating skill");
      console.error("Error updating skill:", error?.response?.data || error.message);
    }
  };

  // Add a new project
  const addProject = async (project) => {
    try {
      const response = await axiosInstance.post("/student/project", project);
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

  const handleDeleteProject = async (projectId) => {
    try {
      const response = await axiosInstance.delete(`/student/project/${projectId}`);
      if (response.status === 200) {
        setProjects((prevProjects) => prevProjects.filter((project) => project._id !== projectId));
        setError(null);
      }
    } catch (error) {
      setError("Error deleting project");
      console.error("Error deleting project:", error.response?.data || error.message);
    }
  };
  
  const handleUpdateProject = async (updatedProject) => {
    try {
      const response = await axiosInstance.put(`/student/project/${updatedProject._id}`, updatedProject);
      if (response.status === 200 && response.data?.updatedProject) {
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project._id === updatedProject._id ? response.data.updatedProject : project
          )
        );
        setError(null);
      }
    } catch (error) {
      setError("Error updating project");
      console.error("Error updating project:", error.response?.data || error.message);
    }
  };
  

  useEffect(() => {
    fetchProfile();
  }, []);

  if (isLoading) {
    return <div>Load...</div>;
  }

  if (!profile) {
    return <div>Unable to load profile. Please try again later.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Display error messages */}
      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* User Profile Section */}
      <StudentProfile profile={profile} updateProfile={updateProfile} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Skills Section */}
        <Skills skills={skills || []} addSkill={handleAddSkill} deleteSkill={handleDeleteSkill} updateSkill={handleUpdateSkill} newSkill={newSkill} setNewSkill={setNewSkill} />

        {/* Projects Section */}
        <Projects projects={projects} addProject={addProject} deleteProject={handleDeleteProject} updateProject={handleUpdateProject}/>

      </div>
    </div>
  );
};

export default ProfilePage;
