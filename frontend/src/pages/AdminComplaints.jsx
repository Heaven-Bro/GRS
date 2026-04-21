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
                                <th>ID</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>User</th>
                                <th>Anonymous</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.length > 0 ? (
                                complaints.map((complaint) => (
                                    <tr key={complaint.id}>
                                        <td>{complaint.id}</td>
                                        <td>{complaint.title}</td>
                                        <td>{complaint.category}</td>
                                        <td>{complaint.description}</td>
                                        <td>{complaint.status}</td>
                                        <td>{complaint.user}</td>
                                        <td>{complaint.is_anonymous ? "Yes" : "No"}</td>
                                        <td>{new Date(complaint.created_at).toLocaleString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: "center" }}>
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