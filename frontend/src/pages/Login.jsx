import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

function Login({ setIsLoggedIn, setIsAdmin }) {
    const [formData, setFormData] = useState({
        username: "",
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
            localStorage.setItem("is_admin", response.data.user.is_admin);

            setIsLoggedIn(true);
            setIsAdmin(response.data.user.is_admin);

            setFormData({
                username: "",
                password: "",
            });

            navigate("/");
        } catch (error) {
            console.log(error.response?.data);

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

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
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
                        />
                    </div>

                    <button className="primary-btn" type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;