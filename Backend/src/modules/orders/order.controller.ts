import type { Request, Response } from "express";
import Cart from "../cart/cart.model";
import Book from "../books/book.model";
import Order from "./order.model";
import { HTTP_STATUS, ORDER_STATUS, USER_ROLES } from "../../constants";
import { buildPagination, getPagination } from "../../utils/pagination";

export async function createOrder(req: Request, res: Response) {
  const { shippingAddress, phone, note = "" } = req.body;

  if (!shippingAddress || !phone) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Shipping address and phone are required" });
  }

  const cart: any = await Cart.findOne({ userId: req.user!._id }).populate("items.bookId");

  if (!cart || cart.items.length === 0) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Cart is empty" });
  }

  for (const item of cart.items) {
    const book = item.bookId;

    if (!book || book.stock < item.quantity) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: `Book ${book?._id || "unknown"} is out of stock` });
    }
  }

  const items = cart.items.map((item: any) => {
    const book = item.bookId;
    const price = Number(book.discountPrice || book.price);

    return {
      bookId: book._id,
      title: book.title,
      imageUrl: book.imageUrl,
      price,
      quantity: item.quantity,
      subtotal: price * item.quantity,
    };
  });

  const order = await Order.create({
    userId: req.user!._id,
    items,
    total: items.reduce((sum: number, item: any) => sum + item.subtotal, 0),
    shippingAddress,
    phone,
    note,
    status: ORDER_STATUS.PENDING,
  });

  for (const item of cart.items) {
    const book = item.bookId;
    book.stock -= item.quantity;
    book.sold = Number(book.sold || 0) + item.quantity;
    await book.save();
  }

  cart.items = [];
  await cart.save();

  res.status(HTTP_STATUS.CREATED).json({ order });
}

export async function listMyOrders(req: Request, res: Response) {
  const query = { userId: req.user!._id };
  const { page, limit, skip } = getPagination(req);
  const [orders, total] = await Promise.all([
    Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments(query),
  ]);

  res.json({
    orders,
    pagination: buildPagination(page, limit, total),
  });
}

export async function listAllMyOrders(req: Request, res: Response) {
  const orders = await Order.find({ userId: req.user!._id }).sort({ createdAt: -1 });
  res.json({ orders });
}

export async function listOrders(req: Request, res: Response) {
  const { page, limit, skip } = getPagination(req);
  const [orders, total] = await Promise.all([
    Order.find().populate("userId", "name email").sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments(),
  ]);

  res.json({
    orders,
    pagination: buildPagination(page, limit, total),
  });
}

export async function listAllOrders(req: Request, res: Response) {
  const orders = await Order.find().populate("userId", "name email").sort({ createdAt: -1 });
  res.json({ orders });
}

export async function getOrderById(req: Request, res: Response) {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Order not found" });
  }

  if (req.user!.role !== USER_ROLES.ADMIN && order.userId.toString() !== req.user!._id.toString()) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({ message: "You cannot view this order" });
  }

  res.json({ order });
}

export async function updateOrderStatus(req: Request, res: Response) {
  const { status } = req.body;
  const allowedStatuses = Object.values(ORDER_STATUS);

  if (!allowedStatuses.includes(status)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid order status" });
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Order not found" });
  }

  order.status = status;
  await order.save();

  res.json({ order });
}

export async function cancelOrder(req: Request, res: Response) {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Order not found" });
  }

  if (order.userId.toString() !== req.user!._id.toString() && req.user!.role !== USER_ROLES.ADMIN) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({ message: "You cannot cancel this order" });
  }

  const cancellableStatuses: string[] = [ORDER_STATUS.PENDING, ORDER_STATUS.CONFIRMED];

  if (!cancellableStatuses.includes(order.status)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "This order cannot be cancelled" });
  }

  for (const item of order.items) {
    const book = await Book.findById(item.bookId);
    if (book) {
      book.stock += item.quantity;
      book.sold = Math.max(Number(book.sold || 0) - item.quantity, 0);
      await book.save();
    }
  }

  order.status = ORDER_STATUS.CANCELLED;
  await order.save();

  res.json({ order });
}
