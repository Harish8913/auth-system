import { Router } from "express";
import { service1 } from "../controllers/service1.controller.js";
import { service2 } from "../controllers/service2.controller.js";

const router = Router();

router.get("/service-one", service1);
router.get("/service-two", service2);

export default router;
