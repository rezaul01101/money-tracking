import { TransactionType, User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { ICategory} from "./category.interface";
import { IUser } from "../auth/auth.interface";

interface ICategoryData {
  name: string;
  type: 'INCOME' | 'EXPENSE' | 'SAVING' | 'INVESTMENT';
  user_id: number;
}

//signup user
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
          image: true
        }
      }
    },
  });

  return result;
};

const listCategory = async (user: User): Promise<any> => {
  const result = await prisma.category.findMany({
    where: {
      user_id: user.id,
    },
  });
  return result;
};
const listCategoryByType = async (user: User,type:string): Promise<any> => {
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
  listCategoryByType
};
