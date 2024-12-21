import React, { useState, useEffect } from "react";
import axios from "axios";

const ConnectPage = () => {
  const [students, setStudents] = useState([]); // Student list
  const [searchName, setSearchName] = useState(""); // Search input
  const [selectedSkills, setSelectedSkills] = useState([]); // Selected filters
  const [skills, setSkills] = useState([]); // Available skills from backend
  const [loading, setLoading] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);

  // Fetch available skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("http://localhost:5000/v1/api/student/skills");
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchSkills();
  }, []);

  // Fetch students based on search or filter
  const fetchStudents = async () => {
    if (!searchName.trim() && selectedSkills.length === 0) {
      return;
    }  

    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (searchName) queryParams.append("name", searchName);
      if (selectedSkills.length > 0) queryParams.append("skills", JSON.stringify(selectedSkills));

      const response = await axios.get(`http://localhost:5000/v1/api/student/search?${queryParams.toString()}`);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle skill filter changes
  const handleSkillChange = (e) => {
    const { value } = e.target;
    setSelectedSkills((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  return (
    <div className="container mx-auto p-4">
      {/* Top Section - Search Bar */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Search student"
          className="border px-4 py-2 rounded-l-lg w-full"
        />
        <button
          onClick={() => {
            setSearchAttempted(true);
            fetchStudents();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
        >
          Search
        </button>
      </div>
  
      {/* Main Section */}
      <div className="flex gap-4">
        {/* Left Sidebar - Filters */}
        <div className="w-1/4 border rounded-lg p-4 h-fit">
          <h2 className="text-lg font-bold mb-2">Skills</h2>
          <div className="flex flex-col gap-2">
            {skills.map((skill) => (
              <label key={skill} className="flex items-center">
                <input
                  type="checkbox"
                  value={skill}
                  checked={selectedSkills.includes(skill)}
                  onChange={handleSkillChange}
                  className="mr-2"
                />
                {skill}
              </label>
            ))}
          </div>
          <button
            onClick={fetchStudents}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
          >
            Add
          </button>
        </div>
  
        {/* Students List */}
        <div className="w-3/4">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : students.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {students.map((student) => (
                <div
                  key={student._id}
                  className="border rounded-lg p-4 shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={student.profileLogo || "https://via.placeholder.com/100"}
                      alt="profile"
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h2 className="font-bold text-lg">{student.userId?.name}</h2>
                      <p className="text-sm text-gray-600">{student.headline}</p>
                      <p className="text-sm text-gray-500">{student.location}</p>
                    </div>
                  </div>
                  {/* Skills */}
                  <div className="flex flex-wrap gap-1">
                    {student.skills.map((skill) => (
                      <span
                        key={skill.skillName}
                        className="bg-gray-200 text-xs px-2 py-1 rounded-full"
                      >
                        {skill.skillName}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => (window.location.href = `/students/${student._id}`)}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg block text-center"
                  >
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          ) : (
            searchAttempted && <p className="text-center">No students found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectPage;
