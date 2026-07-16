import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

// Create router
const router = express.Router();

// Register user route
router.post("/register", registerUser);

// Login user route
router.post("/login", loginUser);

// Export router
export default router;