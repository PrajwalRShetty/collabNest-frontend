import React, { useState } from 'react';

const Skills = ({ skills, addSkill }) => {
  const [newSkill, setNewSkill] = useState({ skillName: '', learningPath: '', resources: [] });

  const handleAddSkill = () => {
    addSkill(newSkill);
    setNewSkill({ skillName: '', learningPath: '', resources: [] });
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">Skills</h2>
      <ul>
        {skills.map((skill, index) => (
          <li key={index} className="my-2">
            <h3 className="font-medium">{skill.skillName}</h3>
            <p>Learning Path: {skill.learningPath.join(',')}</p>
            <p>Resources: {skill.resources.join(', ')}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Skill Name"
          className="border rounded p-2 w-full mb-2"
          value={newSkill.skillName}
          onChange={(e) => setNewSkill({ ...newSkill, skillName: e.target.value })}
        />
        <textarea
          placeholder="Learning Path"
          className="border rounded p-2 w-full mb-2"
          value={newSkill.learningPath}
          onChange={(e) => setNewSkill({ ...newSkill, learningPath: e.target.value })}
        />
        <textarea
          placeholder="Resources (comma separated)"
          className="border rounded p-2 w-full mb-2"
          value={newSkill.resources.join(', ')}
          onChange={(e) =>
            setNewSkill({ ...newSkill, resources: e.target.value.split(',').map((r) => r.trim()) })
          }
        />
        <button onClick={handleAddSkill} className="bg-green-500 text-white px-4 py-2 rounded">
          Add Skill
        </button>
      </div>
    </div>
  );
};

export default Skills;
