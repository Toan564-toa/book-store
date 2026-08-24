import type { Request, Response } from "express";
import type { Types } from "mongoose";
import Book from "../books/book.model";
import Wishlist from "./wishlist.model";
import { HTTP_STATUS } from "../../constants";

async function getOrCreateWishlist(userId: Types.ObjectId) {
  let wishlist = await Wishlist.findOne({ userId });

  if (!wishlist) {
    wishlist = await Wishlist.create({ userId, bookIds: [] });
  }

  return wishlist;
}

async function formatWishlist(wishlist: any) {
  await wishlist.populate("bookIds");

  return {
    ...wishlist.toObject(),
    books: wishlist.bookIds,
  };
}

export async function getWishlist(req: Request, res: Response) {
  const wishlist = await getOrCreateWishlist(req.user!._id);
  res.json({ wishlist: await formatWishlist(wishlist) });
}

export async function addWishlistBook(req: Request, res: Response) {
  const bookId = req.params.bookId;
  const book = await Book.findById(bookId);

  if (!book) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Book not found" });
  }

  const wishlist = await getOrCreateWishlist(req.user!._id);

  if (!wishlist.bookIds.some((id: any) => id.toString() === bookId)) {
    wishlist.bookIds.push(bookId as any);
    await wishlist.save();
  }

  res.status(HTTP_STATUS.CREATED).json({ wishlist: await formatWishlist(wishlist) });
}

export async function removeWishlistBook(req: Request, res: Response) {
  const wishlist = await getOrCreateWishlist(req.user!._id);
  const beforeLength = wishlist.bookIds.length;

  wishlist.bookIds = wishlist.bookIds.filter((bookId: any) => bookId.toString() !== req.params.bookId);

  if (wishlist.bookIds.length === beforeLength) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Wishlist book not found" });
  }

  await wishlist.save();

  res.json({ wishlist: await formatWishlist(wishlist) });
}
