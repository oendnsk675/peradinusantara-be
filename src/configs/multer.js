import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "..", "uploads", "news")); // Folder penyimpanan
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama unik
  },
});

export const storageThumbnail = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "..", "uploads", "thumbnail")); // Folder penyimpanan
  },
  filename: function (req, file, cb) {
    console.log(file.originalname);
    cb(null, Date.now() + path.extname(file.originalname)); // Nama unik
  },
});
