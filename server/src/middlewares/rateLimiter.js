import rateLimit from "express-rate-limit";

export const createUrlLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: "Too many URLs created , please try again later.",
  },
});

export const redirectLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: "Too many requests , please slow down.",
  },
});
