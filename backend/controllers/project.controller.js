import Project from "../models/project.model.js";


export const createProject = async (req, res) => {
  try {
    const { name } = req.body;

    const project = await Project.create({
      name,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      project,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Project creation failed",
    });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    res.json({
      success: true,
      projects,
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};



























