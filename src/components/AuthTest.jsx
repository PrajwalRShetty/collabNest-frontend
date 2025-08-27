// Test component to verify token authentication is working
import React, { useState } from 'react';
import axios from '../utils/axios';
import TokenStorage from '../utils/tokenStorage';

const AuthTest = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testAuth = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/students/profile');
      setResult('✅ Authentication successful: ' + JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult('❌ Authentication failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkTokens = () => {
    const accessToken = TokenStorage.getAccessToken();
    const refreshToken = TokenStorage.getRefreshToken();
    setResult(`Access Token: ${accessToken ? 'Present' : 'Missing'}\nRefresh Token: ${refreshToken ? 'Present' : 'Missing'}`);
  };

  const clearTokens = () => {
    TokenStorage.clearTokens();
    setResult('Tokens cleared');
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Authentication Test</h3>
      <div className="space-x-2 mb-4">
        <button 
          onClick={testAuth} 
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Testing...' : 'Test Protected Endpoint'}
        </button>
        <button 
          onClick={checkTokens}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Check Tokens
        </button>
        <button 
          onClick={clearTokens}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear Tokens
        </button>
      </div>
      <pre className="bg-white p-2 rounded border text-sm overflow-auto max-h-40">
        {result || 'Click a button to test...'}
      </pre>
    </div>
  );
};

export default AuthTest;
