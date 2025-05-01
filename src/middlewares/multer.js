import multer from "multer";
import { storage, storageThumbnail } from "../configs/multer.js";

export const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 },
});

export const uploadThumbnail = multer({
  storage: storageThumbnail,
  limits: { fileSize: 1 * 1024 * 1024 },
});
