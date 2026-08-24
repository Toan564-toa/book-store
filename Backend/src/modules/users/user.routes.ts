import { Router } from "express";
import * as userController from "./user.controller";
import { authRequired, adminRequired } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/me", authRequired, userController.getMyProfile);
router.patch("/me", authRequired, userController.updateMyProfile);
router.get("/", authRequired, adminRequired, userController.listUsers);
router.get("/all", authRequired, adminRequired, userController.listAllUsers);
router.get("/:id", authRequired, adminRequired, userController.getUserById);
router.patch("/:id/status", authRequired, adminRequired, userController.updateUserStatus);

export default router;
