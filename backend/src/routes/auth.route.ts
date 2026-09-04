import { Router } from "express";
import { loginUser, registerAdmin, registerUser } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerAdmin);
router.post("/user", registerUser);
router.post("/auth", loginUser)

export default router;
