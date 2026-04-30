import Task from "../models/Task.js";

// CREATE TASK (ADMIN ONLY)
export const createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo } = req.body;

    const task = await Task.create({
      title,
      description,
      project: projectId,
      assignedTo,
      createdBy: req.user.id,
      status: "todo",
    });

    res.json({ success: true, task });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};

// GET TASKS
export const getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find().populate("assignedTo", "name");
    } else {
      tasks = await Task.find({
        assignedTo: req.user.id,
      }).populate("assignedTo", "name");
    }

    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// UPDATE STATUS
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (
      req.user.role !== "admin" &&
      task.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    task.status = status;
    await task.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// DELETE
export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
};