import Task from "../models/Task.js";
import Project from "../models/project.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find();
    } else {
      tasks = await Task.find({ assignedTo: req.user.id });
    }

    const projectsCount =
      req.user.role === "admin"
        ? await Project.countDocuments()
        : await Project.countDocuments({ members: req.user.id });

    const stats = {
      totalProjects: projectsCount,
      totalTasks: tasks.length,
      todo: tasks.filter((t) => t.status === "todo").length,
      inProgress: tasks.filter((t) => t.status === "inprogress").length,
      done: tasks.filter((t) => t.status === "done").length,
    };

    res.json({ success: true, stats });
  } catch {
    res.status(500).json({ success: false });
  }
};