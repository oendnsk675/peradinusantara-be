import prisma from "../configs/db.js";
import jsonwebtoken from "jsonwebtoken";
import { hashedPassword, comparePassword } from "../utils/hashPassword.js";

// register user baru
const registerUser = async (req, res) => {
    // mengambil data dari body
    const { name, email, password, role } = req.body;

    // validasi input 
    if(!name || !email || !password) {
        return res.status(400).json({ message: "Name, email dan password harus diisi" });
    }

    

    try {
        // cek apakah username sudah ada di database
        const userExist = await prisma.user.findUnique({ where: {email: email} });
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
                role: role || "EDITOR" //default role
            },
        });
        return res.status(200).json({ message: "User berhasil didaftarkan", data: user });
    } catch (error) {
        return res.status(500).json({ message: "Terjadi kesalahan saat mendaftarkan user", error: error.message });
    };
};


// login user 
const loginUser = async (req, res) => {
    const { name, email, password } = req.body;

    // validasi input 
    if(!name || !email || !password) {
        return res.status(400).json({ message: "Name, email dan password harus diisi" });
    }

    try {
        // cek apakah user ada di database
        const user = await prisma.user.findUnique({ where: {email: email} });
        if (!user) {
            return res.status(404).json({ message: "Email tidak ditemukan" });
        }

        // cek password apakah sesuai
        const passValid = await comparePassword(password, user.password);
        if (!passValid) {
            return res.status(401).json({ message: "Password salah" });
        }

        // buat token
        const token = jsonwebtoken.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {expiresIn: "1d"});

        // response 
        res.status(200).json( 
            {
                message: "Login berhasil", 
                token: token,
                userId: user.id,
                role: user.role
            } 
        );
    } catch (error) {
        return res.status(500).json({ message: "Login gagal", error: error.message });
    };
};

export { registerUser, loginUser };