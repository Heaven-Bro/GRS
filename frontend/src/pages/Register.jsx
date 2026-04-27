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
        <div className="page">
            <div className="card">
                <h1>Register</h1>
                <p className="subtitle">Create your student account</p>

                {message && <p className="message">{message}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Student ID</label>
                        <input type="text" name="student_id" value={formData.student_id} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Department</label>
                        <input type="text" name="department" value={formData.department} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Year</label>
                        <select name="year" value={formData.year} onChange={handleChange}>
                            <option value="">Select Year</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option> 
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Semester</label>
                        <select name="semester" value={formData.semester} on onChange={handleChange}>
                            <option value="">Select Semester</option>
                            <option value="1">1st Semester</option>
                            <option value="2">2nd Semester</option>
                        </select>                    
                    </div>

                    <div className="form-group">
                        <label>University Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    </div>

                    <button className="primary-btn" type="submit">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;