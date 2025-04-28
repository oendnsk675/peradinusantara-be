import prisma from "../configs/db.js";

// fungsi untuk mengambil semua kategori
const getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.status(200).json({ message: "Berikut daftar category yang ada:", data: categories });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat memuat category!", error: error.message });
    }
};


// menambahkan kategori baru
const addCategory = async (req, res) => {
    try {
        const { name, slug } = req.body;

        // validasi input
        if (!name || !slug) {
            return res.status(400).json({ message: "Name dan slug harus diisi" });
        }

        const newCategory = await prisma.category.create ({
            data: { name, slug },
        });

        res.status(201).json({ message: "Category berhasil ditambahkan", data: newCategory });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat menambahkan category!", error: error.message });
    }
};


// mengupdate kategori
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug } = req.body;

        const updateCategory = await prisma.category.update({ 
            where: { id: parseInt(id) },
            data: {
                name,
                slug,
            },
         });
         res.status(200).json({ message: "Berhasil update category", data: updateCategory });
    } catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan saat memperbarui category!" });
    }
};


// menghapus kategori
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.category.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ message: "Category berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat menghapus category!", error: error.message });
    }
};

export {  getAllCategories, addCategory, updateCategory, deleteCategory };