import prisma from "../configs/db.js";


// cek apakah berita milik user tersebut
const verifyIsNewsOwner = async (req, res, next) => {
    try {
        
        // ambil id artikel dari request parameter
        const { id } = req.params;
        const userId = parseInt(req.user.id); // konversi ke integer
        const userRole = req.user.role
    
        const news = await prisma.news.findUnique({
          where: { id: parseInt(id) }
        });
    
        if (!news) {
          return res.status(404).json({ message: "Berita tidak ditemukan!" });
        }
        
        // jika USER, hanya boleh akses berita miliknya sedniri
        if (userRole === "USER" && news.author_id !== userId) {
          return res.status(403).json({ message: "Anda tidak memiliki akses untuk mengakses berita ini!" });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat memeriksa hak akses!", error: error.message });
    }
};

export default verifyIsNewsOwner;