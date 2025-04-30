import express from "express";
import { getAllCategories, addCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js";
import verifyToken from "../middlewares/authMiddleware.js";
import verifyRole from "../middlewares/authRole.js";

const routerCategory = express.Router();

// route untuk mengambil semua kategori yang ada
routerCategory.get("/", verifyToken, getAllCategories); // route ini hanya dapat diakses oleh user yang telah login

// route untuk menambahkan kategori baru
routerCategory.post("/", verifyToken, verifyRole("ADMIN"), addCategory); // route ini hanya dapat diakses oleh user yang telah login

// route untuk mengupdate kategori
routerCategory.patch("/:id", verifyToken, verifyRole("ADMIN"), updateCategory); // route ini hanya dapat diakses oleh user yang telah login

// route untuk menghapus kategori
routerCategory.delete("/:id", verifyToken, verifyRole("ADMIN"), deleteCategory); // route ini hanya dapat diakses oleh user yang telah login

export default routerCategory;