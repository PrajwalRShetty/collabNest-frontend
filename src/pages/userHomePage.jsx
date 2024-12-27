import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

const UserHomepage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to SwapSkill, {user?.name}!
            </h1>
            <p className="text-xl mb-8">
              Connect, Learn, and Grow with Fellow Students
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate('/connect')}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Find Students
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🤝"
              title="Connect"
              description="Find and connect with students who share your interests and goals"
            />
            <FeatureCard
              icon="📚"
              title="Learn"
              description="Share knowledge and learn from peers in your field"
            />
            <FeatureCard
              icon="🚀"
              title="Grow"
              description="Develop your skills through collaborative learning"
            />
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ActionCard
              title="Search Students"
              description="Find students based on skills"
              buttonText="Search"
              onClick={() => navigate('/connect')}
            />
            {user.role==='student'&&(<ActionCard
              title="View Requests"
              description="Manage your connection requests"
              buttonText="View"
              onClick={() => navigate('/connections')}
            />)}
            {user.role==='student'&&(<ActionCard
              title="View Projects"
              description="Showcase your projects"
              buttonText="View"
              onClick={() => navigate('/projects')}
            />)}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard number="1000+" label="Students" />
            <StatCard number="50+" label="Skills" />
            <StatCard number="500+" label="Connections" />
            <StatCard number="100+" label="Projects" />
          </div>
        </div>
      </section>
    </div>
  );
};

// Component for feature cards
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Component for action cards
const ActionCard = ({ title, description, buttonText, onClick }) => (
  <div className="bg-gray-50 p-6 rounded-lg border hover:border-blue-500 transition-colors">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <button
      onClick={onClick}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full"
    >
      {buttonText}
    </button>
  </div>
);

// Component for stat cards
const StatCard = ({ number, label }) => (
  <div className="p-4">
    <div className="text-3xl font-bold text-blue-600 mb-2">{number}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

export default UserHomepage;
