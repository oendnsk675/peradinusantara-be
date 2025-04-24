import prisma from "../configs/db.js";

// mengecek apakah field email di tabel user ada
async function main() {
  const users = await prisma.user.findMany({
    select: { email: true }
  });
  console.log(users);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
