import { Router } from "express";
import * as adminController from "./admin.controller";
import { authRequired, adminRequired } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authRequired, adminRequired);

router.get("/dashboard", adminController.getDashboard);
router.get("/statistics/revenue", adminController.getRevenueStatistics);
router.get("/statistics/books", adminController.getBookStatistics);

export default router;
