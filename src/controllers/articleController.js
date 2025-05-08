import slugify from "slugify";
import prisma from "../configs/db.js";

// Fungsi untuk mengambil semua berita
const getAllNews = async (req, res) => {
  try {
    const where = {};
    if (req.query.title) {
      where.title = { contains: req.query.title };
    }
    if (req.query.category_id) {
      where.category_id = +req.query.category_id;
    }
    if (req.query.author_id) {
      where.author_id = +req.query.author_id;
    }

    const news = await prisma.news.findMany({
      include: { category: true, author: true },
      orderBy: { created_at: "desc" }, // urutkan artikel berdasarkan tanggal dibuat
      where,
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

// Fungsi untuk mengambil semua berita
const getDetailNews = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      res.status(400).json({ message: "Data slug tidak ada!" });
      return;
    }
    const news = await prisma.news.findFirstOrThrow({
      where: { slug },
      include: { category: true, author: true },
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

const getDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Data tidak ada!" });
      return;
    }
    const news = await prisma.news.findFirstOrThrow({
      where: { id: +id },
      include: { category: true, author: true },
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
    const { title, content, status, category, summary } = req.body;
    // ambil id user yang sedang login
    const authorId = req.user.id;

    // validasi input
    if (!title || !content) {
      return res.status(400).json({ message: "Beberapa field harus diisi!" });
    }

    let image = "";
    if (req.file != undefined) {
      image = `/uploads/thumbnail/${req.file.filename}`;
    }

    // ubah title menjadi slug
    const slug = slugify(title, { lower: true, strict: true });

    const newNews = await prisma.news.create({
      data: {
        title,
        slug,
        content,
        image,
        summary,
        status: status || "PUBLISH", // || DRAFT | PUBLISH
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
    const { title, content, category, status, summary } = req.body;

    // ubah title menjadi slug
    const slug = slugify(title, { lower: true, strict: true });
    let data = {
      title,
      slug: slug,
      content,
      summary,
      status: status || "PUBLISH", // || DRAFT | PUBLISH
      category: { connect: { id: +category } },
    };
    if (req.file != undefined) {
      const image = `/uploads/thumbnail/${req.file.filename}`;
      Object.assign(data, image);
    }

    const news = await prisma.news.update({
      where: { id: +id },
      data,
    });
    res.status(200).json({ message: "Berita berhasil diperbarui", data: news });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat memperbarui berita!" });
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

const uploadImage = (req, res) => {
  let filename = req.file.filename;
  if (!filename) {
    res.status(500).json({ message: "Failed to upload image" });
    return;
  }
  let url = `${process.env.APP_URL}/uploads/news/${filename}`;
  return res.status(200).json({
    message: "Successfully upload image",
    data: url,
  });
};

export {
  addNewNews,
  deleteNews,
  getAllNews,
  getDetailById,
  getDetailNews,
  getNewsByTitle,
  updateNews,
  uploadImage,
};
