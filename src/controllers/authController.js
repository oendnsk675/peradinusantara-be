import jsonwebtoken from "jsonwebtoken";
import prisma from "../configs/db.js";
import { comparePassword, hashedPassword } from "../utils/hashPassword.js";

// register user baru
const registerUser = async (req, res) => {
  // mengambil data dari body
  const { name, email, password } = req.body;

  // validasi input
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email dan password harus diisi" });
  }

  try {
    // cek apakah username sudah ada di database
    const userExist = await prisma.user.findUnique({ where: { email: email } });
    if (userExist) {
      return res.status(400).json({ message: "Email sudah terdafter" });
    }

    // hashing password
    const passHashed = await hashedPassword(password);

    // menambahkan user baru ke database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passHashed,
        role: "USER", //default role
      },
    });
    return res
      .status(200)
      .json({ message: "User berhasil didaftarkan", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi kesalahan saat mendaftarkan user",
      error: error.message,
    });
  }
};

// register admin
const registerAdmin = async (req, res) => {
  // mengambil data dari body
  const { name, email, password } = req.body;

  // validasi input
  if (!email || !password) {
    return res.status(400).json({ message: "email dan password harus diisi" });
  }

  try {
    // cek apakah username sudah di dtabase
    const userExist = await prisma.user.findUnique({ where: { email: email } });
    if (userExist) {
      return res.status(400).json({ message: "Email sudah terdafter" });
    }

    // hasing password
    const passHashed = await hashedPassword(password);

    // menambahkan user baru ke database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passHashed,
        role: "ADMIN",
      },
    });
    return res
      .status(200)
      .json({ message: "Admin berhasil didaftarkan", data: user });
  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan saat mendaftarkan Admin",
      error: error.message,
    });
  }
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // validasi input
  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password harus diisi" });
  }

  try {
    // cek apakah user ada di database
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: "Email tidak ditemukan" });
    }

    // cek password apakah sesuai
    const passValid = await comparePassword(password, user.password);
    if (!passValid) {
      return res.status(401).json({ message: "Password salah" });
    }

    // buat token
    const token = jsonwebtoken.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // response
    res.status(200).json({
      message: "Login berhasil",
      token: token,
      userId: user.id,
      role: user.role,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Login gagal", error: error.message });
  }
};

const verifyToken = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Token missing" });

    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(403).json({ message: "Invalid token" });
    }
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) return res.status(403).json({ message: "User not found" });

    res.json({ message: "Token valid", status: true, data: user });
  } catch (error) {
    // memeriksa apakah token telah kadaluarsa
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token telah kadaluarsa." });
    }
  }
};

export { loginUser, registerAdmin, registerUser, verifyToken };
