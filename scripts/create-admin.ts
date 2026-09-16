const { PrismaClient, Role } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const db = new PrismaClient();
const args = process.argv.slice(2);
const email = args[args.indexOf("--email") + 1];
const password = args[args.indexOf("--password") + 1];

if (!email || !password) {
  throw new Error("Usage: npm run create-admin -- --email admin@example.com --password 'strong-password'");
}

(async () => {
  const hash = await bcrypt.hash(password, 12);

  await db.user.upsert({
    where: { email },
    update: { role: Role.SUPER_ADMIN, passwordHash: hash },
    create: {
      name: "Admin",
      email,
      phone: "0000000000",
      passwordHash: hash,
      role: Role.SUPER_ADMIN,
    },
  });

  console.log("Admin created.");
  await db.$disconnect();
})();
