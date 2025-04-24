import seedCategories from "./categories.js";
import seedUsers from "./users.js";
import seedArticle from "./article.js"

// memasukkan data ke database
const main = async () => {
    await seedCategories();
    await seedUsers();
    await seedArticle();

    console.log("✅ Berhasil memasukkan data ke database");
};

main().catch(error => {
    console.error("Gagal", error.message);
    process.exit(1);
});