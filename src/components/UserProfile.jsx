import React, { useState, useEffect } from "react";
import ContactInfo from "./ContactInfo"; // Ensure this is the correct import for your ContactInfo component

const UserProfile = ({ profile, updateProfile }) => {
  const [modalView, setModalView] = useState(null); // Tracks which modal is open (basic-info/contact-info/background-image)
  const [formData, setFormData] = useState({
    name: profile.name || "",
    headline: profile.headline || "",
    education: profile.education || "",
    location: profile.location || "",
    contactInfo: profile.contactInfo || {},
    backgroundImage: profile.backgroundImage || "",
  });

  // Sync form data with profile props
  useEffect(() => {
    setFormData({
      name: profile.name || "",
      headline: profile.headline || "",
      education: profile.education || "",
      location: profile.location || "",
      contactInfo: profile.contactInfo || {},
      backgroundImage: profile.backgroundImage || "",
    });
  }, [profile]);

  // Handle basic info changes
  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit basic info
  const handleBasicInfoSubmit = () => {
    const updateData = {
      section: "basic-info",
      data: {
        name: formData.name,
        headline: formData.headline,
        education: formData.education,
        location: formData.location,
      },
    };

    updateProfile(updateData); // Call the parent function to update profile
    setModalView(null); // Close the modal after submission
  };

  // Handle background image change
  const handleBackgroundImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updateData = {
          section: "background-image",
          data: {
            backgroundImage: reader.result, // Base64-encoded image
          },
        };
        updateProfile(updateData);
      };
      reader.readAsDataURL(file);
    }
    setModalView(null); // Close the modal after submission
  };

  // Update contact info
  const updateContactInfo = (newContactInfo) => {
    setFormData((prev) => ({
      ...prev,
      contactInfo: newContactInfo,
    }));
    const updateData = {
      section: "contact-info",
      data: newContactInfo,
    };
    updateProfile(updateData);
    setModalView(null); // Close the modal after submission
  };

  // Debugging modalView state
  useEffect(() => {
    console.log("ModalView state changed:", modalView);
  }, [modalView]);

  return (
    <div className="container mx-auto p-4">
      {/* Profile Card */}
      <div className="relative bg-white rounded shadow">
        {/* Background Image */}
        <div
          className="h-24 bg-cover bg-center rounded-t"
          style={{
            backgroundImage: `url('${formData.backgroundImage || "https://via.placeholder.com/800x200"}')`,
          }}
        >
          <button
            className="absolute top-2 right-2 bg-gray-500 text-white p-1 rounded-full shadow hover:bg-gray-600 z-10"
            onClick={() => setModalView("background-image")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.414 2.586a2 2 0 010 2.828l-9.9 9.9a1 1 0 01-.293.207l-4 1.6a1 1 0 01-1.272-1.272l1.6-4a1 1 0 01.207-.293l9.9-9.9a2 2 0 012.828 0zM15.586 5L5.5 15.086 4.414 14l10.086-10.086L15.586 5z" />
            </svg>
          </button>
        </div>

        {/* Edit Button */}
        <button
          className="absolute top-[110px] right-4 bg-blue-500 text-white p-2 rounded-full shadow hover:bg-blue-600 z-10"
          onClick={() => {
            console.log("Edit button clicked");
            setModalView("basic-info");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.414 2.586a2 2 0 010 2.828l-9.9 9.9a1 1 0 01-.293.207l-4 1.6a1 1 0 01-1.272-1.272l1.6-4a1 1 0 01.207-.293l9.9-9.9a2 2 0 012.828 0zM15.586 5L5.5 15.086 4.414 14l10.086-10.086L15.586 5z" />
          </svg>
        </button>

        {/* Profile Info */}
        <div className="p-4 flex items-start relative">
          {/* Profile Image */}
          <div
            className="w-20 h-20 bg-gray-400 rounded-full border-4 border-white absolute -top-10 left-4"
            style={{ zIndex: 10 }}
          ></div>

          {/* Text Info */}
          <div className="ml-28 mt-2 w-full">
            <h2 className="text-lg font-bold">{profile?.name || "No Name Provided"}</h2>
            <p className="text-gray-600">{profile.headline || "Headline"}</p>
            <p className="text-gray-600">{profile.education || "Education"}</p>
            <p className="text-gray-600">{profile.location || "Location"}</p>
            <div className="mt-4">
              <span
                className="text-blue-500 underline hover:text-blue-700 cursor-pointer"
                onClick={() => setModalView("contact-info")}
              >
                Contact Info
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {modalView === "basic-info"
                  ? "Edit Basic Info"
                  : modalView === "contact-info"
                  ? "Edit Contact Info"
                  : "Edit Background Image"}
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setModalView(null)}
              >
                &#x2715;
              </button>
            </div>

            {/* Modal Content */}
            {modalView === "basic-info" && (
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleBasicInfoChange}
                  placeholder="Name"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
                <input
                  type="text"
                  name="headline"
                  value={formData.headline}
                  onChange={handleBasicInfoChange}
                  placeholder="Headline"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleBasicInfoChange}
                  placeholder="Education"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleBasicInfoChange}
                  placeholder="Location"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
                  <div className="flex justify-end space-x-4">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={() => setModalView(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleBasicInfoSubmit}
                  >
                    Save
                  </button>
                </div>

              </div>
            )}

            {modalView === "contact-info" && (
              <ContactInfo
                contactInfo={formData.contactInfo}
                updateContactInfo={updateContactInfo}
              />
            )}

            {modalView === "background-image" && (
              <input
                type="file"
                accept="image/*"
                onChange={handleBackgroundImageChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
