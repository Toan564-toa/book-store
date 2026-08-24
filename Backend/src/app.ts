import "express-async-errors";

import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/users/user.routes";
import categoryRoutes from "./modules/categories/category.routes";
import bookRoutes from "./modules/books/book.routes";
import cartRoutes from "./modules/cart/cart.routes";
import orderRoutes from "./modules/orders/order.routes";
import reviewRoutes from "./modules/reviews/review.routes";
import wishlistRoutes from "./modules/wishlist/wishlist.routes";
import adminRoutes from "./modules/admin/admin.routes";
import { notFound, errorHandler } from "./middlewares/error.middleware";
import { setupSwagger } from "./config/swagger";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

setupSwagger(app);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Book Store API",
    docs: "/api-docs",
  });
});

app.get("/api", (req, res) => {
  res.json({
    modules: [
      "/api/auth",
      "/api/users",
      "/api/categories",
      "/api/books",
      "/api/cart",
      "/api/orders",
      "/api/reviews",
      "/api/wishlist",
      "/api/admin",
    ],
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
