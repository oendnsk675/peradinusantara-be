import prisma from "../configs/db.js";

const seedCategories = async () => {
    const categories = [
        "Politik",
        "Olahraga",
        "Teknologi",
        "Kesehatan",
        "Trending",
        "Hiburan",
        "Wisata",
        "Artis"
    ];

    try {
        for (const name of categories) {
            await prisma.category.upsert({
                where: { 
                    name: name 
                },
                update: {},
                create: { 
                    name: name 
                }
            });
        }
        console.log("✅ Berhasil memasukkan data kategori");
    } catch (error) {
        console.log("Gagal memasukkan data kategori", error.message);
    }
};

export default seedCategories;