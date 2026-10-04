import { Router } from "express";
import { registerOrg } from "../controllers/organization.controller.js";
import { authZ } from "../middlewares/authz.middleware.js";
const router = Router();

router.post("/org-register", authZ("DEVELOPER"), registerOrg);

export default router;
