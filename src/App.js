import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthProvider, { AuthContext } from "./contexts/AuthContext";
import PublicHomepage from "./pages/publicHomePage";
import UserHomepage from "./pages/userHomePage";
import ConnectPage from "./pages/connectPage";
import StudentProfilePage from "./pages/studentProfilePage"; 
import SponsorProfilePage from "./pages/sponsorProfilePage"; 
import ViewStudentProfile from "./pages/viewStudentProfile";
// import ViewSponsorProfile from "./pages/viewSponsorProfile";
import SponsorConnectPage from "./pages/sponsorConnect";
import MyConnectionPage from "./pages/MyConnectionPage";
import SponsorDashboard from "./pages/SponsorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProjects from "./pages/studentProjects";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PublicNavbar from "./components/PublicNavbar";
import UserNavbar from "./components/UserNavbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

const AppContent = () => {
  const { user, loading } = useContext(AuthContext);

  // Handle loading state
  if (loading) return <div>Loading...</div>;

  return (
    <>
      {user ? <UserNavbar /> : <PublicNavbar />}
      <Routes>
        {/* Routes for unauthenticated users */}
        {!user ? (
          <>
            <Route path="/" element={<PublicHomepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            {/* Routes for authenticated users */}
            <Route path="/" element={<UserHomepage />} />
            <Route path="/students/:studentId" element={<ViewStudentProfile />} />


            
            {/* Conditional routes based on user role */}
            {user.role === "student" ? (
              <>
                <Route path="/profile" element={<StudentProfilePage />} />
                <Route path="/projects" element={<StudentProjects />} />
                <Route path="/connect" element={<ConnectPage />} />
                <Route path="/dashboard" element={<StudentDashboard />} />
                <Route path="/connections" element={<MyConnectionPage />} />
                {/* <Route path="/sponsor-profile/:sponsorId" element={<ViewSponsorProfile/>}/> */}
              </>
            ) : (
              <>
                <Route path="/profile" element={<SponsorProfilePage />} />
                <Route path="/connect" element={<SponsorConnectPage />} />
                <Route path="/dashboard" element={<SponsorDashboard />} />
              </>
            )}

            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
