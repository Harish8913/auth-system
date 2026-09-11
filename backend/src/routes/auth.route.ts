import { Router } from "express";
import {
  loginUser,
  logout,
  refresh,
  registerAdmin,
  registerUser,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerAdmin);
router.post("/user", registerUser);
router.post("/auth", loginUser);
router.post("/refresh", refresh);
router.post('/logout', logout);

export default router;
