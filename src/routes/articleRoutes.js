import express from "express";
import { getAllNews, addNewNews, getNewsByTitle, updateNews, deleteNews } from "../controllers/articleController.js";
import verifyToken from "../middlewares/authMiddleware.js";
import verifyIsNewsOwner from "../middlewares/authIsNewsOwner.js";

const routerArticle = express.Router();

// route untuk mengambil semua artikel yang ada
routerArticle.get("/", verifyToken, getAllNews); // hanya dapat diakses oleh user yang telah login

// route untuk menambahkan artikel baru
routerArticle.post("/", verifyToken, addNewNews); // hanya dapat diakses oleh user yang telah login

// route untuk mencari artikel berdasarkan judul
routerArticle.get("/search", getNewsByTitle); // boleh diakses oleh semua user

// route untuk update artikel
routerArticle.patch("/:id", verifyToken, verifyIsNewsOwner, updateNews); // hanya dapat diakses oleh user yang telah login

// route untuk hapus artikel
routerArticle.delete("/:id", verifyToken, verifyIsNewsOwner, deleteNews); // hanya dapat diakses oleh user yang telah login

export default routerArticle;










