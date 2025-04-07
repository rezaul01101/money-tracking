import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from '../modules/auth/auth.route';
import { CategoryRoutes } from "../modules/category/category.route";
import { TransactionRoutes } from "../modules/transaction/transaction.route";
import { SettingsRoutes } from "../modules/settings/settings.route";
import { PaymentMethodRoutes } from "../modules/paymentMethods/paymentMethod.route";

const router = express.Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/transaction",
    route: TransactionRoutes,
  },
  {
    path: "/payment-method",
    route: PaymentMethodRoutes,
  },
  {
    path: "/settings",
    route: SettingsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
