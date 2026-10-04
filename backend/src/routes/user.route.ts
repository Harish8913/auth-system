import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { authZ } from "../middlewares/authz.middleware.js";

const router = Router();

router.post("/user", authZ("ADMIN", "DEVELOPER"), registerUser);

export default router;
