import express from "express";
import {
  loginUser,
  registerUser,
  verifyToken,
} from "../controllers/authController.js";

const routerAuth = express.Router();

// route untuk register user
routerAuth.post("/register", registerUser);

// route untuk login user
routerAuth.post("/login", loginUser);
routerAuth.get("/verify-token", verifyToken);

export default routerAuth;
