import { PrismaClient } from "@prisma/client";

import seedPaymentMethods from "./paymentMethodSeeder";
// import seedUsers from './seeders/userSeeder';
import seedCategories from './categorySeeder';
import seedTransactions from "./transactionSeeder";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding started...");
  //   await seedUsers(prisma);
  //   await seedCategories(prisma);
  // await seedPaymentMethods(prisma);
  await seedTransactions()
  console.log("✅ Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
