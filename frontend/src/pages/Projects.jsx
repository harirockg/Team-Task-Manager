import { useEffect, useState } from "react";
import axios from "axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const token = localStorage.getItem("token");

  // GET PROJECTS
  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(res.data.projects);
    } catch (err) {
      console.log(err);
    }
  };

  // ➕ CREATE PROJECT
  const createProject = async () => {
    if (!name) return alert("Enter project name");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/projects",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Project Created");

      setName("");
      fetchProjects(); //  refresh list
    } catch (err) {
      console.log(err);
      alert("Error creating project");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl mb-4">Projects</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project name"
          className="p-2 text-black"
        />
        <button
          onClick={createProject}
          className="bg-blue-500 px-4"
        >
          Create
        </button>
      </div>

      {/* LIST */}
      {projects.map((p) => (
        <div key={p._id} className="bg-gray-800 p-3 mb-2">
          {p.name}
        </div>
      ))}
    </div>
  );
}




// import { useEffect, useState } from "react";
// import API from "../api/api";

// export default function Projects() {
//   const [projects, setProjects] = useState([]);
//   const [name, setName] = useState("");

//   const getProjects = async () => {
//     const res = await API.get("/projects");
//     setProjects(res.data.projects);
//   };

//   const createProject = async () => {
//     await API.post("/projects", { name });
//     setName("");
//     getProjects();
//   };

//   useEffect(() => {
//     getProjects();
//   }, []);

//   return (
//     <div className="p-6 text-white">
//       <h1 className="text-2xl mb-4">Projects</h1>

//       <div className="flex gap-2 mb-4">
//         <input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Project Name"
//           className="p-2 text-black"
//         />
//         <button
//           onClick={createProject}
//           className="bg-blue-500 px-4"
//         >
//           Create
//         </button>
//       </div>

//       {projects.map((p) => (
//         <div key={p._id} className="mb-2">
//           {p.name}
//         </div>
//       ))}
//     </div>
//   );
// }