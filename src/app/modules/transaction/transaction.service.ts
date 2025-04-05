import { TransactionType, User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { ICategory} from "./transaction.interface";
import { IUser } from "../auth/auth.interface";

interface ITransactionData {
  amount: number;
  date: string;
  categoryId: string;
  notes: string;
  type: TransactionType;
}

//signup user
const insertIntoDB = async (data: ITransactionData, user: User): Promise<any> => {
  const { amount, date, categoryId, notes ,type } = data;

  // //category create
  const result = await prisma.transaction.create({
    data: {
      amount: Number(amount),
      date: new Date(date),
      category_id: Number(categoryId),
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
const transactionListByType = async (user: User,type:TransactionType): Promise<any> => {
  const result = await prisma.transaction.findMany({
    where: {
      user_id: user.id,
      type: type,
    },
    orderBy: {
      date: "desc",
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
export const TransactionService = {
  insertIntoDB,
  transactionList,
  transactionDelete,
  transactionListByType
};
