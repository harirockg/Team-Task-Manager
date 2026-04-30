import express from "express";
import {
  signup,
  login,
  logout,
  getMe,
  getAllUsers,
} from "../controllers/auth.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

/* ================= AUTH ================= */
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

/* ================= USER ================= */
router.get("/me", protect, getMe);
router.get("/users", protect, getAllUsers);

export default router;