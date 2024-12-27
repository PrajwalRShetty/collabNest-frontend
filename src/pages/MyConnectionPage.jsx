import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const MyConnectionPage = () => {
  const [connectionRequests, setConnectionRequests] = useState({
    received: [],
    sent: []
  });
  const [connectedStudents, setConnectedStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchConnectionRequests();
    fetchConnectedStudents();
  }, []);

  const fetchConnectionRequests = async () => {
    try {
      const response = await axios.get('/student/connection-requests');
      setConnectionRequests(response.data);
    } catch (err) {
      setError('Failed to fetch connection requests');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchConnectedStudents = async () => {
    try {
      const response = await axios.get('/student/connected-students');
      setConnectedStudents(response.data);
    } catch (err) {
      console.error('Error fetching connected students:', err);
      setError('Failed to fetch connected students');
    }
  };

  const handleRequest = async (requestId, action) => {
    try {
      await axios.post('/student/handle-connection-request', {
        requestId,
        action
      });
      
      fetchConnectionRequests();
      fetchConnectedStudents();
      
      alert(`Connection request ${action}ed successfully`);
    } catch (err) {
      alert(`Failed to ${action} connection request`);
      console.error('Error:', err);
    }
  };

  const handleViewProfile = (studentId) => {
    navigate(`/students/${studentId}`);
  };

  const handleRemoveConnection = async (studentId) => {
    try {
      await axios.post('/student/remove-connection', { studentId });
      fetchConnectedStudents();
      alert('Connection removed successfully');
    } catch (err) {
      alert('Failed to remove connection');
      console.error('Error:', err);
    }
  };

  if (loading) return <div className="p-6">Loading connection requests...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Network</h1>
        <p className="text-gray-600">Manage your connections and requests</p>
      </div>

      {/* Connection Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Received Requests</h3>
          <p className="text-3xl font-bold text-blue-600">{connectionRequests.received.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Sent Requests</h3>
          <p className="text-3xl font-bold text-green-600">{connectionRequests.sent.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Connections</h3>
          <p className="text-3xl font-bold text-purple-600">{connectedStudents.length}</p>
        </div>
      </div>

      {/* Received Requests Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Received Requests</h2>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            {connectionRequests.received.length} Pending
          </span>
        </div>
        {connectionRequests.received.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
            <p className="text-gray-500">No pending requests received.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {connectionRequests.received.map((request) => (
              <div key={request._id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={request.senderId.profileLogo || "/profile.jpeg"}
                    alt={request.senderId.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{request.senderId.name}</h3>
                    <p className="text-sm text-gray-500">
                      Sent: {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleRequest(request._id, 'accept')}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRequest(request._id, 'reject')}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Sent Requests Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Sent Requests</h2>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            {connectionRequests.sent.length} Pending
          </span>
        </div>
        {connectionRequests.sent.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
            <p className="text-gray-500">No pending requests sent.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {connectionRequests.sent.map((request) => (
              <div key={request._id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <img
                    src={request.receiverId.profileLogo || "/profile.jpeg"}
                    alt={request.receiverId.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{request.receiverId.name}</h3>
                    <p className="text-sm text-gray-500">
                      Sent: {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                    <span className="inline-block bg-yellow-100 text-yellow-800 text1 rounded-full mt-1">
                      Pending
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Connected Students Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Connections</h2>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
            {connectedStudents.length} Total
          </span>
        </div>
        {connectedStudents.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
            <p className="text-gray-500">No connections yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {connectedStudents.map((student) => (
              <div key={student._id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={student.profileLogo || "/profile.jpeg"}
                    alt={student.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.headline}</p>
                    <p className="text-sm text-gray-500">{student.location}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleViewProfile(student.userId)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => handleRemoveConnection(student.userId)}
                    className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MyConnectionPage;
