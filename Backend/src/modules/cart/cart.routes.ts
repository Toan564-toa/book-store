import { Router } from "express";
import * as cartController from "./cart.controller";
import { authRequired } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", authRequired, cartController.getCart);
router.post("/items", authRequired, cartController.addCartItem);
router.patch("/items/:bookId", authRequired, cartController.updateCartItem);
router.delete("/items/:bookId", authRequired, cartController.removeCartItem);
router.delete("/", authRequired, cartController.clearCart);

export default router;
