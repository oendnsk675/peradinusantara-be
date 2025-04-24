import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routeAuth from './routes/authRoute.js';
import routeArticle from './routes/articleRoutes.js';


const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());

app.use(routeAuth);
app.use(routeArticle);

export default app;