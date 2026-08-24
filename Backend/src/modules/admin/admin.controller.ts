import type { Request, Response } from "express";
import User from "../users/user.model";
import Book from "../books/book.model";
import Order from "../orders/order.model";
import { ORDER_STATUS } from "../../constants";

export async function getDashboard(req: Request, res: Response) {
  const [totalUsers, totalBooks, totalOrders, completedOrders, lowStockBooks, latestOrders] =
    await Promise.all([
      User.countDocuments(),
      Book.countDocuments(),
      Order.countDocuments(),
      Order.find({ status: ORDER_STATUS.COMPLETED }),
      Book.find({ stock: { $lte: 5 } }).sort({ stock: 1 }),
      Order.find().sort({ createdAt: -1 }).limit(5),
    ]);

  res.json({
    totalUsers,
    totalBooks,
    totalOrders,
    revenue: completedOrders.reduce((sum, order) => sum + Number(order.total || 0), 0),
    lowStockBooks,
    latestOrders,
  });
}

export async function getRevenueStatistics(req: Request, res: Response) {
  const completedOrders = await Order.find({ status: ORDER_STATUS.COMPLETED });

  res.json({
    totalRevenue: completedOrders.reduce((sum, order) => sum + Number(order.total || 0), 0),
    completedOrderCount: completedOrders.length,
  });
}

export async function getBookStatistics(req: Request, res: Response) {
  const [totalBooks, books, bestSellingBooks] = await Promise.all([
    Book.countDocuments(),
    Book.find(),
    Book.find().sort({ sold: -1 }).limit(10),
  ]);

  res.json({
    totalBooks,
    totalStock: books.reduce((sum, book) => sum + Number(book.stock || 0), 0),
    bestSellingBooks,
  });
}
