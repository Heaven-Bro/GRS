import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/api";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [message, setMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                setProfile(response.data);
            } catch (error) {
                setMessage("Failed to load profile");
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        try {
            const response = await updateProfile({
                full_name: profile.full_name,
                department: profile.department,
                year: profile.year,
                semester: profile.semester,
            });

            setProfile(response.data);
            setIsEditing(false);
            setMessage("Profile updated successfully");
        } catch (error) {
            setMessage("Failed to update profile");
        }
    };

    if (!profile) return <p className="message">Loading profile...</p>;

    return (
        <div className="page">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {profile.full_name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div>
                        <h1>{profile.full_name}</h1>
                        <p>{profile.email}</p>
                        <span className="role-badge">
                            {profile.is_admin ? "Admin" : "Student"}
                        </span>
                    </div>
                </div>

                {message && <p className="message">{message}</p>}

                {!isEditing ? (
                    <>
                        <div className="profile-grid">
                            <div className="profile-item">
                                <span>Username</span>
                                <strong>{profile.username}</strong>
                            </div>

                            <div className="profile-item">
                                <span>Student ID</span>
                                <strong>{profile.student_id}</strong>
                            </div>

                            <div className="profile-item">
                                <span>Department</span>
                                <strong>{profile.department}</strong>
                            </div>

                            <div className="profile-item">
                                <span>Year</span>
                                <strong>{profile.year}</strong>
                            </div>

                            <div className="profile-item">
                                <span>Semester</span>
                                <strong>{profile.semester}</strong>
                            </div>
                        </div>

                        <button className="primary-btn" onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </button>
                    </>
                ) : (
                    <>
                        <div className="edit-profile-form">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    name="full_name"
                                    value={profile.full_name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Department</label>
                                <input
                                    name="department"
                                    value={profile.department}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Year</label>
                                <select name="year" value={profile.year} onChange={handleChange}>
                                    <option value="">Select Year</option>
                                    <option value="1">1st Year</option>
                                    <option value="2">2nd Year</option>
                                    <option value="3">3rd Year</option>
                                    <option value="4">4th Year</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Semester</label>
                                <select
                                    name="semester"
                                    value={profile.semester}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Semester</option>
                                    <option value="1">1st Semester</option>
                                    <option value="2">2nd Semester</option>
                                </select>
                            </div>
                        </div>

                        <div className="profile-actions">
                            <button className="primary-btn" onClick={handleSave}>
                                Save Changes
                            </button>

                            <button
                                className="cancel-btn"
                                onClick={() => {
                                    setIsEditing(false);
                                    setMessage("");
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Profile;