import express from "express";
import { CategoryController } from "./category.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryValidation } from "./category.validation";
import auth from "../../middlewares/auth";


const router = express.Router();
router.post(
  "/create",
  auth("user"), 
  validateRequest(CategoryValidation.createZodSchema),
  CategoryController.createCategory
);
router.get(
  "/list",
  auth("user"),
  CategoryController.categoryList
);
router.delete(
  "/:id",
  auth("user"),
  CategoryController.deleteCategory
);

export const CategoryRoutes = router;
