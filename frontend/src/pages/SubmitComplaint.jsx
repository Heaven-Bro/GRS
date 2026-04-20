import { useState } from "react";
import { submitComplaint } from "../services/api";

function SubmitComplaint() {
    const grievanceTypes = [
        "Ragging",
        "Harassment",
        "Faculty Behaviour",
        "Academic Probations",
        "Hostel",
        "SC/ST",
        "Canteen",
        "Transport",
        "Cleanliness",
        "Fees",
        "Other",
    ];

    const [formData, setFormData] = useState({
        grievance_type: "",
        extra_category: "",
        description: "",
        is_anonymous: false,
        document: null,
    });

    const [message, setMessage] = useState("");

    const handleChange = (event) => {
        const { name, value, type, checked, files } = event.target;

        setFormData({
            ...formData,
            [name]:
                type === "checkbox"
                    ? checked
                    : type === "file"
                        ? files[0]
                        : value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const finalCategory =
            formData.grievance_type === "Other"
                ? formData.extra_category
                : formData.grievance_type;

        const submitData = new FormData();
        submitData.append("title", finalCategory);
        submitData.append("category", finalCategory);
        submitData.append("description", formData.description);

        if (formData.document) {
            submitData.append("document", formData.document);
        }

        submitData.append("is_anonymous", formData.is_anonymous);

        try {
            await submitComplaint(submitData);
            setMessage("Complaint submitted successfully");

            setFormData({
                grievance_type: "",
                extra_category: "",
                description: "",
                is_anonymous: false,
                document: null,
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
                        <label>Grievance Type *</label>
                        <select
                            name="grievance_type"
                            value={formData.grievance_type}
                            onChange={handleChange}
                        >
                            <option value="">Select Category</option>
                            {grievanceTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    {formData.grievance_type === "Other" && (
                        <div className="form-group">
                            <label>Other Grievance Type *</label>
                            <input
                                type="text"
                                name="extra_category"
                                value={formData.extra_category}
                                onChange={handleChange}
                                placeholder="Write your grievance type"
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Write the details of your complaint"
                        />
                    </div>

                    <div className="form-group">
                        <label>Add Supporting Document (If any)</label>
                        <input
                            type="file"
                            name="document"
                            onChange={handleChange}
                            accept=".jpg,.jpeg,.png,.pdf,.mp4,.flv,.mkv"
                        />
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="is_anonymous"
                                checked={formData.is_anonymous}
                                onChange={handleChange}
                            />{" "}
                            File complaint anonymously
                        </label>
                    </div>

                    <button className="primary-btn" type="submit">
                        Submit
                    </button>
                </form>

                <div className="info-box" style={{ marginTop: "20px", textAlign: "left" }}>
                    <strong>Note:</strong>
                    <br />
                    * fields are mandatory to be filled.
                    <br />
                    Supported document types: .jpeg, .jpg, .png, .pdf, .mp4, .flv, .mkv
                    <br />
                    Do not use offensive language.
                </div>
            </div>
        </div>
    );
}

export default SubmitComplaint;