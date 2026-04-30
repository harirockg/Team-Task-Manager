export default function TaskCard({ task, onUpdate }) {
  return (
    <div className="bg-gray-800 p-4 rounded">
      <h3 className="text-white">{task.title}</h3>

      <p className="text-gray-400">{task.description}</p>

      <p className="text-sm mt-2">{task.status}</p>

      <select
        className="mt-2 p-1"
        value={task.status}
        onChange={(e) => onUpdate(task._id, e.target.value)}
      >
        <option value="todo">Todo</option>
        <option value="inprogress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}