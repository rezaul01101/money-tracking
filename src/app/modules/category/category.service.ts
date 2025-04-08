import { TransactionType, User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { ICategory } from "./category.interface";
import { IUser } from "../auth/auth.interface";

interface ICategoryData {
  name: string;
  type: "INCOME" | "EXPENSE" | "SAVING" | "INVESTMENT";
  user_id: number;
}

const insertIntoDB = async (data: ICategoryData, user: User): Promise<any> => {
  const { name, type } = data;

  // //category create
  const result = await prisma.category.create({
    data: {
      name: name,
      user_id: user.id,
      type: type as TransactionType,
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

const listCategory = async (user: User): Promise<any> => {
  const categories = await prisma.category.findMany({
    where: {
      user_id: user.id,
    },
    include: {
      transactions: {
        select: {
          amount: true,
          type: true,
        },
      },
    },
  });
  const result = categories.map((category) => {
    const balance = category.transactions.reduce((acc, txn) => {
      const amt = Number(txn.amount);
      return txn.type === "INCOME" ? acc + amt : acc - amt;
    }, 0);
    return {
      ...category,
      balance,
    };
  });
  return result;
};
const listCategoryByType = async (user: User, type: string): Promise<any> => {
  const result = await prisma.category.findMany({
    where: {
      user_id: user.id,
      type: type as TransactionType,
    },
  });
  return result;
};
const deleteCategory = async (id: number): Promise<any> => {
  const result = await prisma.category.delete({
    where: {
      id: id,
    },
  });
  return result;
};
export const CategoryService = {
  insertIntoDB,
  listCategory,
  deleteCategory,
  listCategoryByType,
};
