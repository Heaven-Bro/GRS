import { useState } from "react";
import { Link } from "react-router-dom";
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
        const { dataset, value } = event.target;
        const fieldName = dataset.field;

        setFormData({
            ...formData,
            [fieldName]: value,
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

            const data = error.response?.data;
            if (data) {
                const firstError = Object.values(data)[0];
                setMessage(Array.isArray(firstError) ? firstError[0] : "Registration failed");
            } else {
                setMessage("Registration failed");
            }
        }
    };

    return (
        <div className="page">
            <div className="card">
                <h1>Register</h1>
                <p className="subtitle">Create your student account</p>

                {message && <p className="message">{message}</p>}

                <form onSubmit={handleSubmit} autoComplete="off">
                    <input type="text" name="fakeuser" autoComplete="off" style={{ display: "none" }} />
                    <input type="password" name="fakepass" autoComplete="new-password" style={{ display: "none" }} />

                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="reg_user_field"
                            data-field="username"
                            value={formData.username}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder="Choose username"
                        />
                    </div>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="reg_full_name_field"
                            data-field="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder="Enter full name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Student ID</label>
                        <input
                            type="text"
                            name="reg_student_id_field"
                            data-field="student_id"
                            value={formData.student_id}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder="Enter student ID"
                        />
                    </div>

                    <div className="form-group">
                        <label>Department</label>
                        <input
                            type="text"
                            name="reg_department_field"
                            data-field="department"
                            value={formData.department}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder="Example: CSE"
                        />
                    </div>

                    <div className="form-group">
                        <label>Year</label>
                        <select data-field="year" value={formData.year} onChange={handleChange}>
                            <option value="">Select Year</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Semester</label>
                        <select data-field="semester" value={formData.semester} onChange={handleChange}>
                            <option value="">Select Semester</option>
                            <option value="1">1st Semester</option>
                            <option value="2">2nd Semester</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>University Email</label>
                        <input
                            type="email"
                            name="reg_email_field"
                            data-field="email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder="example@student.just.edu.bd"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="reg_pass_field"
                            data-field="password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            placeholder="Create password"
                        />
                    </div>

                    <button className="primary-btn" type="submit">
                        Create Account
                    </button>

                    <p className="auth-switch-text">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;