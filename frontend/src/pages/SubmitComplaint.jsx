import { useState } from "react";
import { submitComplaint } from "../services/api";

function SubmitComplaint() {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
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
            await submitComplaint(formData);
            setMessage("Complaint submitted successfully");

            setFormData({
                title: "",
                category: "",
                description: "",
            });
        } catch (error) {
            console.log(error.response?.data);

            if (error.response?.data?.detail) {
                setMessage(error.response.data.detail);
            } else {
                setMessage("Submission failed");
            }
        }
    };

    return (
        <div className="page">
            <div className="card">
                <h1>Submit Complaint</h1>
                <p className="subtitle">Fill in your grievance details carefully</p>

                {message && <p className="message">{message}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Complaint Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter complaint title"
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Example: Academic, Hostel, Transport"
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Write the details of your complaint"
                        />
                    </div>

                    <button className="primary-btn" type="submit">
                        Submit Complaint
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SubmitComplaint;