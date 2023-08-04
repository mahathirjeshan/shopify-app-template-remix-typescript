import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient; // This must be a `var` and not a `let / const`
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
}

export default prisma;
