import express from "express";
import { createProject, getProjects } from "../controllers/project.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";

const router = express.Router();

// ONLY ADMIN
router.post("/", protect, isAdmin, createProject);

// BOTH
router.get("/", protect, getProjects);

export default router;