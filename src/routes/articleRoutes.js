import express from "express";
import { getAllArticles, addNewArticle, getArticleByTitle, updateArticle, deleteArticle } from "../controllers/articleController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const routerArticle = express.Router();

// route untuk mengambil semua artikel yang ada
routerArticle.get("/", verifyToken, getAllArticles);

// route untuk menambahkan artikel baru
routerArticle.post("/", addNewArticle);

// route untuk mencari artikel berdasarkan judul
routerArticle.get("/search", getArticleByTitle);

// route untuk update artikel
routerArticle.patch("/:id", verifyToken, updateArticle);

// rote untuk hapus artikel
routerArticle.delete("/:id", verifyToken, deleteArticle);

export default routerArticle;










