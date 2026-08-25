import type { Request, Response } from "express";
import Book, { type IBook } from "./book.model";
import Category from "../categories/category.model";
import Review from "../reviews/review.model";
import { BOOK_SORT_OPTIONS, BOOK_STATUS, HTTP_STATUS } from "../../constants";
import { buildPagination } from "../../utils/pagination";

export async function listBooks(req: Request, res: Response) {
  const {
    search,
    categoryId,
    minPrice,
    maxPrice,
    sort = BOOK_SORT_OPTIONS.NEWEST,
    page = 1,
    limit = 8,
  } = req.query;

  const query: Record<string, any> = { status: { $ne: BOOK_STATUS.INACTIVE } };

  if (search) {
    query.$or = [
      { title: { $regex: String(search), $options: "i" } },
      { author: { $regex: String(search), $options: "i" } },
    ];
  }

  // Support one id, repeated ids (?categoryId=id1&categoryId=id2),
  // Axios's array form (?categoryId[]=id1&categoryId[]=id2), and comma-separated ids.
  const categoryIdValues = [categoryId, req.query["categoryId[]"]]
    .flatMap((value) => (Array.isArray(value) ? value : [value]))
    .filter((value): value is string => typeof value === "string")
    .flatMap((value) => value.split(","))
    .map((value) => value.trim())
    .filter(Boolean);

  if (categoryIdValues.length === 1) {
    query.categoryId = categoryIdValues[0];
  } else if (categoryIdValues.length > 1) {
    query.categoryId = { $in: categoryIdValues };
  }

  if (minPrice || maxPrice) {
    const priceExpressions = [];

    if (minPrice) {
      priceExpressions.push({
        $gte: [{ $ifNull: ["$discountPrice", "$price"] }, Number(minPrice)],
      });
    }

    if (maxPrice) {
      priceExpressions.push({
        $lte: [{ $ifNull: ["$discountPrice", "$price"] }, Number(maxPrice)],
      });
    }

    query.$expr = priceExpressions.length === 1 ? priceExpressions[0] : { $and: priceExpressions };
  }

  let sortOption: Record<string, 1 | -1> = { createdAt: -1 };
  if (sort === BOOK_SORT_OPTIONS.PRICE_ASC) sortOption = { price: 1 };
  if (sort === BOOK_SORT_OPTIONS.PRICE_DESC) sortOption = { price: -1 };
  if (sort === BOOK_SORT_OPTIONS.BEST_SELLING) sortOption = { sold: -1 };

  const pageNumber = Math.max(Number(page), 1);
  const limitNumber = Math.max(Number(limit), 1);
  const skip = (pageNumber - 1) * limitNumber;

  const [books, total] = await Promise.all([
    Book.find(query).populate("categoryId").sort(sortOption).skip(skip).limit(limitNumber),
    Book.countDocuments(query),
  ]);

  res.json({
    books,
    pagination: buildPagination(pageNumber, limitNumber, total),
  });
}

export async function listAllBooks(req: Request, res: Response) {
  const books = await Book.find({ status: { $ne: BOOK_STATUS.INACTIVE } })
    .populate("categoryId")
    .sort({ createdAt: -1 });

  res.json({ books });
}

export async function getBookById(req: Request, res: Response) {
  const book = await Book.findById(req.params.id).populate("categoryId");

  if (!book) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Book not found" });
  }

  const reviews = await Review.find({ bookId: book._id });
  const averageRating = reviews.length
    ? reviews.reduce((total, review) => total + Number(review.rating), 0) / reviews.length
    : 0;

  res.json({
    book: {
      ...book.toObject(),
      averageRating,
      reviewCount: reviews.length,
    },
  });
}

export async function createBook(req: Request, res: Response) {
  const {
    title,
    description,
    author,
    publisher,
    isbn,
    price,
    discountPrice,
    stock,
    imageUrl,
    sourceUrl,
    categoryId,
    status = BOOK_STATUS.ACTIVE,
  } = req.body;

  if (!title || !author || price === undefined || stock === undefined || !categoryId) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Title, author, price, stock and categoryId are required",
    });
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Category does not exist" });
  }

  const book = await Book.create({
    title: title.trim(),
    description: description || "",
    author: author.trim(),
    publisher: publisher || "",
    isbn: isbn || "",
    price: Number(price),
    discountPrice: discountPrice === undefined ? null : Number(discountPrice),
    stock: Number(stock),
    imageUrl: imageUrl || "",
    sourceUrl: sourceUrl || "",
    categoryId,
    status,
  });

  res.status(HTTP_STATUS.CREATED).json({ book });
}

export async function updateBook(req: Request, res: Response) {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Book not found" });
  }

  const fields: Array<keyof IBook> = [
    "title",
    "description",
    "author",
    "publisher",
    "isbn",
    "price",
    "discountPrice",
    "stock",
    "imageUrl",
    "sourceUrl",
    "categoryId",
    "status",
  ];

  if (req.body.categoryId) {
    const category = await Category.findById(req.body.categoryId);
    if (!category) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Category does not exist" });
    }
  }

  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      (book as any)[field] = ["price", "discountPrice", "stock"].includes(field)
        ? Number(req.body[field])
        : req.body[field];
    }
  });

  await book.save();

  res.json({ book });
}

export async function deleteBook(req: Request, res: Response) {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Book not found" });
  }

  res.json({ message: "Book deleted successfully" });
}

export async function updateBookStock(req: Request, res: Response) {
  const { stock } = req.body;

  if (stock === undefined || Number(stock) < 0) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Stock must be a number greater than or equal to 0" });
  }

  const book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Book not found" });
  }

  book.stock = Number(stock);
  await book.save();

  res.json({ book });
}
