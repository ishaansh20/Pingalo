import express from "express";
import { createShortUrl, getMyUrls } from "../controllers/url.controller.js";
import { createUrlLimiter } from "../middlewares/rateLimiter.js";
import { protect } from "../middlewares/auth.middleware.js";
import { deleteUrl } from "../controllers/url.controller.js";
const router = express.Router();

router.post("/shorten", protect, createUrlLimiter, createShortUrl);
router.get("/my-urls", protect, getMyUrls);
router.delete("/:id", protect, deleteUrl);

export default router;
