import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';
import StudentProfileModal from './StudentProfileModal';

const EnrolledStudents = ({ projectId, onClose }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        const response = await axiosInstance.get(`/sponsor/projects/${projectId}/enrolled-students`);
        setStudents(response.data.students);
        setSelectedStudents(response.data.selectedStudents || []);
      } catch (err) {
        setError('Failed to fetch enrolled students');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledStudents();
  }, [projectId]);

  const handleSelectStudent = async (studentId) => {
    try {
      await axiosInstance.post(`/sponsor/projects/${projectId}/select-student`, {
        studentId
      });

      setSelectedStudents(prev => 
        prev.includes(studentId)
          ? prev.filter(id => id !== studentId)
          : [...prev, studentId]
      );

      alert('Student selection updated successfully');
    } catch (err) {
      alert('Failed to update student selection');
      console.error('Error:', err);
    }
  };

  const handleViewProfile = async (studentId) => {
    try {
      const response = await axiosInstance.get(`/sponsor/student-profile/${studentId}`);
      setSelectedProfile(response.data);
    } catch (err) {
      alert('Failed to load student profile');
      console.error('Error:', err);
    }
  };

  if (loading) return <div>Loading students...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Enrolled Students</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {students.length === 0 ? (
          <p>No students enrolled yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {students.map((student) => (
              <div key={student._id} className="border rounded-lg p-4 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    {student.profileLogo && (
                      <img
                        src={student.profileLogo}
                        alt={student.userName}
                        className="w-12 h-12 rounded-full"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold">{student.userName}</h3>
                      <p className="text-gray-600">{student.headline}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewProfile(student.userId)}
                    className="mt-2 text-blue-600 hover:text-blue-800"
                  >
                    View Full Profile
                  </button>
                </div>

                <button
                  onClick={() => handleSelectStudent(student._id)}
                  className={`ml-4 px-4 py-2 rounded ${
                    selectedStudents.includes(student._id)
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {selectedStudents.includes(student._id) ? 'Selected' : 'Select'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedProfile && (
        <StudentProfileModal
          student={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}
    </div>
  );
};

export default EnrolledStudents;
