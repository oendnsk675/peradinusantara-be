import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const routerAuth = express.Router();

// route untuk register user
routerAuth.post("/register", registerUser);

// route untuk login user
routerAuth.post("/login", loginUser);



export default routerAuth;