import axios from "axios";

// 👉 Agar env variable hai to use karega
// 👉 nahi hai to fallback Render backend pe jayega
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://team-task-manager-9t58.onrender.com/api",
  withCredentials: true, // cookies support (important for auth)
});

// 🔐 TOKEN AUTO ADD
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;