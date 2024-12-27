import React, { useState, useEffect } from "react";
import ContactInfo from "./ContactInfo";

const StudentProfile = ({ profile, updateProfile }) => {
  const imageUrl = React.useMemo(() => {
    return profile.backgroundImage
      ? `${profile.backgroundImage}?t=${Date.now()}`
      : "/bg-img.jpeg";
  }, [profile.backgroundImage]);

  const profileImageUrl = React.useMemo(() => {
    return profile.profileImage
      ? `${profile.profileImage}?t=${Date.now()}`
      : "/profile.jpeg";
  }, [profile.profileImage]);

  const [modalView, setModalView] = useState(null);
  const [formData, setFormData] = useState({
    name: profile.name || "",
    headline: profile.headline || "",
    education: profile.education || "",
    location: profile.location || "",
    contactInfo: profile.contactInfo || {},
    backgroundImage: profile.backgroundImage || "",
    profileImage: profile.profileImage || "",
    connectionCount: profile.connectionCount || 0
  });

  // Sync form data with profile props
  useEffect(() => {
    setFormData({
      name: profile.name || "",
      headline: profile.headline || "",
      education: profile.education || "",
      location: profile.location || "",
      connectionCount:profile.connectionCount,
      contactInfo: profile.contactInfo || {},
      backgroundImage: profile.backgroundImage || "",
      profileImage: profile.profileImage || "",
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
        connectionCount: formData.connectionCount,
      },
    };
    updateProfile(updateData);
    setModalView(null);
  };

  const handleBackgroundImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("backgroundImage", file);
      formData.append("section", "background-image");
      updateProfile(formData);
    }
    setModalView(null);
  };

  // Handle Profile Image Change
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);
      formData.append("section", "profile-image");
      updateProfile(formData);
    }
    setModalView(null);
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
    setModalView(null);
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
    setModalView("profile-image");
  };

  return (
    <div className="container mx-auto p-4">
      {/* Profile Card */}
      <div className="relative bg-white text-black rounded shadow">
        {/* Background Image */}
        <div
          className="h-24 bg-cover bg-center rounded-t"
          style={{ backgroundImage: `url('${imageUrl}')` }}
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

        {/* Profile Image */}
        <div
          className="relative"
          onClick={handleProfileClick}
        >
          <img
            src={profileImageUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-black absolute -top-12 left-4"
          />
          <button
            className="absolute top-4 right-4 bg-gray-500 text-white p-1 rounded-full shadow hover:bg-gray-600 z-10"
            onClick={(e) => {
              e.stopPropagation(); 
              setModalView("profile-image");
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
        </div>

        {/* Edit Button */}
        <button
          className="absolute top-[110px] right-4 bg-blue-500 text-white p-2 rounded-full shadow hover:bg-blue-600 z-10"
          onClick={() => setModalView("basic-info")}
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
          <div className="ml-28 mt-2 w-full">
            <h2 className="text-lg font-bold">{profile?.name || "No Name Provided"}</h2>
            <p>{profile.headline || "Headline"}</p>
            <p>{profile.education || "Education"}</p>
            <p>{profile.location || "Location"}</p>
            
            <div className="flex items-center mt-4 space-x-2">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
              {formData.connectionCount || 0} connections
              </div>
            </div>

            <div className="mt-4">
              <span
                className="text-blue-400 underline hover:text-blue-500 cursor-pointer"
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
          <div className="bg-white text-black rounded-lg shadow-lg w-1/2 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {modalView === "basic-info"
                  ? "Edit Basic Info"
                  : modalView === "contact-info"
                  ? "Edit Contact Info"
                  : modalView === "profile-image"
                  ? "Edit Profile Image"
                  : "Edit Background Image"}
              </h2>
              <button
                className="text-gray-500 hover:text-gray-300"
                onClick={() => setModalView(null)}
              >
                &#x2715;
              </button>
            </div>
            {modalView === "basic-info" && (
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleBasicInfoChange}
                  placeholder="Name"
                  className="w-full bg-gray-100 border border-gray-500 rounded px-4 py-2 text-black"
                />
                <input
                  type="text"
                  name="headline"
                  value={formData.headline}
                  onChange={handleBasicInfoChange}
                  placeholder="Headline"
                  className="w-full bg-gray-100 border border-gray-500 rounded px-4 py-2 text-black"
                />
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleBasicInfoChange}
                  placeholder="Education"
                  className="w-full bg-gray-100 border border-gray-500 rounded px-4 py-2 text-black"
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleBasicInfoChange}
                  placeholder="Location"
                  className="w-full bg-gray-100 border border-gray-500 rounded px-4 py-2 text-black"
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
                className="w-full bg-gray-100 border border-gray-500 rounded px-4 py-2 text-black"
              />
            )}
            {modalView === "profile-image" && (
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="w-full bg-gray-100 border border-gray-500 rounded px-4 py-2 text-black"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
