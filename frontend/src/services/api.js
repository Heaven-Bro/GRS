import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
});

// Auth APIs
export const registerUser = (data) => {
    return API.post("accounts/register/", data);
};

export const loginUser = (data) => {
    return API.post("accounts/login/", data);
};

export default API;