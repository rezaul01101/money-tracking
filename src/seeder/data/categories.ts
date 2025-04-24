import { TransactionType } from "@prisma/client";
const userId = 1; 
const categoryData = [
  { name: "Groceries", type: TransactionType.EXPENSE, user_id: userId },
  { name: "Salary", type: TransactionType.INCOME, user_id: userId },
  { name: "Transport", type: TransactionType.EXPENSE, user_id: userId },
  { name: "Freelance", type: TransactionType.INCOME, user_id: userId },
  { name: "Dining Out", type: TransactionType.EXPENSE, user_id: userId },
  { name: "Rent", type: TransactionType.EXPENSE, user_id: userId },
  { name: "Savings", type: TransactionType.INCOME, user_id: userId },
  { name: "Investments", type: TransactionType.INCOME, user_id: userId },
  { name: "Utilities", type: TransactionType.EXPENSE, user_id: userId },
  { name: "Entertainment", type: TransactionType.EXPENSE, user_id: userId },
  { name: "Medical", type: TransactionType.EXPENSE, user_id: userId },
  { name: "Pet Care", type: TransactionType.EXPENSE, user_id: userId },
  { name: "Gifts", type: TransactionType.EXPENSE, user_id: userId },
  { name: "Education", type: TransactionType.EXPENSE, user_id: userId },
  { name: "Business Income", type: TransactionType.INCOME, user_id: userId },
  { name: "Side Hustle", type: TransactionType.INCOME, user_id: userId },
  { name: "Insurance", type: TransactionType.EXPENSE, user_id: userId },
  { name: "Home Maintenance", type: TransactionType.EXPENSE, user_id: userId },
  { name: "Travel", type: TransactionType.EXPENSE, user_id: userId },
  { name: "Donations", type: TransactionType.EXPENSE, user_id: userId },
];

export default categoryData;
