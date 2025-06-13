import { Category, TransactionType } from "@prisma/client";

export interface ICategory extends Omit<Category, 'name'> {
  name: string;
  type: TransactionType;
  user_id: number;
}
