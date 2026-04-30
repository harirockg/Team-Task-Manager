import { useEffect, useState } from "react";
import API from "../api/api";

export default function CreateTaskModal({ onClose, refresh }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState("");
  const [assignedTo, setAssignedTo] = useState([]);
  const [priority, setPriority] = useState("medium");

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  // 🔥 Fetch projects + users
  const getProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data.projects);
    } catch (err) {
      console.log(err);
    }
  };

  const getUsers = async () => {
    try {
      const res = await API.get("/auth/users"); // backend me hona chahiye
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   getProjects();
  //   getUsers();
  // }, []);

  useEffect(() => {
  const fetchData = async () => {
    await getProjects();
    await getUsers();
  };

  fetchData();
}, []);

  // 🔥 Create Task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks", {
        title,
        description,
        projectId: project,
        assignedTo,
        priority,
      });

      refresh(); // reload tasks
      onClose(); // close modal
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-6 rounded-xl w-[400px] text-white">
        <h2 className="text-xl font-bold mb-4">Create Task</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="p-2 bg-gray-800 rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="p-2 bg-gray-800 rounded"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* PROJECT */}
          <select
            className="p-2 bg-gray-800 rounded"
            value={project}
            onChange={(e) => setProject(e.target.value)}
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>

          {/* USERS */}
          <select
            className="p-2 bg-gray-800 rounded"
            onChange={(e) => setAssignedTo([e.target.value])}
          >
            <option>Select User</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>

          {/* PRIORITY */}
          <select
            className="p-2 bg-gray-800 rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button className="bg-blue-500 p-2 rounded mt-2">
            Create Task
          </button>
        </form>

        <button
          onClick={onClose}
          className="text-red-400 mt-3 block mx-auto"
        >
          Close
        </button>
      </div>
    </div>
  );
}