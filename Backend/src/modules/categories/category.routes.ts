import { Router } from "express";
import * as categoryController from "./category.controller";
import { authRequired, adminRequired } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", categoryController.listCategories);
router.get("/all", categoryController.listAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.post("/", authRequired, adminRequired, categoryController.createCategory);
router.patch("/:id", authRequired, adminRequired, categoryController.updateCategory);
router.delete("/:id", authRequired, adminRequired, categoryController.deleteCategory);

export default router;
