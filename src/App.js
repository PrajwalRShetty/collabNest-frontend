import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthProvider, { AuthContext } from "./contexts/AuthContext";
import PublicHomepage from "./pages/publicHomePage";
import UserHomepage from "./pages/userHomePage";
import ConnectPage from "./pages/connectPage";
import ProfilePage from "./pages/profilePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PublicNavbar from "./components/PublicNavbar";
import UserNavbar from "./components/UserNavbar";


const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

const AppContent = () => {
  const { user, loading } = useContext(AuthContext);

  // Use effect does not need to handle navigation. It's better to handle navigation inside the Routes.
  if (loading) return <div>Loading...</div>;

  return (
    <>
      {user ? <UserNavbar /> : <PublicNavbar />}
      <Routes>
        {!user ? (
          <>
            <Route path="/" element={<PublicHomepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<UserHomepage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/connect" element={<ConnectPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
