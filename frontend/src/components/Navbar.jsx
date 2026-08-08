import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/api";

function Navbar({ isLoggedIn, isAdmin, setIsLoggedIn, setIsAdmin }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();

            localStorage.removeItem("username");
            localStorage.removeItem("email");
            localStorage.removeItem("is_admin");

            setIsLoggedIn(false);
            setIsAdmin(false);

            navigate("/");
        } catch (error) {
            console.log(error.response?.data);
        }
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/" className="logo">
                    GRS
                </Link>

                <div className="nav-links">
                    <Link to="/">Home</Link>

                    {!isLoggedIn && (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}

                    {isLoggedIn && !isAdmin && (
                        <>
                            <Link to="/submit">Submit Complaint</Link>
                            <Link to="/profile">Profile</Link>
                        </>
                    )}

                    {isLoggedIn && isAdmin && (
                        <Link to="/admin-complaints">Admin Panel</Link>
                    )}
                </div>
            </div>

            {isLoggedIn && (
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            )}
        </nav>
    );
}

export default Navbar;