import { useEffect, useState } from "react";
import { getAllComplaints } from "../services/api";

function AdminComplaints() {
    const [complaints, setComplaints] = useState([]);
    const [message, setMessage] = useState("");

    const fetchComplaints = async () => {
        try {
            const response = await getAllComplaints();
            setComplaints(response.data);
        } catch (error) {
            console.log(error.response?.data);
            setMessage("Failed to load complaints");
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    return (
        <div className="page">
            <div className="card" style={{ maxWidth: "1100px" }}>
                <h1>All Complaints</h1>
                <p className="subtitle">Admin can view all submitted complaints here</p>

                {message && <p className="message">{message}</p>}

                <div style={{ overflowX: "auto" }}>
                    <table className="complaint-table">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Name</th>
                                <th>Student ID</th>
                                <th>Department</th>
                                <th>Session</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {complaints.length > 0 ? (
                                complaints.map((c, index) => (
                                    <tr key={c.id}>
                                        <td>{index + 1}</td>
                                        <td>{c.full_name}</td>
                                        <td>{c.student_id}</td>
                                        <td>{c.department}</td>
                                        <td>{c.session}</td>
                                        <td>{c.title}</td>
                                        <td>{c.category}</td>
                                        <td>{c.description}</td>
                                        <td>{c.status}</td>
                                        <td>{new Date(c.created_at).toLocaleString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" style={{ textAlign: "center" }}>
                                        No complaints found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminComplaints;