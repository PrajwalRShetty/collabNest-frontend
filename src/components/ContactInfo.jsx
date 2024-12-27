import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const ContactInfo = ({ contactInfo, updateContactInfo, onClose }) => {
  const { user } = useContext(AuthContext); 
  const [formData, setFormData] = useState(contactInfo || {});
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = () => {
    updateContactInfo(formData);
    setIsEditing(false);
  };

  // Remove portfolio_link from the main fields array
  const fieldsToDisplay =
    user?.role === "student"
      ? ["email", "phoneNo", "dob"]  // Removed portfolio_link from here
      : ["email", "phoneNo"];

  return (
    <div className="p-4 bg-white rounded shadow w-full max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Contact Info</h2>
      {!isEditing ? (
        <div>
          {fieldsToDisplay.map((field) => (
            <p key={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}:{" "}
              {formData[field] || "N/A"}
            </p>
          ))}
          {/* Separate portfolio link display for students */}
          {user?.role === "student" && (
            <p>
              Portfolio:{" "}
              <a
                href={formData.portfolio_link}
                className="text-blue-500 underline"
              >
                {formData.portfolio_link || "N/A"}
              </a>
            </p>
          )}
          <button
            className="bg-orange-400 text-white px-4 py-2 rounded mt-4"
            onClick={() => setIsEditing(true)}
          >
            Edit Contact Info
          </button>
        </div>
      ) : (
        <div>
          {fieldsToDisplay.map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field}
              className="border rounded p-2 w-full mb-2"
              value={formData[field] || ""}
              onChange={(e) =>
                setFormData({ ...formData, [field]: e.target.value })
              }
            />
          ))}
          {/* Separate portfolio input for students */}
          {user?.role === "student" && (
            <input
              type="text"
              placeholder="Portfolio Link"
              className="border rounded p-2 w-full mb-2"
              value={formData.portfolio_link || ""}
              onChange={(e) =>
                setFormData({ ...formData, portfolio_link: e.target.value })
              }
            />
          )}
          <div className="flex justify-end gap-2">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
