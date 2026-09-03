import { Router } from "express";
import { registerAdmin } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerAdmin);

export default router;
