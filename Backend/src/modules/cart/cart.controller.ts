import type { Request, Response } from "express";
import type { Types } from "mongoose";
import Cart from "./cart.model";
import Book from "../books/book.model";
import { BOOK_STATUS, HTTP_STATUS } from "../../constants";

async function getOrCreateCart(userId: Types.ObjectId) {
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  return cart;
}

async function formatCart(cart: any) {
  await cart.populate("items.bookId");

  const items = cart.items.map((item: any) => {
    const book = item.bookId;
    const price = Number(book?.discountPrice || book?.price || 0);

    return {
      bookId: book?._id,
      quantity: item.quantity,
      book,
      subtotal: price * item.quantity,
    };
  });

  return {
    ...cart.toObject(),
    items,
    total: items.reduce((sum: number, item: any) => sum + item.subtotal, 0),
  };
}

export async function getCart(req: Request, res: Response) {
  const cart = await getOrCreateCart(req.user!._id);
  res.json({ cart: await formatCart(cart) });
}

export async function addCartItem(req: Request, res: Response) {
  const { bookId, quantity = 1 } = req.body;

  if (!bookId || Number(quantity) <= 0) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "BookId and valid quantity are required" });
  }

  const book = await Book.findById(bookId);

  if (!book || book.status !== BOOK_STATUS.ACTIVE) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Book not found" });
  }

  if (book.stock < Number(quantity)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Book stock is not enough" });
  }

  const cart = await getOrCreateCart(req.user!._id);
  const item = cart.items.find((cartItem: any) => cartItem.bookId.toString() === bookId);

  if (item) {
    const nextQuantity = item.quantity + Number(quantity);

    if (book.stock < nextQuantity) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Book stock is not enough" });
    }

    item.quantity = nextQuantity;
  } else {
    cart.items.push({
      bookId,
      quantity: Number(quantity),
    });
  }

  await cart.save();

  res.status(HTTP_STATUS.CREATED).json({ cart: await formatCart(cart) });
}

export async function updateCartItem(req: Request, res: Response) {
  const { quantity } = req.body;

  if (quantity === undefined || Number(quantity) <= 0) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Quantity must be greater than 0" });
  }

  const cart = await getOrCreateCart(req.user!._id);
  const bookId = req.params.bookId;
  const item = cart.items.find((cartItem: any) => cartItem.bookId.toString() === bookId);
  const book = await Book.findById(bookId);

  if (!item) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Cart item not found" });
  }

  if (!book || book.stock < Number(quantity)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Book stock is not enough" });
  }

  item.quantity = Number(quantity);
  await cart.save();

  res.json({ cart: await formatCart(cart) });
}

export async function removeCartItem(req: Request, res: Response) {
  const cart = await getOrCreateCart(req.user!._id);
  const beforeLength = cart.items.length;

  (cart as any).items = cart.items.filter((item: any) => item.bookId.toString() !== req.params.bookId);

  if (cart.items.length === beforeLength) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Cart item not found" });
  }

  await cart.save();

  res.json({ cart: await formatCart(cart) });
}

export async function clearCart(req: Request, res: Response) {
  const cart = await getOrCreateCart(req.user!._id);

  (cart as any).items = [];
  await cart.save();

  res.json({ cart: await formatCart(cart) });
}
