import type { Request, Response } from "express";
import Category from "./category.model";
import Book from "../books/book.model";
import { HTTP_STATUS } from "../../constants";
import { buildPagination, getPagination } from "../../utils/pagination";

export async function listCategories(req: Request, res: Response) {
  const { page, limit, skip } = getPagination(req);
  const [categories, total] = await Promise.all([
    Category.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    Category.countDocuments(),
  ]);

  res.json({
    categories,
    pagination: buildPagination(page, limit, total),
  });
}

export async function listAllCategories(req: Request, res: Response) {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json({ categories });
}

export async function getCategoryById(req: Request, res: Response) {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Category not found" });
  }

  res.json({ category });
}

export async function createCategory(req: Request, res: Response) {
  const { name, description } = req.body;

  if (!name) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Name is required" });
  }

  const category = await Category.create({
    name: name.trim(),
    description: description || "",
  });

  res.status(HTTP_STATUS.CREATED).json({ category });
}

export async function updateCategory(req: Request, res: Response) {
  const { name, description } = req.body;
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Category not found" });
  }

  if (name) category.name = name.trim();
  if (description !== undefined) category.description = description;
  await category.save();

  res.json({ category });
}

export async function deleteCategory(req: Request, res: Response) {
  const hasBook = await Book.exists({ categoryId: req.params.id });

  if (hasBook) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Cannot delete category that has books" });
  }

  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Category not found" });
  }

  res.json({ message: "Category deleted successfully" });
}
