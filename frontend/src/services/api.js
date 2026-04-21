import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    withCredentials: true,
});

export const registerUser = (userData) => {
    return api.post("/accounts/register/", userData);
};

export const loginUser = (loginData) => {
    return api.post("/accounts/login/", loginData);
};

export const logoutUser = () => {
    return api.post("/accounts/logout/");
};

export const submitComplaint = (data) => {
    return api.post("/complaints/submit/", data);
};
export const getAllComplaints = () => {
    return api.get("/complaints/all/");
};

export const updateComplaintStatus = (complaintId, status) => {
    return api.patch(`/complaints/update-status/${complaintId}/`, { status });
};
export default api;