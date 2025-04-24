import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import routeArticle from "./routes/articleRoutes.js";
import routeAuth from "./routes/authRoute.js";
const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());

app.use(routeAuth);
app.use(routeArticle);

export default app;
