import express from "express";
import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} from "../controllers/task.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";

const router = express.Router();

// ADMIN
router.post("/", protect, isAdmin, createTask);

// BOTH
router.get("/", protect, getTasks);

// STATUS UPDATE
router.put("/:id", protect, updateTaskStatus);

// ADMIN DELETE
router.delete("/:id", protect, isAdmin, deleteTask);

export default router;