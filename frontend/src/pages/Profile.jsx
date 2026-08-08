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

                // ✅ NEW FIELDS
                current_address: profile.current_address,
                permanent_address: profile.permanent_address,
                blood_group: profile.blood_group,
                phone_number: profile.phone_number,
                date_of_birth: profile.date_of_birth,
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

                {/* 🔵 Header */}
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
                        {/* 🎓 Academic Info */}
                        <h2 className="section-title">Academic Information</h2>

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

                        {/* 👤 Personal Info */}
                        <h2 className="section-title">Personal Information</h2>

                        <div className="profile-grid">
                            <div className="profile-item">
                                <span>Current Address</span>
                                <strong>{profile.current_address || "Not set"}</strong>
                            </div>

                            <div className="profile-item">
                                <span>Permanent Address</span>
                                <strong>{profile.permanent_address || "Not set"}</strong>
                            </div>

                            <div className="profile-item">
                                <span>Blood Group</span>
                                <strong>{profile.blood_group || "Not set"}</strong>
                            </div>

                            <div className="profile-item">
                                <span>Phone</span>
                                <strong>{profile.phone_number || "Not set"}</strong>
                            </div>

                            <div className="profile-item">
                                <span>Date of Birth</span>
                                <strong>{profile.date_of_birth || "Not set"}</strong>
                            </div>
                        </div>

                        <button className="primary-btn" onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </button>
                    </>
                ) : (
                    <>
                        {/* ✏️ Edit Mode */}
                        <h2 className="section-title">Edit Profile</h2>

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
                                <select name="semester" value={profile.semester} onChange={handleChange}>
                                    <option value="">Select Semester</option>
                                    <option value="1">1st Semester</option>
                                    <option value="2">2nd Semester</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Current Address</label>
                                <input
                                    name="current_address"
                                    value={profile.current_address || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Permanent Address</label>
                                <input
                                    name="permanent_address"
                                    value={profile.permanent_address || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Blood Group</label>
                                <select
                                    name="blood_group"
                                    value={profile.blood_group || ""}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    name="phone_number"
                                    value={profile.phone_number || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    name="date_of_birth"
                                    value={profile.date_of_birth || ""}
                                    onChange={handleChange}
                                />
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