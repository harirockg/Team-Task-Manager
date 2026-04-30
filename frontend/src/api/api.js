import axios from "axios";

const API = axios.create({
  baseURL: "https://team-task-manager-9t58.onrender.com/api",
});

// TOKEN AUTO ADD
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;