import { Router } from "express";
import { healthCheck } from "../middlewares/healthcheck.controllers.js";

const router = Router();

router.get('/', healthCheck);

export default router;