import { PrismaClient, PaymentType } from "@prisma/client";
import paymentMethodData from "./data/paymentMethod";


export default async function seedPaymentMethods(prisma: PrismaClient) {
const data = paymentMethodData;
const userId=1
  for (const method of data) {
    await prisma.paymentMethod.create({
      data: {
        name: method.name,
        initialAmount: method.initialBalance,
        type: method.paymentType as PaymentType,
        notes: method.notes,
        user: { connect: { id: userId } }, // Assuming user with ID 1 exists
      },
    });
  }

  console.log("✅ Seeded Payment Methods");
}
