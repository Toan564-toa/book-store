import { Router } from "express";
import * as authController from "./auth.controller";
import { authRequired } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authRequired, authController.logout);
router.get("/me", authRequired, authController.me);
router.patch("/change-password", authRequired, authController.changePassword);

export default router;
