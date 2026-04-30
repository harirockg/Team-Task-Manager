import { useEffect, useState } from "react";
import API from "../api/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/dashboard").then(res => setStats(res.data.stats));
  }, []);

  if (!stats) return <p className="text-center mt-10">Loading...</p>;

  const Card = ({ title, value }) => (
    <div className="bg-gray-800 text-white p-5 rounded shadow">
      <h3 className="text-lg">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <Card title="Projects" value={stats.totalProjects} />
        <Card title="Tasks" value={stats.totalTasks} />
        <Card title="Todo" value={stats.todo} />
        <Card title="In Progress" value={stats.inProgress} />
        <Card title="Done" value={stats.done} />
      </div>
    </div>
  );
}