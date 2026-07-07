import { PrismaClient } from "../generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const connectionString = process.env.DATABASE_URL!;

if (!connectionString) {
  throw new Error("Database_URL belum diatur di env");
}

let prismaInstance: PrismaClient;

if (connectionString.includes("neon.tech")) {
  const adapter = new PrismaNeon({ connectionString });
  prismaInstance = new PrismaClient({ adapter });
} else {
  prismaInstance = new PrismaClient({
    adapter: new PrismaPg({ connectionString })
  });
}

export const prisma = globalForPrisma.prisma ?? prismaInstance;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
