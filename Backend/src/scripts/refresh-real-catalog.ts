import "dotenv/config";

import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import connectDb from "../config/db";
import User from "../modules/users/user.model";
import Category from "../modules/categories/category.model";
import Book from "../modules/books/book.model";
import Cart from "../modules/cart/cart.model";
import Order from "../modules/orders/order.model";
import Review from "../modules/reviews/review.model";
import Wishlist from "../modules/wishlist/wishlist.model";
import Token from "../modules/tokens/token.model";
import { BOOK_STATUS, USER_ROLES, USER_STATUS } from "../constants";

const coverUrl = (isbn: string) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
const sourceUrl = (isbn: string) => `https://openlibrary.org/isbn/${isbn}`;

async function refreshRealCatalog() {
  await connectDb();

  await Promise.all([
    User.deleteMany(),
    Category.deleteMany(),
    Book.deleteMany(),
    Cart.deleteMany(),
    Order.deleteMany(),
    Review.deleteMany(),
    Wishlist.deleteMany(),
    Token.deleteMany(),
  ]);

  const users = await User.create([
    {
      name: "Admin",
      email: "admin@example.com",
      password: await bcrypt.hash("123456", 10),
      role: USER_ROLES.ADMIN,
      status: USER_STATUS.ACTIVE,
    },
    {
      name: "Nguyen Minh Anh",
      email: "user@example.com",
      password: await bcrypt.hash("123456", 10),
      role: USER_ROLES.USER,
      status: USER_STATUS.ACTIVE,
    },
  ]);

  const categories = await Category.create([
    {
      name: "Programming",
      description: "Classic books about programming languages and practical coding.",
    },
    {
      name: "Software Engineering",
      description: "Books about architecture, maintainability, refactoring and engineering practice.",
    },
    {
      name: "Databases",
      description: "Books about data systems, MongoDB, SQL and distributed storage.",
    },
    {
      name: "Web Development",
      description: "Books about JavaScript, React, Node.js and modern web applications.",
    },
    {
      name: "Business",
      description: "Books about business thinking, startups, habits and decision making.",
    },
  ]);

  const categoryByName = new Map(categories.map((category) => [category.name, category._id]));

  await Book.create([
    {
      title: "Clean Code",
      description: "A practical guide to writing readable, maintainable and professional code.",
      author: "Robert C. Martin",
      publisher: "Prentice Hall",
      isbn: "9780132350884",
      price: 620000,
      discountPrice: 559000,
      stock: 18,
      sold: 42,
      imageUrl: coverUrl("9780132350884"),
      sourceUrl: sourceUrl("9780132350884"),
      categoryId: categoryByName.get("Software Engineering"),
      status: BOOK_STATUS.ACTIVE,
    },
    {
      title: "Design Patterns",
      description: "A catalog of reusable object-oriented design patterns.",
      author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
      publisher: "Addison-Wesley",
      isbn: "9780201633610",
      price: 720000,
      discountPrice: 649000,
      stock: 12,
      sold: 27,
      imageUrl: coverUrl("9780201633610"),
      sourceUrl: sourceUrl("9780201633610"),
      categoryId: categoryByName.get("Software Engineering"),
      status: BOOK_STATUS.ACTIVE,
    },
    {
      title: "The C Programming Language",
      description: "The classic introduction to the C programming language.",
      author: "Brian W. Kernighan, Dennis M. Ritchie",
      publisher: "Prentice Hall",
      isbn: "9780131103627",
      price: 520000,
      discountPrice: 469000,
      stock: 20,
      sold: 35,
      imageUrl: coverUrl("9780131103627"),
      sourceUrl: sourceUrl("9780131103627"),
      categoryId: categoryByName.get("Programming"),
      status: BOOK_STATUS.ACTIVE,
    },
    {
      title: "Refactoring",
      description: "Techniques for improving the design of existing code without changing behavior.",
      author: "Martin Fowler",
      publisher: "Addison-Wesley",
      isbn: "9780134757599",
      price: 780000,
      discountPrice: 699000,
      stock: 10,
      sold: 31,
      imageUrl: coverUrl("9780134757599"),
      sourceUrl: sourceUrl("9780134757599"),
      categoryId: categoryByName.get("Software Engineering"),
      status: BOOK_STATUS.ACTIVE,
    },
    {
      title: "The Pragmatic Programmer",
      description: "Practical advice for becoming a more effective software developer.",
      author: "David Thomas, Andrew Hunt",
      publisher: "Addison-Wesley",
      isbn: "9780135957059",
      price: 690000,
      discountPrice: 619000,
      stock: 15,
      sold: 39,
      imageUrl: coverUrl("9780135957059"),
      sourceUrl: sourceUrl("9780135957059"),
      categoryId: categoryByName.get("Software Engineering"),
      status: BOOK_STATUS.ACTIVE,
    },
    {
      title: "Designing Data-Intensive Applications",
      description: "A deep look at reliable, scalable and maintainable data systems.",
      author: "Martin Kleppmann",
      publisher: "O'Reilly Media",
      isbn: "9781449373320",
      price: 880000,
      discountPrice: 799000,
      stock: 14,
      sold: 44,
      imageUrl: coverUrl("9781449373320"),
      sourceUrl: sourceUrl("9781449373320"),
      categoryId: categoryByName.get("Databases"),
      status: BOOK_STATUS.ACTIVE,
    },
    {
      title: "MongoDB: The Definitive Guide",
      description: "A practical guide to using MongoDB for application development.",
      author: "Shannon Bradshaw, Eoin Brazil, Kristina Chodorow",
      publisher: "O'Reilly Media",
      isbn: "9781491954461",
      price: 760000,
      discountPrice: 689000,
      stock: 11,
      sold: 21,
      imageUrl: coverUrl("9781491954461"),
      sourceUrl: sourceUrl("9781491954461"),
      categoryId: categoryByName.get("Databases"),
      status: BOOK_STATUS.ACTIVE,
    },
    {
      title: "Learning SQL",
      description: "A hands-on introduction to SQL queries, database design and relational data.",
      author: "Alan Beaulieu",
      publisher: "O'Reilly Media",
      isbn: "9781492057611",
      price: 640000,
      discountPrice: 579000,
      stock: 16,
      sold: 24,
      imageUrl: coverUrl("9781492057611"),
      sourceUrl: sourceUrl("9781492057611"),
      categoryId: categoryByName.get("Databases"),
      status: BOOK_STATUS.ACTIVE,
    },
    {
      title: "Programming TypeScript",
      description: "A guide to building safer JavaScript applications with TypeScript.",
      author: "Boris Cherny",
      publisher: "O'Reilly Media",
      isbn: "9781492037651",
      price: 670000,
      discountPrice: 599000,
      stock: 22,
      sold: 33,
      imageUrl: coverUrl("9781492037651"),
      sourceUrl: sourceUrl("9781492037651"),
      categoryId: categoryByName.get("Programming"),
      status: BOOK_STATUS.ACTIVE,
    },
    {
      title: "JavaScript: The Definitive Guide",
      description: "A comprehensive reference for JavaScript and the web platform.",
      author: "David Flanagan",
      publisher: "O'Reilly Media",
      isbn: "9781491952023",
      price: 850000,
      discountPrice: 765000,
      stock: 13,
      sold: 37,
      imageUrl: coverUrl("9781491952023"),
      sourceUrl: sourceUrl("9781491952023"),
      categoryId: categoryByName.get("Web Development"),
      status: BOOK_STATUS.ACTIVE,
    },
    {
      title: "Eloquent JavaScript",
      description: "An introduction to JavaScript, programming concepts and browser applications.",
      author: "Marijn Haverbeke",
      publisher: "No Starch Press",
      isbn: "9781593279509",
      price: 610000,
      discountPrice: 549000,
      stock: 19,
      sold: 28,
      imageUrl: coverUrl("9781593279509"),
      sourceUrl: sourceUrl("9781593279509"),
      categoryId: categoryByName.get("Web Development"),
      status: BOOK_STATUS.ACTIVE,
    },
    {
      title: "JavaScript: The Good Parts",
      description: "A focused look at the elegant and reliable parts of JavaScript.",
      author: "Douglas Crockford",
      publisher: "O'Reilly Media",
      isbn: "9780596517748",
      price: 430000,
      discountPrice: 389000,
      stock: 17,
      sold: 26,
      imageUrl: coverUrl("9780596517748"),
      sourceUrl: sourceUrl("9780596517748"),
      categoryId: categoryByName.get("Web Development"),
      status: BOOK_STATUS.ACTIVE,
    },
    {
      title: "Node.js in Action",
      description: "A practical guide to building server-side applications with Node.js.",
      author: "Mike Cantelon, Marc Harter, T. J. Holowaychuk, Nathan Rajlich",
      publisher: "Manning Publications",
      isbn: "9781617292576",
      price: 790000,
      discountPrice: 719000,
      stock: 9,
      sold: 18,
      imageUrl: coverUrl("9781617292576"),
      sourceUrl: sourceUrl("9781617292576"),
      categoryId: categoryByName.get("Web Development"),
      status: BOOK_STATUS.ACTIVE,
    },
    {
      title: "React Quickly",
      description: "A practical introduction to building applications with React.",
      author: "Azat Mardan",
      publisher: "Manning Publications",
      isbn: "9781617293344",
      price: 700000,
      discountPrice: 639000,
      stock: 12,
      sold: 20,
      imageUrl: coverUrl("9781617293344"),
      sourceUrl: sourceUrl("9781617293344"),
      categoryId: categoryByName.get("Web Development"),
      status: BOOK_STATUS.ACTIVE,
    },
    {
      title: "The Lean Startup",
      description: "A startup methodology focused on fast learning, experiments and iteration.",
      author: "Eric Ries",
      publisher: "Crown Business",
      isbn: "9780307887894",
      price: 480000,
      discountPrice: 429000,
      stock: 25,
      sold: 46,
      imageUrl: coverUrl("9780307887894"),
      sourceUrl: sourceUrl("9780307887894"),
      categoryId: categoryByName.get("Business"),
      status: BOOK_STATUS.ACTIVE,
    },
    {
      title: "Atomic Habits",
      description: "A practical system for building good habits and breaking bad ones.",
      author: "James Clear",
      publisher: "Avery",
      isbn: "9780735211292",
      price: 420000,
      discountPrice: 379000,
      stock: 30,
      sold: 58,
      imageUrl: coverUrl("9780735211292"),
      sourceUrl: sourceUrl("9780735211292"),
      categoryId: categoryByName.get("Business"),
      status: BOOK_STATUS.ACTIVE,
    },
    {
      title: "The Hard Thing About Hard Things",
      description: "Practical lessons about building and running a company in difficult moments.",
      author: "Ben Horowitz",
      publisher: "HarperBusiness",
      isbn: "9780062273208",
      price: 520000,
      discountPrice: 469000,
      stock: 18,
      sold: 32,
      imageUrl: coverUrl("9780062273208"),
      sourceUrl: sourceUrl("9780062273208"),
      categoryId: categoryByName.get("Business"),
      status: BOOK_STATUS.ACTIVE,
    },
  ]);

  console.log("MongoDB real catalog data created");
  console.log("Book metadata and cover URLs reference Open Library by ISBN");
  console.log("Admin: admin@example.com / 123456");
  console.log("User: user@example.com / 123456");
  console.log(`Admin ID: ${users[0]._id}`);

  await mongoose.disconnect();
}

refreshRealCatalog().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
