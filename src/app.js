import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import routeArticle from "./routes/articleRoutes.js";
import routeAuth from "./routes/authRoute.js";
import routeCategory from "./routes/categoryRoute.js";

const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());


app.use("/auth", routeAuth);
app.use("/category", routeCategory);
app.use("/news", routeArticle);

export default app;
