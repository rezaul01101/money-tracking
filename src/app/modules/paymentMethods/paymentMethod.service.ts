import { PaymentType, TransactionType, User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaymentMethod } from "./paymentMethod.interface";

//signup user
const insertIntoDB = async (data: IPaymentMethod, user: User): Promise<any> => {
  const { amount, paymentType, name, notes } = data;

  // //category create
  const result = await prisma.paymentMethod.create({
    data: {
      initialAmount: Number(amount),
      type: paymentType as PaymentType,
      notes: notes,
      name: name,
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

const paymentMethodList = async (user: User): Promise<any> => {
  const paymentMethods = await prisma.paymentMethod.findMany({
    where: {
      user_id: user.id,
    },
    include: {
      transactions: {
        select: {
          amount: true,
          type: true, // INCOME or EXPENSE
        },
      },
    },
  });
  
  const result = paymentMethods.map(pm => {
    const balance = pm.transactions.reduce((acc, txn) => {
      const amt = Number(txn.amount);
      return txn.type === 'INCOME' ? acc + amt : acc - amt;
    }, 0);
  
    return {
      ...pm,
      balance,
    };
  });
  
  

  // const result = await prisma.paymentMethod.findMany({
  //   where: {
  //     user_id: user.id,
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });
  return result;
};
const paymentMethodDelete = async (id: number, user: User): Promise<any> => {
  const result = await prisma.paymentMethod.deleteMany({
    where: {
      id,
      user_id: user.id,
    },
  });
  return result;
};
export const PaymentMethodService = {
  insertIntoDB,
  paymentMethodList,
  paymentMethodDelete,
};
