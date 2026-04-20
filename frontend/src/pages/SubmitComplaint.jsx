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
            const response = await submitComplaint(formData);
            setMessage("Complaint submitted successfully");

            setFormData({
                title: "",
                category: "",
                description: "",
            });
        } catch (error) {
            console.log(error.response?.data);
            setMessage("Submission failed. Please login first.");
        }
    };

    return (
        <div>
            <h1>Submit Complaint</h1>

            {message && <p>{message}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Submit Complaint</button>
            </form>
        </div>
    );
}

export default SubmitComplaint;