import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Inward from "./pages/Inward";
import Repair from "./pages/Repair";
import Outward from "./pages/Outward";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="flex relative">
                  <Sidebar 
                    isOpen={isSidebarOpen} 
                    toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
                  />
                  <div className="md:ml-64 p-4 md:p-6 w-full">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/inward" element={<Inward />} />
                      <Route path="/repair" element={<Repair />} />
                      <Route path="/outward" element={<Outward />} />
                    </Routes>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
