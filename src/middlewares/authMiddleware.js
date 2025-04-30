import jsonwebtoken from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // memeriksa apakah header authorization ada
    if (!authHeader) {
        return res.status(401).json({ message: "Token tidak ditemukan." });
    }

    // memisahkan token dari header
    const token = authHeader.split(" ")[1];

    // verifikasi token
    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        // menambahkan user yang terverifikasi ke request
        req.user = decoded;
        // melanjutkan ke middleware selanjutnya
        next();
    } catch (error) {
        // memeriksa apakah token tidak valid
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Token tidak valid." });
        }
        // memeriksa apakah token telah kadaluarsa
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token telah kadaluarsa." });
        }
        res.status(500).json({ message: "Terjadi kesalahan saat verifikasi token.", error: error.message });
    };
};

export default verifyToken;