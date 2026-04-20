import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SubmitComplaint from "./pages/SubmitComplaint";
import { logoutUser } from "./services/api";

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("username");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo">GRS</div>
          <div className="nav-links">
            <Link to="/">Home</Link>

            {!isLoggedIn && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}

            {isLoggedIn && (
              <>
                <Link to="/submit">Submit Complaint</Link>
              </>
            )}
          </div>
        </div>

        {isLoggedIn && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/submit" element={<SubmitComplaint />} />
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