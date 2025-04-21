import { PrismaClient, TransactionType } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export default async function seedTransactions() {
  const userId = 2; // Make sure this user exists
  const TOTAL = 500;
  const BATCH_SIZE = 100;

  // Get existing category & payment method IDs
  const categories = await prisma.category.findMany({ select: { id: true } });
  const paymentMethods = await prisma.paymentMethod.findMany({
    select: { id: true },
  });

  if (categories.length === 0 || paymentMethods.length === 0) {
    console.error(
      "❌ No categories or payment methods found. Seed them first."
    );
    return;
  }

  const categoryIds = categories.map((c) => c.id);
  const paymentMethodIds = paymentMethods.map((p) => p.id);

  console.time("💾 Transactions seeded");

  for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
    const batch = Array.from({ length: BATCH_SIZE }).map(() => ({
      user_id: userId,
      category_id: faker.helpers.arrayElement(categoryIds),
      payment_method_id: faker.helpers.arrayElement(paymentMethodIds),
      amount: new Decimal(
        faker.number.float({ min: 5, max: 5000, fractionDigits: 2 })
      ),
      type: faker.helpers.arrayElement([
        TransactionType.EXPENSE,
        TransactionType.INCOME,
      ]),
      date: faker.date.between({
        from: "2024-01-01T00:00:00.000Z",
        to: "2025-01-01T00:00:00.000Z",
      }),
      notes: faker.lorem.sentence(),
    }));

    await prisma.transaction.createMany({
      data: batch,
      skipDuplicates: true,
    });

    console.log(`✅ Inserted ${i + BATCH_SIZE} of ${TOTAL}`);
  }

  console.timeEnd("💾 Transactions seeded");
}
