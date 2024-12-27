import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const UserNavbar = () => {
  const { user, logout } = useContext(AuthContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 550);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 550);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-black shadow-md px-2 py-2 flex items-center justify-between m-4 rounded-lg sticky top-0 z-50">
      {/* Left Section - Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="https://via.placeholder.com/40"
          alt="App Logo"
          className="w-8 h-8 object-cover rounded-full"
        />
        <span className="text-xl font-bold text-white">SwapSkill</span>
      </div>

      {/* Center Section - Nav Links */}
      {!isMobileView && (
        <div className="flex items-center space-x-6">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "text-orange-700 font-bold" : "text-white hover:text-orange-700"
            }
          >
            Home
          </NavLink>
          {user?.role === "student" && (
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? "text-orange-700 font-bold" : "text-white hover:text-orange-700"
            }
          >
            Projects
          </NavLink>)}
          <NavLink
            to="/connect"
            className={({ isActive }) =>
              isActive ? "text-orange-700 font-bold" : "text-white hover:text-orange-700"
            }
          >
            Connect
          </NavLink>
          {user?.role === "student" && (
            <NavLink
              to="/eduReels"
              className={({ isActive }) =>
                isActive ? "text-orange-700 font-bold" : "text-white hover:text-orange-700"
              }
            >
              EduReels
            </NavLink>
          )}
          {user?.role === "projectSponsor" && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-orange-700 font-bold" : "text-white hover:text-orange-700"
              }
            >
              Dashboard
            </NavLink>
          )}
        </div>
      )}

      {/* Mobile Navigation Dropdown */}
      {isMobileView && (
        <div>
          <button
            onClick={() => setIsNavDropdownOpen(!isNavDropdownOpen)}
            className="text-white focus:outline-none"
          >
            <span className="text-2xl right-2 justify-end">☰</span>
          </button>
          {isNavDropdownOpen && (
            <div className="absolute top-16 left-2 mt-2 w-48 bg-black border border-gray-200 rounded-md shadow-lg">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-2 text-orange-700 font-bold bg-gray-200"
                    : "block px-4 py-2 text-white hover:text-orange-700 hover:bg-gray-100"
                }
              >
                Home
              </NavLink>
              {user.role === 'student' && (
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-2 text-orange-700 font-bold bg-gray-200"
                    : "block px-4 py-2 text-white hover:text-orange-700 hover:bg-gray-100"
                }
              >
                Projects
              </NavLink>
              )}
              <NavLink
                to="/connect"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-2 text-orange-700 font-bold bg-gray-200"
                    : "block px-4 py-2  text-white hover:text-orange-700 hover:bg-gray-100"
                }
              >
                Connect
              </NavLink>
              {user?.role === "student" && (
              <NavLink
                to="/eduReels"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-2 text-orange-700 font-bold bg-gray-200"
                    : "block px-4 py-2 text-white hover:text-orange-700 hover:bg-gray-100"
                }
              >
                EduReels
              </NavLink>
              )}
              {user.role === 'projectSponsor' && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-2 text-orange-700 font-bold bg-gray-200"
                    : "block px-4 py-2 text-white hover:text-orange-700 hover:bg-gray-100"
                }
              >
                Dashboard
              </NavLink>)}
            </div>
          )}
        </div>
      )}

      {/* Right Section - Profile Menu */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggling the profile menu
          className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center"
        >
          <img
            src="/profile.jpeg"
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-2 text-black bg-gray-200"
                  : "block px-4 py-2 text-black hover:bg-gray-100"
              }
            >
              Profile
            </NavLink>
            {user.role === 'student' && (<NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-2 text-black bg-gray-200"
                  : "block px-4 py-2 text-black hover:bg-gray-100"
              }
            >
              Dashboard
            </NavLink>)}
            {user.role === 'student' && (<NavLink
              to="/connections"
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-2 text-black bg-gray-200"
                  : "block px-4 py-2 text-black hover:bg-gray-100"
              }
            >
              My Connections
            </NavLink>)}
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-2 text-black bg-gray-200"
                  : "block px-4 py-2 text-black hover:bg-gray-100"
              }
            >
              Settings
            </NavLink>
            <NavLink
              className="block px-4 py-2 text-red-600 hover:bg-gray-100"
              onClick={logout}
            >
              Logout
            </NavLink>
          </div>
        )}
      </div>
    </nav>

  );
};

export default UserNavbar;
