import { PrismaClient, TransactionType } from '@prisma/client';
import categoryData from './data/categories';

export default async function seedCategories(prisma: PrismaClient) {

  const categories = categoryData;

  for (const category of categories) {
    await prisma.category.create({ data: category });
  }

  console.log('✅ Seeded Categories');
}
