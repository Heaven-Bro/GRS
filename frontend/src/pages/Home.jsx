import { Link } from "react-router-dom";

function Home() {
    const username = localStorage.getItem("username");

    return (
        <div className="hero">
            <h1>University Grievance Redress System</h1>
            <p>
                A digital platform where students can register, log in, submit complaints,
                and track grievance-related activities in a simple and secure way.
            </p>

            <div className="hero-actions">
                {!username && <Link className="primary-btn" to="/login">Login</Link>}
                {!username && <Link className="secondary-btn" to="/register">Register</Link>}
                {username && <Link className="primary-btn" to="/submit">Submit Complaint</Link>}
            </div>

            {username && (
                <div className="info-box">
                    Logged in as: <strong>{username}</strong>
                </div>
            )}
        </div>
    );
}

export default Home;