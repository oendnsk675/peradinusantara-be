import express from "express";
import {
  addNewNews,
  deleteNews,
  getAllNews,
  getDetailById,
  getDetailNews,
  getNewsByTitle,
  updateNews,
  uploadImage,
} from "../controllers/articleController.js";
import verifyIsNewsOwner from "../middlewares/authIsNewsOwner.js";
import verifyToken from "../middlewares/authMiddleware.js";
import { upload, uploadThumbnail } from "../middlewares/multer.js";

const routerArticle = express.Router();

// route untuk mengambil semua artikel yang ada
routerArticle.get("/", getAllNews);

// route untuk mencari artikel berdasarkan judul
routerArticle.get("/search", getNewsByTitle); // boleh diakses oleh semua user

// route untuk mengambil semua artikel yang ada
routerArticle.get("/:slug", getDetailNews);
routerArticle.get("/getById/:id", getDetailById);

routerArticle.post("/image", verifyToken, upload.single("image"), uploadImage);

// route untuk menambahkan artikel baru
routerArticle.post(
  "",
  verifyToken,
  uploadThumbnail.single("image"),
  addNewNews
);

// route untuk update artikel
routerArticle.patch(
  "/:id",
  verifyToken,
  verifyIsNewsOwner,
  uploadThumbnail.single("image"),
  updateNews
);

// route untuk hapus artikel
routerArticle.delete("/:id", verifyToken, verifyIsNewsOwner, deleteNews);

export default routerArticle;
