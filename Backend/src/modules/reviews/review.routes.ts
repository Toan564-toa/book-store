import { Router } from "express";
import * as reviewController from "./review.controller";
import { authRequired } from "../../middlewares/auth.middleware";

const router = Router();

router.patch("/:id", authRequired, reviewController.updateReview);
router.delete("/:id", authRequired, reviewController.deleteReview);

export default router;
