import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SubmitComplaint from "./pages/SubmitComplaint";
import AdminComplaints from "./pages/AdminComplaints";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const adminStatus = localStorage.getItem("is_admin") === "true";

    if (username) {
      setIsLoggedIn(true);
      setIsAdmin(adminStatus);
    }
  }, []);

  return (
    <div className="app-container">
      <Navbar
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        setIsLoggedIn={setIsLoggedIn}
        setIsAdmin={setIsAdmin}
      />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setIsAdmin={setIsAdmin}
            />
          }
        />

        <Route path="/register" element={<Register />} />

        <Route
          path="/submit"
          element={isLoggedIn && !isAdmin ? <SubmitComplaint /> : <Home />}
        />

        <Route
          path="/profile"
          element={isLoggedIn && !isAdmin ? <Profile /> : <Home />}
        />

        <Route
          path="/admin-complaints"
          element={isLoggedIn && isAdmin ? <AdminComplaints /> : <Home />}
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;