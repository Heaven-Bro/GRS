import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";

function Login({ setIsLoggedIn, setIsAdmin }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await loginUser(formData);

            setMessage(response.data.message);

            localStorage.setItem("username", response.data.user.username);
            localStorage.setItem("email", response.data.user.email);
            localStorage.setItem("is_admin", response.data.user.is_admin);

            setIsLoggedIn(true);
            setIsAdmin(response.data.user.is_admin);

            setFormData({
                email: "",
                password: "",
            });

            navigate("/");
        } catch (error) {
            if (error.response?.data?.error) {
                setMessage(error.response.data.error);
            } else {
                setMessage("Login failed");
            }
        }
    };

    return (
        <div className="page">
            <div className="card">
                <h1>Login</h1>
                <p className="subtitle">Enter your account credentials</p>

                {message && <p className="message">{message}</p>}

                <form onSubmit={handleSubmit} autoComplete="off">

                    {/* fake fields to stop autofill */}
                    <input type="text" name="fakeuser" style={{ display: "none" }} />
                    <input type="password" name="fakepass" style={{ display: "none" }} />

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@student.just.edu.bd"
                            autoComplete="off"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            autoComplete="new-password"
                        />
                    </div>

                    {/* ✅ BIG BUTTON */}
                    <button className="primary-btn big-btn" type="submit">
                        → Sign In
                    </button>

                    {/* ✅ TEXT BELOW BUTTON */}
                    <p className="auth-switch-text">
                        Don’t have an account?{" "}
                        <Link to="/register">Create account</Link>
                    </p>

                </form>
            </div>
        </div>
    );
}

export default Login;