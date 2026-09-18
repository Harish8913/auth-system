import { Router } from "express";
import { registerOrg } from "../controllers/organization.controller.js";
const router = Router();

router.post("/register", registerOrg);

export default router;
