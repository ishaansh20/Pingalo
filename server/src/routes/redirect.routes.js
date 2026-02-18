import express from "express";
import { redirectToOriginalUrl } from "../controllers/redirect.controller.js";
import { redirectLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();
router.get("/:shortCode", redirectLimiter, redirectToOriginalUrl);
export default router;
