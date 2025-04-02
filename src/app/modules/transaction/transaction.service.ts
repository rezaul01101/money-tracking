import { TransactionType, User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { ICategory} from "./category.interface";
import { IUser } from "../auth/auth.interface";

interface ITransactionData {
  amount: number;
  date: string;
  category_id: number;
  type: 'INCOME' | 'EXPENSE';
  notes: string;
}

//signup user
const insertIntoDB = async (data: ITransactionData, user: User): Promise<any> => {
  const { amount, date, category_id, type, notes } = data;

  // //category create
  const result = await prisma.transaction.create({
    data: {
      amount: amount,
      date: new Date(date),
      category_id: category_id,
      type: type as TransactionType,
      notes: notes,
      user_id: user.id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      }
    },
  });

  return result;
};

const transactionList = async (user: User): Promise<any> => {
  const result = await prisma.transaction.findMany({
    where: {
      user_id: user.id,
    },
    include: {
      category: true,
    },
  });
  return result;
};

const transactionDelete = async (id: number, user: User): Promise<any> => {
  const result = await prisma.transaction.delete({
    where: {
      id: id,
      user_id: user.id,
    },
  });
  return result;
};
export const CategoryService = {
  insertIntoDB,
  transactionList,
  transactionDelete
};
