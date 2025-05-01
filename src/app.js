import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import routeArticle from "./routes/articleRoutes.js";
import routeAuth from "./routes/authRoute.js";
import routeCategory from "./routes/categoryRoute.js";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

dotenv.config();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.get("/healthcheck", (req, res) => {
  res.status(200).json({ message: "Oke!" });
  return;
});
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use("/auth", routeAuth);
app.use("/category", routeCategory);
app.use("/news", routeArticle);

export default app;
