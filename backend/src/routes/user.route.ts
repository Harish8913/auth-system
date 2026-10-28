import { Router } from "express";
import { deleteUser, registerUser } from "../controllers/user.controller.js";
import { authZ } from "../middlewares/authz.middleware.js";

const router = Router();

router.post("/user", authZ("ADMIN", "DEVELOPER"), registerUser);
router.delete("/user/:id", deleteUser);

export default router; 
