import { TransactionType, User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { startOfMonth, endOfMonth, subMonths } from 'date-fns';


const dashboardData = async (user: User): Promise<any> => {
  const now = new Date();
  const currentMonthStart = startOfMonth(now);
  const currentMonthEnd = endOfMonth(now);

  const lastMonthDate = subMonths(now, 1);
  const lastMonthStart = startOfMonth(lastMonthDate);
  const lastMonthEnd = endOfMonth(lastMonthDate);

  // Query current month income
  const currentMonthIncome = await prisma.transaction.aggregate({
    where: {
      user_id: user.id,
      type: TransactionType.INCOME,
      date: {
        gte: currentMonthStart,
        lte: currentMonthEnd,
      },
    },
    _sum: {
      amount: true,
    },
  });

  // Query last month expense
  const lastMonthIncome = await prisma.transaction.aggregate({
    where: {
      user_id: user.id,
      type: TransactionType.INCOME,
      date: {
        gte: lastMonthStart,
        lte: lastMonthEnd,
      },
    },
    _sum: {
      amount: true,
    },
  });

    // Query current month income
  const currentMonthExpense = await prisma.transaction.aggregate({
    where: {
      user_id: user.id,
      type: TransactionType.EXPENSE,
      date: {
        gte: currentMonthStart,
        lte: currentMonthEnd,
      },
    },
    _sum: {
      amount: true,
    },
  });

  // Query last month income
  const lastMonthExpense = await prisma.transaction.aggregate({
    where: {
      user_id: user.id,
      type: TransactionType.EXPENSE,
      date: {
        gte: lastMonthStart,
        lte: lastMonthEnd,
      },
    },
    _sum: {
      amount: true,
    },
  });

  const result = {
    income:{
      currentMonth: currentMonthIncome._sum.amount || 0,
      lastMonth: lastMonthIncome._sum.amount || 0,
    },
    expense: {
      currentMonth: currentMonthExpense._sum.amount || 0,
      lastMonth: lastMonthExpense._sum.amount || 0,
    },
  }
  return result;
};

export const DashboardService = {
  dashboardData,
};
