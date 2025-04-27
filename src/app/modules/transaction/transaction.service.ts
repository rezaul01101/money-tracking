import { TransactionType, User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";

interface ITransactionData {
  id: number;
  amount: number;
  date: string;
  categoryId: string;
  notes: string;
  type: TransactionType;
  paymentMethodId: string | number;
}

//signup user
const insertIntoDB = async (
  data: ITransactionData,
  user: User
): Promise<any> => {
  const { amount, date, categoryId, notes, type, paymentMethodId } = data;

  // //category create
  const result = await prisma.transaction.create({
    data: {
      amount: Number(amount),
      date: new Date(date),
      category_id: Number(categoryId),
      type: type as TransactionType,
      notes: notes,
      payment_method_id: Number(paymentMethodId),
      user_id: user.id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  return result;
};

const transactionList = async (user: User): Promise<any> => {
  const result = await prisma.transaction.findMany({
    where: {
      user_id: user.id,
    },
    orderBy: {
      id: "desc",
    },
    include: {
      category: true,
      paymentMethod: true,
    },
  });
  return result;
};
const transactionListByType = async (
  user: User,
  type: TransactionType | "FULL",
  paginationOptions: IPaginationOptions

): Promise<any> => {

  const { page, limit, skip, sortBy, sortOrder } =
  paginationHelpers.calculatePagination(paginationOptions);

  const [result, total] = await prisma.$transaction([
    prisma.transaction.findMany({
      where: {
        user_id: user.id,
        ...(type !== "FULL" && { type }),
      },
      orderBy: {
        id: "desc",
      },
      include: {
        category: true,
        paymentMethod: true,
      },
      skip: skip,
      take: limit,
    }),
    prisma.transaction.count({
      where: {
        user_id: user.id,
        ...(type !== "FULL" && { type }),
      }
    })
  ]);
  return {
    meta: {
      page,
      limit,
      total
    },
    data: result,
  }
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
const updateTransaction = async (data: ITransactionData, user: User): Promise<any> => {
  const result = await prisma.transaction.update({
    where: {
      id: data?.id,
      user_id: user?.id,
    },
    data: {
      amount: Number(data.amount),
      date: new Date(data.date),
      category_id: Number(data.categoryId),
      notes: data.notes,
      type: data.type as TransactionType,
      payment_method_id: Number(data.paymentMethodId),
    },
  });
  return result;
};
const fullYearIncomeExpense = async (user: User,year:string): Promise<any> => {
  const transactions = await prisma.transaction.findMany({
    where: {
      user_id: user.id,
      date: {
        gte: new Date(Number(year), 0, 1),
        lte: new Date(Number(year), 11, 31),
      },
    },
    orderBy: {
      date: "asc",
    },
    select: {
      amount: true,
      date: true,
      type: true,
    },
  });

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const result = months.map((month, index) => {
    const filteredTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getMonth() === index;
    });

    const income = filteredTransactions
      .filter(transaction => transaction.type === "INCOME")
      .reduce((sum, transaction) => sum + transaction.amount.toNumber(), 0);

    const expense = filteredTransactions
      .filter(transaction => transaction.type === "EXPENSE")
      .reduce((sum, transaction) => sum + transaction.amount.toNumber(), 0);

    return {
      name: month,
      income: Number(income),
      expense: Number(expense),
    };
  });
  return result;
};
export const TransactionService = {
  insertIntoDB,
  transactionList,
  transactionDelete,
  updateTransaction,
  transactionListByType,
  fullYearIncomeExpense
};
