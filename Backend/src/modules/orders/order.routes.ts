import { Router } from "express";
import * as orderController from "./order.controller";
import { authRequired, adminRequired } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authRequired, orderController.createOrder);
router.get("/my-orders", authRequired, orderController.listMyOrders);
router.get("/my-orders/all", authRequired, orderController.listAllMyOrders);
router.get("/", authRequired, adminRequired, orderController.listOrders);
router.get("/all", authRequired, adminRequired, orderController.listAllOrders);
router.get("/:id", authRequired, orderController.getOrderById);
router.patch("/:id/status", authRequired, adminRequired, orderController.updateOrderStatus);
router.patch("/:id/cancel", authRequired, orderController.cancelOrder);

export default router;
