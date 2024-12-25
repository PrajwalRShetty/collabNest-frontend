import React from 'react';

const StudentProfileModal = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{student.name}'s Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {student.headline && (
            <p>
              <strong>Headline:</strong> {student.headline}
            </p>
          )}
          {student.location && (
            <p>
              <strong>Location:</strong> {student.location}
            </p>
          )}
          {student.contactInfo?.email && (
            <p>
              <strong>Email:</strong> {student.contactInfo.email}
            </p>
          )}
          {student.contactInfo?.phoneNo && (
            <p>
              <strong>Phone:</strong> {student.contactInfo.phoneNo}
            </p>
          )}
          {student.contactInfo?.dob && (
            <p>
              <strong>Date of Birth:</strong>{' '}
              {new Date(student.contactInfo.dob).toDateString()}
            </p>
          )}
        </div>

        {student.skills?.length > 0 && (
          <div className="mt-6 p-4 border rounded shadow">
            <h3 className="text-lg font-bold mb-3">Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {student.skills.map((skill, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded">
                  <h4 className="font-semibold">{skill.skillName}</h4>
                  {skill.learningPath?.length > 0 && (
                    <p>
                      <strong>Learning Path:</strong>{' '}
                      {skill.learningPath.join(', ')}
                    </p>
                  )}
                  {skill.resources?.length > 0 && (
                    <div>
                      <p className="font-semibold">Resources:</p>
                      <ul className="list-disc list-inside">
                        {skill.resources.map((resource, i) => (
                          <li key={i}>
                            <a
                              href={resource}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {resource}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {student.projects?.length > 0 && (
          <div className="mt-6 p-4 border rounded shadow">
            <h3 className="text-lg font-bold mb-3">Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {student.projects.map((project, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded">
                  <h4 className="font-semibold">{project.title}</h4>
                  {project.description && (
                    <p>
                      <strong>Description:</strong> {project.description}
                    </p>
                  )}
                  {project.skills_involved?.length > 0 && (
                    <p>
                      <strong>Skills Involved:</strong>{' '}
                      {project.skills_involved.join(', ')}
                    </p>
                  )}
                  {project.github_link && (
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      GitHub Link
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfileModal;
