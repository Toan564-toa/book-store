import { Router } from "express";
import * as bookController from "./book.controller";
import * as reviewController from "../reviews/review.controller";
import { authRequired, adminRequired } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", bookController.listBooks);
router.get("/all", bookController.listAllBooks);
router.get("/:bookId/reviews/all", reviewController.listAllBookReviews);
router.get("/:bookId/reviews", reviewController.listBookReviews);
router.get("/:id", bookController.getBookById);
router.post("/", authRequired, adminRequired, bookController.createBook);
router.patch("/:id", authRequired, adminRequired, bookController.updateBook);
router.delete("/:id", authRequired, adminRequired, bookController.deleteBook);
router.patch("/:id/stock", authRequired, adminRequired, bookController.updateBookStock);
router.post("/:bookId/reviews", authRequired, reviewController.createReview);

export default router;
