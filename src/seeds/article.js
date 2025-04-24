import prisma from "../configs/db.js";

// seed artikel
const seedArticles = async () => {
    // ambil user pertama yang role-nya editor
    const editor = await prisma.user.findFirst({ 
        where: { role: "EDITOR" } 
    });

    // ambil semua kategori
    const categories = await prisma.category.findMany();

    if (!editor || categories.length === 0) {
        console.log("Tidak bisa membuat artikel karena membutuhkan user dan kategori.");
    }

    const articles = [
        {
            title: "Salah satu member Twice yang berasal dari Jepang",
            content: "Myoui Mina salah seorang member dari Girl geroup korea bernama Twice.",
            imageUrl: "https://id.pinterest.com/pin/70228075432253362/",
            categoryId: categories[7].id,
            authorId: editor.id
        },
        {
            title: "Tempat wisata paling menyenangkan di Jogja",
            content: "Jogja adalah salah satu tempat wisata paling menyenangkan di Indonesia, apalagi kalau bersama dia(W)",
            imageUrl: "https://id.pinterest.com/pin/4011087178108768/",
            categoryId: categories[6].id,
            authorId: editor.id
        }
    ];

    for (const article of articles) {
        await prisma.article.upsert({
            where: { title: article.title },
            update: {},
            create: articles
        });
    }

    console.log("✅ Artikel data dummy berhasil dimasukkan!");
}

export default seedArticles;