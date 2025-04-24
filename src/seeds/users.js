import prisma from "../configs/db.js";
import { hashedPassword } from "../utils/hashPassword.js";

const seedUsers = async () => {
    const passHash = await hashedPassword("123456789", 10);

    await prisma.user.upsert({
        where: { username: "nana" },
        update: {},
        create: { username: "nana", password: passHash, role: "EDITOR" }
    });

    console.log("✅ Berhasil memasukkan data user");
};

export  default seedUsers;