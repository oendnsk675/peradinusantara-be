import { PrismaClient } from '@prisma/client';

// inisialisasi prisma client untuk koneksi ke databese
const prisma = new PrismaClient();

// ekspor instance prisma untuk digunakan di seluruh project
export default prisma;