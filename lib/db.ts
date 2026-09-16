declare const process: {
  env?: {
    NODE_ENV?: string;
  };
};

declare const require: (id: string) => any;

type PrismaClientType = {
  [key: string]: any;
};

const PrismaClientConstructor: new () => PrismaClientType = (() => {
  try {
    const prismaModule = require("@prisma/client");
    return prismaModule.PrismaClient;
  } catch {
    return class PrismaClient {
      constructor() {}
    };
  }
})();

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClientType;
};

export const db = globalForPrisma.prisma ?? new PrismaClientConstructor();

if ((process?.env?.NODE_ENV ?? "development") !== "production") {
  globalForPrisma.prisma = db;
}