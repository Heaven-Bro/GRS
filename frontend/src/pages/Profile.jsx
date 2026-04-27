import { useEffect, useState } from "react";
import { getProfile } from "../services/api";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                setProfile(response.data);
            } catch (error) {
                console.log(error.response?.data);
                setMessage("Failed to load profile");
            }
        };

        fetchProfile();
    }, []);

    if (message) {
        return <p className="message">{message}</p>;
    }

    if (!profile) {
        return <p className="message">Loading profile...</p>;
    }

    return (
        <div className="page">
            <div className="card">
                <h1>My Profile</h1>
                <p className="subtitle">Student account information</p>

                <div className="profile-info">
                    <p><strong>Username:</strong> {profile.username}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Full Name:</strong> {profile.full_name}</p>
                    <p><strong>Student ID:</strong> {profile.student_id}</p>
                    <p><strong>Department:</strong> {profile.department}</p>
                    <p><strong>Year:</strong> {profile.year}</p>
                    <p><strong>Semester:</strong> {profile.semester}</p>
                    <p><strong>Role:</strong> {profile.is_admin ? "Admin" : "Student"}</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;