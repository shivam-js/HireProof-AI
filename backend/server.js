import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads")
  )
);

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://hireproof-ai.netlify.app",
    ],
    credentials: true,
  })
);


app.use("/api/auth", authRoutes);

app.use(
  "/api/candidates",
  candidateRoutes
);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});