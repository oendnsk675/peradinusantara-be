import prisma from "../configs/db.js";

// Fungsi untuk mengambil semua berita
const getAllNews = async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      include: { category: true, author: true },
      orderBy: { created_at: "desc" }, // urutkan artikel berdasarkan tanggal dibuat
    });
    res
      .status(200)
      .json({ message: "Berikut daftar berita yang ada:", data: news });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat memuat berita!",
      error: error.message,
    });
  }
};

// tambah berita baru
const addNewNews = async (req, res) => {
  try {
    // console.log(req.user);
    const { title, slug, content, status, category } = req.body;
    // ambil id user yang sedang login
    const authorId = req.user.id;

    // validasi input
    if (!title || !content) {
      return res.status(400).json({ message: "Beberapa field harus diisi!" });
    }

    const newNews = await prisma.news.create({
      data: {
        title,
        slug: "test",
        content,
        status: "PUBLISH",
        author: { connect: { id: +authorId } },
        category: { connect: { id: +category } },
        published_at: new Date(),
      },
      // include: { category: true, author: true }
    });
    res
      .status(201)
      .json({ message: "Berhasil menambah berita baru", data: newNews });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Terjadi kesalahan saat menambah berita!",
      error: error.message,
    });
  }
};

// mencari berita berdasarkan judul
const getNewsByTitle = async (req, res) => {
  try {
    const { title } = req.query; //ambil judul request query

    // validasi input judul
    if (!title) {
      return res
        .status(400)
        .json({ message: "Masukan judul berita yang akan anda cari" });
    }
    const news = await prisma.news.findMany({
      where: {
        title: {
          contains: title, // mencari judul artikel yang mengandung kata yang diinput
          mode: "insensitive", // pencarian tidak case sensitive
        },
      },
      include: { category: true, author: true }, // ambil data kategori dan penulis
    });

    // jika artikel tidak ditemukan
    if (news.length === 0) {
      return res
        .status(404)
        .json({ message: "Berita yang anda cari tidak ada!" });
    }

    // jika artikel ada
    res
      .status(200)
      .json({ message: "Berikut berita yang anda cari:", data: news });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat mencari berita!" });
  }
};

// update berita
const updateNews = async (req, res) => {
  try {
    const { id } = req.params; //ambil id artikel dari request parameter

    // ambil data artikel yang akan diupdate
    const { title, slug, content, status, category_id } = req.body;
    const news = await prisma.news.update({
      where: { id: parseInt(id) },
      data: {
        title,
        content,
        slug,
        status,
        category_id: parseInt(category_id),
      },
    });
    res.status(200).json({ message: "Berita berhasil diperbarui", data: news });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat memperbarui berita!" });
  }
};

// hapus berita
const deleteNews = async (req, res) => {
  try {
    const { id } = req.params; //ambil id artikel dari request parameter
    await prisma.news.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Berita berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat menghapus berita!" });
  }
};

export { addNewNews, deleteNews, getAllNews, getNewsByTitle, updateNews };
