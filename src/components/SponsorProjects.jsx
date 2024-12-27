import React, { useState } from "react";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";

const Projects = ({ projects, addProject, updateProject, deleteProject }) => {
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    skillsRequired: [""],
    budget: "",
    startDate: "",
    endDate: "",
    applicationDeadline: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editProject, setEditProject] = useState(null);

  const handleAddProject = async () => {
    if (
      !newProject.title.trim() ||
      !newProject.description.trim() ||
      !newProject.startDate ||
      !newProject.endDate ||
      !newProject.applicationDeadline
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      await addProject(newProject);
      setNewProject({
        title: "",
        description: "",
        skillsRequired: [""],
        budget: "",
        startDate: "",
        endDate: "",
        applicationDeadline: "",
      });
      setIsAdding(false);
    } catch (error) {
      alert("Failed to add project. Please try again.");
    }
  };

  const handleUpdateProject = async () => {
    if (
      !editProject.title.trim() ||
      !editProject.description.trim() ||
      !editProject.startDate ||
      !editProject.endDate ||
      !editProject.applicationDeadline
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      await updateProject(editProject);
      setEditProject(null);
    } catch (error) {
      alert("Failed to update project. Please try again.");
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(projectId);
      } catch (error) {
        alert("Failed to delete project. Please try again.");
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow w-full">
      <h2 className="text-xl font-bold">Projects</h2>

      {/* Project List */}
      <div className="my-4 border rounded p-4">
        {projects.map((project, index) => (
          <div key={index} className="mb-4 border-b last:border-0 pb-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-lg">{project.title}</h3>
              <div className="flex space-x-2">
              
                <PencilIcon
                  className="w-5 h-5 text-blue-500 cursor-pointer"
                  onClick={() => {
                      const projectToEdit = {
                      _id: project._id,
                      title: project.title,
                      description: project.description,
                      skillsRequired: project.skillsRequired,
                      budget: project.budget,
                      startDate: project.startDate,
                      endDate: project.endDate,
                      applicationDeadline: project.applicationDeadline,
                      status: project.status
                    };
                    
                    setEditProject(projectToEdit);
                  }}
                />

                <TrashIcon
                  className="w-5 h-5 text-red-500 cursor-pointer"
                  onClick={() => handleDeleteProject(project._id)}
                />
              </div>
            </div>
            <p className="text-sm">{project.description}</p>
            <p className="text-sm font-semibold">Skills Required:</p>
            <div className="flex flex-wrap gap-2">
              {project.skillsRequired.map((skill, idx) => (
                <span key={idx} className="bg-gray-200 text-sm px-2 py-1 rounded shadow">
                  {skill}
                </span>
              ))}
            </div>
            <p className="text-sm mt-2">Budget: {project.budget ? `₹${project.budget}` : "Not provided"}</p>
            <p className="text-sm">Start Date: {new Date(project.startDate).toLocaleDateString()}</p>
            <p className="text-sm">End Date: {new Date(project.endDate).toLocaleDateString()}</p>
            <p className="text-sm">Application Deadline: {new Date(project.applicationDeadline).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      {/* Add or Edit Project Form */}
      {isAdding || editProject ? (
        <div className="mt-4 border rounded p-4">
          <h3 className="font-bold text-lg mb-2">
            {editProject ? "Edit Project" : "Add New Project"}
          </h3>
          <input
            type="text"
            placeholder="Title"
            className="border rounded p-2 w-full mb-2"
            value={editProject ? editProject.title : newProject.title}
            onChange={(e) =>
              editProject
                ? setEditProject({ ...editProject, title: e.target.value })
                : setNewProject({ ...newProject, title: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            className="border rounded p-2 w-full mb-2"
            value={editProject ? editProject.description : newProject.description}
            onChange={(e) =>
              editProject
                ? setEditProject({ ...editProject, description: e.target.value })
                : setNewProject({ ...newProject, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder=" ₹Budget"
            className="border rounded p-2 w-full mb-2"
            value={editProject ? editProject.budget : newProject.budget}
            onChange={(e) =>
              editProject
                ? setEditProject({ ...editProject, budget: e.target.value })
                : setNewProject({ ...newProject, budget: e.target.value })
            }
          />

          {/* Start Date Field with Label */}
          <label htmlFor="startDate" className="text-sm font-semibold mb-1 block">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            className="border rounded p-2 w-full mb-2"
            value={editProject ? editProject.startDate : newProject.startDate}
            onChange={(e) =>
              editProject
                ? setEditProject({ ...editProject, startDate: e.target.value })
                : setNewProject({ ...newProject, startDate: e.target.value })
            }
          />

          {/* End Date Field with Label */}
          <label htmlFor="endDate" className="text-sm font-semibold mb-1 block">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            className="border rounded p-2 w-full mb-2"
            value={editProject ? editProject.endDate : newProject.endDate}
            onChange={(e) =>
              editProject
                ? setEditProject({ ...editProject, endDate: e.target.value })
                : setNewProject({ ...newProject, endDate: e.target.value })
            }
          />

          {/* Application Deadline Field with Label */}
          <label htmlFor="applicationDeadline" className="text-sm font-semibold mb-1 block">
            Application Deadline
          </label>
          <input
            type="date"
            id="applicationDeadline"
            className="border rounded p-2 w-full mb-2"
            value={editProject ? editProject.applicationDeadline : newProject.applicationDeadline}
            onChange={(e) =>
              editProject
                ? setEditProject({ ...editProject, applicationDeadline: e.target.value })
                : setNewProject({ ...newProject, applicationDeadline: e.target.value })
            }
          />

          <p className="font-semibold text-sm mb-2">Skills Required:</p>
          {(editProject ? editProject.skillsRequired : newProject.skillsRequired).map((skill, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                placeholder={`Skill ${index + 1}`}
                className="border rounded p-2 flex-1"
                value={skill}
                onChange={(e) => {
                  const updatedSkills = editProject
                    ? [...editProject.skillsRequired]
                    : [...newProject.skillsRequired];
                  updatedSkills[index] = e.target.value;
                  editProject
                    ? setEditProject({ ...editProject, skillsRequired: updatedSkills })
                    : setNewProject({ ...newProject, skillsRequired: updatedSkills });
                }}
              />
            </div>
          ))}
          <button
            onClick={() => {
              const updatedSkills = (editProject ? editProject.skillsRequired : newProject.skillsRequired).concat("");
              editProject
                ? setEditProject({ ...editProject, skillsRequired: updatedSkills })
                : setNewProject({ ...newProject, skillsRequired: updatedSkills });
            }}
            className="bg-gray-200 text-black px-4 py-2 rounded mt-2"
          >
            Add Skill
          </button>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={editProject ? handleUpdateProject : handleAddProject}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              {editProject ? "Update Project" : "Save Project"}
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setEditProject(null);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2 flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Project
        </button>
      )}
    </div>
  );
};

export default Projects;
