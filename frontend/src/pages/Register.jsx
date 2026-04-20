import { useState } from "react";
import { registerUser } from "../services/api";

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        full_name: "",
        student_id: "",
        department: "",
        year: "",
        semester: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await registerUser(formData);
            setMessage(response.data.message);

            setFormData({
                username: "",
                full_name: "",
                student_id: "",
                department: "",
                year: "",
                semester: "",
                email: "",
                password: "",
            });
        } catch (error) {
            console.log(error.response?.data);
            setMessage("Registration failed");
        }
    };

    return (
        <div>
            <h1>Register Page</h1>

            {message && <p>{message}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Student ID:</label>
                    <input
                        type="text"
                        name="student_id"
                        value={formData.student_id}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Department:</label>
                    <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Year:</label>
                    <input
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Semester:</label>
                    <input
                        type="text"
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;