import React, { useState } from "react";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";

const Skills = ({ skills, addSkill, deleteSkill, updateSkill }) => {
  const [newSkill, setNewSkill] = useState({
    skillName: "",
    learningPath: ["", ""],
    resources: [""], // Start with one empty resource field
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editSkill, setEditSkill] = useState(null);

  const handleAddSkill = async () => {
    if (!newSkill.skillName.trim() || !newSkill.learningPath.length || !newSkill.resources.length) {
      alert("All fields are required!");
      return;
    }

    try {
      await addSkill(newSkill);
      setNewSkill({ skillName: "", learningPath: ["", ""], resources: [""] }); // Reset resources to one empty field
      setIsAdding(false);
    } catch (error) {
      alert("Failed to add skill. Please try again.");
    }
  };

  const handleDeleteSkill = async (skillName) => {
    if (window.confirm(`Are you sure you want to delete "${skillName}"?`)) {
      try {
        await deleteSkill(skillName);
      } catch (error) {
        alert("Failed to delete skill. Please try again.");
      }
    }
  };

  const handleUpdateSkill = async () => {
    if (!editSkill.skillName.trim() || !editSkill.learningPath.length || !editSkill.resources.length) {
      alert("All fields are required!");
      return;
    }

    try {
      await updateSkill(
        {
          skillName: editSkill.skillName,
          updatedLearningPath: editSkill.learningPath,
          updatedResources: editSkill.resources,
          _id: editSkill._id,
        }
      );
      setEditSkill(null);
    } catch (error) {
      alert("Failed to update skill. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow w-full">
      <h2 className="text-xl font-bold">Skills</h2>

      {/* Skill List */}
      <div className="my-4 border rounded p-4">
        {skills.map((skill, index) => (
          <div key={index} className="mb-4 border-b last:border-0 pb-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-lg">{skill.skillName}</h3>
              <div className="flex space-x-2">
                <PencilIcon
                  className="w-5 h-5 text-blue-500 cursor-pointer"
                  onClick={() => setEditSkill({ ...skill })}
                />
                <TrashIcon
                  className="w-5 h-5 text-red-500 cursor-pointer"
                  onClick={() => handleDeleteSkill(skill.skillName)}
                />
              </div>
            </div>
            <div className="my-2">
              <p className="text-sm font-semibold">Learning Path:</p>
              <div className="flex flex-wrap gap-2">
                {skill.learningPath.map((step, idx) => (
                  <span key={idx} className="bg-gray-200 text-sm px-2 py-1 rounded shadow">
                    {step}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold">Resources:</p>
              <ul className="list-disc pl-4">
                {skill.resources.map((resource, idx) => (
                  <li key={idx}>
                    <a
                      href={resource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {resource}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

 
      {/* Add or Edit Skill Form */}
        {isAdding || editSkill ? (
        <div className="mt-4 border rounded p-4">
          <h3 className="font-bold text-lg mb-2">
            {editSkill ? "Edit Skill" : "Add New Skill"}
          </h3>
          <input
            type="text"
            placeholder="Skill Name"
            className="border rounded p-2 w-full mb-2"
            value={editSkill ? editSkill.skillName : newSkill.skillName}
            onChange={(e) =>
              editSkill
                ? setEditSkill({ ...editSkill, skillName: e.target.value })
                : setNewSkill({ ...newSkill, skillName: e.target.value })
            }
          />

          <p className="font-semibold text-sm mb-2">Learning Path:</p>
          {(editSkill ? editSkill.learningPath : newSkill.learningPath).map((step, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                placeholder={`Step ${index + 1}`}
                className="border rounded p-2 flex-1"
                value={step}
                onChange={(e) => {
                  const updatedPath = editSkill
                    ? [...editSkill.learningPath]
                    : [...newSkill.learningPath];
                  updatedPath[index] = e.target.value;
                  editSkill
                    ? setEditSkill({ ...editSkill, learningPath: updatedPath })
                    : setNewSkill({ ...newSkill, learningPath: updatedPath });
                }}
              />
            </div>
          ))}

          <button
            onClick={() => {
              const updatedPath = (editSkill ? editSkill.learningPath : newSkill.learningPath).concat("");
              editSkill
                ? setEditSkill({ ...editSkill, learningPath: updatedPath })
                : setNewSkill({ ...newSkill, learningPath: updatedPath });
            }}
            className="bg-gray-200 text-black px-4 py-2 rounded mt-2"
          >
            Add Step
          </button>

          <p className="font-semibold text-sm mb-2">Resources:</p>
          {(editSkill ? editSkill.resources : newSkill.resources).map((resource, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                placeholder={`Resource ${index + 1}`}
                className="border rounded p-2 flex-1"
                value={resource}
                onChange={(e) => {
                  const updatedResources = editSkill
                    ? [...editSkill.resources]
                    : [...newSkill.resources];
                  updatedResources[index] = e.target.value;
                  editSkill
                    ? setEditSkill({ ...editSkill, resources: updatedResources })
                    : setNewSkill({ ...newSkill, resources: updatedResources });
                }}
              />
            </div>
          ))}

          <button
            onClick={() => {
              const updatedResources = (editSkill ? editSkill.resources : newSkill.resources).concat("");
              editSkill
                ? setEditSkill({ ...editSkill, resources: updatedResources })
                : setNewSkill({ ...newSkill, resources: updatedResources });
            }}
            className="bg-gray-200 text-black px-4 py-2 rounded mt-2"
          >
            Add Resource
          </button>

          <div className="flex space-x-2 mt-4">
            <button
              onClick={editSkill ? handleUpdateSkill : handleAddSkill}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              {editSkill ? "Update Skill" : "Save Skill"}
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setEditSkill(null);
                setNewSkill({ skillName: "", learningPath: ["", ""], resources: [""] });
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
          Add Skill
        </button>
        )}

    </div>
  );
};

export default Skills;
