import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from '../modules/auth/auth.route';
import { CategoryRoutes } from "../modules/category/category.route";
import { TransactionRoutes } from "../modules/transaction/transaction.route";

const router = express.Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/transaction",
    route: TransactionRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
