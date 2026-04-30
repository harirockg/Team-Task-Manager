import { useEffect, useState } from "react";
import API from "../api/api";
import TaskCard from "../components/TaskCard";
import CreateTaskModal from "../components/CreateTaskModal";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 🔥 Get Tasks
  const getTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.tasks);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 Update Task
  const updateTask = async (id, status) => {
  await API.put(`/tasks/${id}`, { status });
  getTasks();
};

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          + Create Task
        </button>
      </div>

      {/* TASK GRID */}
      <div className="grid grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onUpdate={updateTask}
          />
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <CreateTaskModal
          onClose={() => setShowModal(false)}
          refresh={getTasks}
        />
      )}
    </div>
  );
}