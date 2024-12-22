import React, { useState } from "react";

const Projects = ({ projects, addProject }) => {
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    skills_involved: "",
    github_link: "",
  });
  const [isSaving, setIsSaving] = useState(false); // Loading state for saving a project
  const [error, setError] = useState(null); // Error state for project submission

  const handleAddProject = async () => {
    // Validate inputs
    if (!newProject.title || !newProject.description || !newProject.github_link) {
      setError("Title, description, and GitHub link are required.");
      return;
    }

    setError(null); // Clear previous errors
    setIsSaving(true);

    try {
      await addProject(newProject);
      setNewProject({ title: "", description: "", skills_involved: "", github_link: "" });
    } catch (error) {
      setError("Error adding project. Please try again.");
      console.error("Error adding project:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">Projects</h2>

      {/* List of projects */}
      <ul>
        {projects.map((project, index) => (
          <li key={index} className="my-2">
            <h3 className="font-medium">{project.title}</h3>
            <p>{project.description}</p>
            <p>Skills: {project.skills_involved}</p>
            <a href={project.github_link} className="text-blue-500" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
        ))}
      </ul>

      {/* Error message */}
      {error && <div className="text-red-500">{error}</div>}

      {/* Form for adding a new project */}
      <div className="mt-4">
        {["title", "description", "skills_involved", "github_link"].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field}
            className="border rounded p-2 w-full mb-2"
            value={newProject[field]}
            onChange={(e) => setNewProject({ ...newProject, [field]: e.target.value })}
          />
        ))}
        <button
          onClick={handleAddProject}
          className="bg-purple-500 text-white px-4 py-2 rounded"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Add Project"}
        </button>
      </div>
    </div>
  );
};

export default Projects;
