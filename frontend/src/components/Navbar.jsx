import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-[#0f172a] text-white">
      <h1 className="text-xl font-bold">Team Task Manager</h1>

      <div className="flex gap-4 items-center">
        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/tasks">Tasks</Link>

            {user?.role === "admin" && (
              <Link to="/projects">Projects</Link>
            )}

            <span className="text-sm text-gray-300">
              {user?.name} ({user?.role})
            </span>

            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-blue-500 px-3 py-1 rounded">
              Login
            </Link>
            <Link to="/signup" className="bg-green-500 px-3 py-1 rounded">
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
}












