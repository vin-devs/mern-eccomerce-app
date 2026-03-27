// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// utils
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

// Connect to Database
connectDB();

const app = express();

// 1. Fully Enhanced CORS Configuration
// This ensures Vercel can talk to Render securely
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://marketbasex.vercel.app",
      "https://marketbasex-ki1yihvn0-mutukuvincent752-7467s-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Required for cookies (JWT)
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    optionsSuccessStatus: 200, // Forces 200 OK for OPTIONS (some browsers hate 204)
  }),
);

// 2. Manual Handshake Middleware (The "Safe" Wildcard)
// This avoids the path-to-regexp crash while handling Preflights
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.status(200).send("OK");
  }
  next();
});

// 3. Payload Limits & Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// 4. Routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve();

app.listen(port, () => console.log(`Server started on port ${port}`));
