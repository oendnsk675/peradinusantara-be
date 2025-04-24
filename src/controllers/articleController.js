import prisma from "../configs/db.js";


// Fungsi untuk mengambil semua artikel
const getAllArticles = async (req, res) => {
    try {
        const articles = await prisma.article.findMany({
            include: { category: true, author: true },
            orderBy: { createdAt: "desc" },// urutkan artikel berdasarkan tanggal dibuat
        });
        res.status(200).json({ message: "Berikut daftar artikel yang ada:", data: articles });
    } catch (error) {
        res.status(500),json({ error: "Terjadi kesalahan saat mengambil artikel!" });
    }
};


// tambah artikel baru
const addNewArticle = async (req, res) => {
    try {
        const { title, content, imageUrl, categoryId} = req.body;
        // console.log("nilai kategori:", req.user);
        const authorId = req.user.id; // ambil id user yang sedang login

        // validasi input
        if (!title || !content || !categoryId) {
            return res.status(400).json({ message: "Beberapa field harus diisi!" });
        }

        const newArticle = await prisma.article.create({
           data: {
                title,
                content,
                imageUrl,
                categoryId,
                authorId
            },
            include: { category: true, author: true }
        });
        res.status(201).json({ message: "Berhasil menambah artikel baru", data: newArticle });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat menambah artikel!", error: error.message });
    }
};


// mencari artike berdasarkan judul
const getArticleByTitle = async (req, res) => {
    try {
        const { title } = req.query; //ambil judul request query
    
        // validasi input judul
        if (!title) {
            return res.status(400).json({ message: "Masukan judul artikel yang akan anda cari:" });
        } 
        const articles = await prisma.article.findMany({
            where: {
                title: {
                    contains: title,      // mencari judul artikel yang mengandung kata yang diinput
                    mode: "insensitive",   // pencarian tidak case sensitive
                },
            },
            include: { category: true, author: true } // ambil data kategori dan penulis
        });

        // jika artikel tidak ditemukan
        if (articles.length === 0) {
            return res.status(404).json({ message: "Artikel yang anda cari tidak ada!" });
        }

        // jika artikel ada
        res.status(200).json({ message: "Berikut artikel yang anda cari:", data: articles });
    } catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan saat mencari artikel!" });
    }
};


// update artikel
const updateArticle = async (req, res) => {
    try {
        const { id } = req.params; //ambil id artikel dari request parameter
    
        // ambil data artikel yang akan diupdate
        const { title, content, imageUrl, categoryId } = req.body;
        const updateArticle = await prisma.article.update({ 
            where: { id: parseInt(id) },
            data: {
                title,
                content,
                imageUrl,    
                categoryId,
            },
         });
         res.status(200).json({ message: "Artikel berhasil diperbarui", data: updateArticle });
    } catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan saat memperbarui artikel!" });
    }
};


// hapus artikel
const deleteArticle = async (req, res) => {
    try{
        const { id } = req.params; //ambil id artikel dari request parameter
        await prisma.article.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ message: "Artikel berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan saat menghapus artikel!" });
    }
};

export { getAllArticles, addNewArticle, getArticleByTitle, updateArticle, deleteArticle };