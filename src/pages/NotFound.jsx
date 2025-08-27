import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-4">Page Not Found</h2>
      <p className="text-gray-500 mb-6 text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="space-x-4">
        <Link 
          to="/" 
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Go Home
        </Link>
        <Link 
          to="/login" 
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Login
        </Link>
      </div>
      <div className="mt-8 text-sm text-gray-400">
        Current path: {window.location.pathname}
      </div>
    </div>
  );
};

export default NotFound;
