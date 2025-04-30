import express from "express";
import { getAllNews, addNewNews, getNewsByTitle, updateNews, deleteNews } from "../controllers/articleController.js";
import verifyToken from "../middlewares/authMiddleware.js";
import verifyIsNewsOwner from "../middlewares/authIsNewsOwner.js";
import verifyRole from "../middlewares/authRole.js";

const routerArticle = express.Router();

// route untuk mengambil semua artikel yang ada
routerArticle.get("/", verifyToken, getAllNews);

// route untuk menambahkan artikel baru
routerArticle.post("/", verifyToken, verifyRole("ADMIN", "USER"), addNewNews);

// route untuk mencari artikel berdasarkan judul
routerArticle.get("/search", getNewsByTitle); // boleh diakses oleh semua user

// route untuk update artikel
routerArticle.patch("/:id", verifyToken, verifyIsNewsOwner, verifyRole("ADMIN", "USER"), updateNews);

// route untuk hapus artikel
routerArticle.delete("/:id", verifyToken, verifyIsNewsOwner, verifyRole("ADMIN", "USER"), deleteNews);

export default routerArticle;










