import type { Request, Response } from "express";
import Book from "../books/book.model";
import Order from "../orders/order.model";
import Review from "./review.model";
import { HTTP_STATUS, ORDER_STATUS, USER_ROLES } from "../../constants";
import { buildPagination, getPagination } from "../../utils/pagination";

export async function listBookReviews(req: Request, res: Response) {
  const { page, limit, skip } = getPagination(req);
  const [reviews, total] = await Promise.all([
    Review.find({ bookId: req.params.bookId })
      .populate("userId", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Review.countDocuments({ bookId: req.params.bookId }),
  ]);

  res.json({
    reviews,
    pagination: buildPagination(page, limit, total),
  });
}

export async function listAllBookReviews(req: Request, res: Response) {
  const reviews = await Review.find({ bookId: req.params.bookId })
    .populate("userId", "name")
    .sort({ createdAt: -1 });
  res.json({ reviews });
}

export async function createReview(req: Request, res: Response) {
  const { rating, comment = "" } = req.body;
  const bookId = String(req.params.bookId);

  if (!rating || Number(rating) < 1 || Number(rating) > 5) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Rating must be from 1 to 5" });
  }

  const book = await Book.findById(bookId);

  if (!book) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Book not found" });
  }

  const boughtBook = await Order.exists({
    userId: req.user!._id,
    status: ORDER_STATUS.COMPLETED,
    "items.bookId": bookId,
  });

  if (!boughtBook) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "You can only review completed purchased books" });
  }

  const existedReview = await Review.findOne({ userId: req.user!._id, bookId });

  if (existedReview) {
    return res.status(HTTP_STATUS.CONFLICT).json({ message: "You already reviewed this book" });
  }

  const review = await Review.create({
    userId: req.user!._id,
    bookId,
    rating: Number(rating),
    comment,
  });

  res.status(HTTP_STATUS.CREATED).json({ review });
}

export async function updateReview(req: Request, res: Response) {
  const { rating, comment } = req.body;
  const review = await Review.findById(req.params.id);

  if (!review) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Review not found" });
  }

  if (review.userId.toString() !== req.user!._id.toString()) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({ message: "You can only update your review" });
  }

  if (rating !== undefined) {
    if (Number(rating) < 1 || Number(rating) > 5) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Rating must be from 1 to 5" });
    }

    review.rating = Number(rating);
  }

  if (comment !== undefined) review.comment = comment;
  await review.save();

  res.json({ review });
}

export async function deleteReview(req: Request, res: Response) {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Review not found" });
  }

  if (review.userId.toString() !== req.user!._id.toString() && req.user!.role !== USER_ROLES.ADMIN) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({ message: "You cannot delete this review" });
  }

  await review.deleteOne();

  res.json({ message: "Review deleted successfully" });
}
