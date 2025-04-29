import prisma from "../configs/db.js";


// cek apakah berita milik user tersebut
const verifyIsNewsOwner = async (req, res, next) => {
    try {
        // ambil id artikel dari request parameter
        const { id } = req.params;
        // ambil id user yang sedang login
        const userId = req.user.id;
        // ambil artikel dari database
        const news = await prisma.news.findUnique({ where: { id: parseInt(id) } }); 
        // cek apakah artikel tersebut milik user yang sedang login
        if (news.author_id !== userId) {
            return res.status(403).json({ message: "Anda tidak memiliki akses untuk mengakses berita ini!" });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat memeriksa hak akses!", error: error.message });
    }
};

export default verifyIsNewsOwner;