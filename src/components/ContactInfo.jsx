import React, { useState } from "react";

const ContactInfo = ({ contactInfo, updateContactInfo, onClose }) => {
  const [formData, setFormData] = useState(contactInfo || {});
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = () => {
    updateContactInfo(formData);
    setIsEditing(false); // Close editing mode
  };

  return (
    <div className="p-4 bg-white rounded shadow w-full max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Contact Info</h2>
      {!isEditing ? (
        <div>
          <p>Email: {formData.email || "N/A"}</p>
          <p>Phone: {formData.phoneNo || "N/A"}</p>
          <p>DOB: {formData.dob || "N/A"}</p>
          <p>
            Portfolio:{" "}
            <a href={formData.portfolio_link} className="text-blue-500 underline">
              {formData.portfolio_link || "N/A"}
            </a>
          </p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={() => setIsEditing(true)}
          >
            Edit Contact Info
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-2"
            onClick={onClose}
          >
            Back
          </button>
        </div>
      ) : (
        <div>
          {["email", "phoneNo", "dob", "portfolio_link"].map((field) => (
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
