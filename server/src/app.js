import express from "express";
import cors from "cors";
import morgan from "morgan";
import urlRoutes from "./routes/url.routes.js";
import redirectRoutes from "./routes/redirect.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://pingalo.onrender.com"],

    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/url", urlRoutes);
app.use("/", redirectRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
