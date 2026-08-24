import {
  BOOK_SORT_OPTIONS,
  BOOK_STATUS,
  HTTP_STATUS,
  ORDER_STATUS,
  USER_ROLES,
  USER_STATUS,
} from "../constants";

export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Book Store API",
    version: "1.0.0",
    description: "REST API for a basic online book store.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],
  tags: [
    { name: "Auth" },
    { name: "Users" },
    { name: "Categories" },
    { name: "Books" },
    { name: "Cart" },
    { name: "Orders" },
    { name: "Reviews" },
    { name: "Wishlist" },
    { name: "Admin" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      ErrorResponse: {
        type: "object",
        properties: {
          message: { type: "string", example: "Something went wrong" },
        },
      },
      Pagination: {
        type: "object",
        properties: {
          page: { type: "number", example: 1 },
          limit: { type: "number", example: 10 },
          total: { type: "number", example: 100 },
          totalPages: { type: "number", example: 10 },
        },
      },
      User: {
        type: "object",
        properties: {
          _id: { type: "string", example: "66c7f7d2f1f2f3a4b5c6d7e8" },
          name: { type: "string", example: "User Demo" },
          email: { type: "string", example: "user@example.com" },
          role: { type: "string", enum: Object.values(USER_ROLES), example: USER_ROLES.USER },
          status: { type: "string", enum: Object.values(USER_STATUS), example: USER_STATUS.ACTIVE },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Category: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string", example: "Programming" },
          description: {
            type: "string",
            example: "Books about programming and software development.",
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Book: {
        type: "object",
        properties: {
          _id: { type: "string" },
          title: { type: "string", example: "Clean Code" },
          description: { type: "string", example: "A practical guide to writing readable, maintainable and professional code." },
          author: { type: "string", example: "Robert C. Martin" },
          publisher: { type: "string", example: "Prentice Hall" },
          isbn: { type: "string", example: "9780132350884" },
          price: { type: "number", example: 150000 },
          discountPrice: { type: "number", nullable: true, example: 120000 },
          stock: { type: "number", example: 20 },
          sold: { type: "number", example: 0 },
          imageUrl: {
            type: "string",
            example: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
          },
          sourceUrl: {
            type: "string",
            example: "https://openlibrary.org/isbn/9780132350884",
          },
          categoryId: {
            oneOf: [{ type: "string" }, { $ref: "#/components/schemas/Category" }],
          },
          status: { type: "string", enum: Object.values(BOOK_STATUS), example: BOOK_STATUS.ACTIVE },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      CartItem: {
        type: "object",
        properties: {
          bookId: { type: "string" },
          quantity: { type: "number", example: 2 },
          book: { $ref: "#/components/schemas/Book" },
          subtotal: { type: "number", example: 240000 },
        },
      },
      Cart: {
        type: "object",
        properties: {
          _id: { type: "string" },
          userId: { type: "string" },
          items: {
            type: "array",
            items: { $ref: "#/components/schemas/CartItem" },
          },
          total: { type: "number", example: 240000 },
        },
      },
      OrderItem: {
        type: "object",
        properties: {
          bookId: { type: "string" },
          title: { type: "string", example: "Clean Code" },
          imageUrl: { type: "string" },
          price: { type: "number", example: 120000 },
          quantity: { type: "number", example: 2 },
          subtotal: { type: "number", example: 240000 },
        },
      },
      Order: {
        type: "object",
        properties: {
          _id: { type: "string" },
          userId: { type: "string" },
          items: {
            type: "array",
            items: { $ref: "#/components/schemas/OrderItem" },
          },
          total: { type: "number", example: 240000 },
          shippingAddress: { type: "string", example: "123 Demo Street" },
          phone: { type: "string", example: "0900000000" },
          note: { type: "string", example: "Call before delivery" },
          status: {
            type: "string",
            enum: Object.values(ORDER_STATUS),
            example: ORDER_STATUS.PENDING,
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Review: {
        type: "object",
        properties: {
          _id: { type: "string" },
          userId: { type: "string" },
          bookId: { type: "string" },
          rating: { type: "number", minimum: 1, maximum: 5, example: 5 },
          comment: { type: "string", example: "Very useful book." },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string", example: "User Demo" },
                  email: { type: "string", example: "user@example.com" },
                  password: { type: "string", example: "123456" },
                },
              },
            },
          },
        },
        responses: {
          [HTTP_STATUS.CREATED]: { description: "Registered successfully" },
          [HTTP_STATUS.CONFLICT]: { description: "Email already exists" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", example: "admin@example.com" },
                  password: { type: "string", example: "123456" },
                },
              },
            },
          },
        },
        responses: {
          [HTTP_STATUS.OK]: { description: "Logged in successfully" },
          [HTTP_STATUS.UNAUTHORIZED]: { description: "Invalid credentials" },
        },
      },
    },
    "/api/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Logout",
        security: [{ bearerAuth: [] }],
        responses: {
          [HTTP_STATUS.OK]: { description: "Logged out successfully" },
          [HTTP_STATUS.UNAUTHORIZED]: { description: "Unauthorized" },
        },
      },
    },
    "/api/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Get current user",
        security: [{ bearerAuth: [] }],
        responses: {
          [HTTP_STATUS.OK]: { description: "Current user" },
          [HTTP_STATUS.UNAUTHORIZED]: { description: "Unauthorized" },
        },
      },
    },
    "/api/auth/change-password": {
      patch: {
        tags: ["Auth"],
        summary: "Change password",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["currentPassword", "newPassword"],
                properties: {
                  currentPassword: { type: "string", example: "123456" },
                  newPassword: { type: "string", example: "654321" },
                },
              },
            },
          },
        },
        responses: {
          [HTTP_STATUS.OK]: { description: "Password changed successfully" },
        },
      },
    },
    "/api/books": {
      get: {
        tags: ["Books"],
        summary: "List books with pagination",
        parameters: [
          { in: "query", name: "search", schema: { type: "string" } },
          { in: "query", name: "categoryId", schema: { type: "string" } },
          { in: "query", name: "minPrice", schema: { type: "number" } },
          { in: "query", name: "maxPrice", schema: { type: "number" } },
          {
            in: "query",
            name: "sort",
            schema: { type: "string", enum: Object.values(BOOK_SORT_OPTIONS) },
          },
          { in: "query", name: "page", schema: { type: "number", default: 1 } },
          { in: "query", name: "limit", schema: { type: "number", default: 10 } },
        ],
        responses: {
          [HTTP_STATUS.OK]: { description: "Book list" },
        },
      },
      post: {
        tags: ["Books"],
        summary: "Create book",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "author", "price", "stock", "categoryId"],
                properties: {
                  title: { type: "string", example: "Clean Code" },
                  description: { type: "string", example: "A practical guide to writing readable, maintainable and professional code." },
                  author: { type: "string", example: "Robert C. Martin" },
                  publisher: { type: "string", example: "Prentice Hall" },
                  isbn: { type: "string", example: "9780132350884" },
                  price: { type: "number", example: 150000 },
                  discountPrice: { type: "number", nullable: true, example: 120000 },
                  stock: { type: "number", example: 20 },
                  imageUrl: {
                    type: "string",
                    example: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
                  },
                  sourceUrl: {
                    type: "string",
                    example: "https://openlibrary.org/isbn/9780132350884",
                  },
                  categoryId: { type: "string" },
                  status: { type: "string", enum: Object.values(BOOK_STATUS) },
                },
              },
            },
          },
        },
        responses: {
          [HTTP_STATUS.CREATED]: { description: "Book created" },
          [HTTP_STATUS.FORBIDDEN]: { description: "Admin permission is required" },
        },
      },
    },
    "/api/books/all": {
      get: {
        tags: ["Books"],
        summary: "List all books without pagination",
        responses: {
          [HTTP_STATUS.OK]: { description: "All books" },
        },
      },
    },
    "/api/books/{id}": {
      get: {
        tags: ["Books"],
        summary: "Get book detail",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: {
          [HTTP_STATUS.OK]: { description: "Book detail" },
          [HTTP_STATUS.NOT_FOUND]: { description: "Book not found" },
        },
      },
      patch: {
        tags: ["Books"],
        summary: "Update book",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: {
          [HTTP_STATUS.OK]: { description: "Book updated" },
        },
      },
      delete: {
        tags: ["Books"],
        summary: "Delete book",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: {
          [HTTP_STATUS.OK]: { description: "Book deleted" },
        },
      },
    },
    "/api/books/{id}/stock": {
      patch: {
        tags: ["Books"],
        summary: "Update book stock",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["stock"],
                properties: { stock: { type: "number", example: 15 } },
              },
            },
          },
        },
        responses: { [HTTP_STATUS.OK]: { description: "Stock updated" } },
      },
    },
    "/api/categories": {
      get: {
        tags: ["Categories"],
        summary: "List categories with pagination",
        parameters: [
          { in: "query", name: "page", schema: { type: "number", default: 1 } },
          { in: "query", name: "limit", schema: { type: "number", default: 10 } },
        ],
        responses: { [HTTP_STATUS.OK]: { description: "Category list" } },
      },
      post: {
        tags: ["Categories"],
        summary: "Create category",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name"],
                properties: {
                  name: { type: "string", example: "Programming" },
                  description: { type: "string", example: "Programming books" },
                },
              },
            },
          },
        },
        responses: { [HTTP_STATUS.CREATED]: { description: "Category created" } },
      },
    },
    "/api/categories/all": {
      get: {
        tags: ["Categories"],
        summary: "List all categories without pagination",
        responses: { [HTTP_STATUS.OK]: { description: "All categories" } },
      },
    },
    "/api/categories/{id}": {
      get: {
        tags: ["Categories"],
        summary: "Get category detail",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { [HTTP_STATUS.OK]: { description: "Category detail" } },
      },
      patch: {
        tags: ["Categories"],
        summary: "Update category",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { [HTTP_STATUS.OK]: { description: "Category updated" } },
      },
      delete: {
        tags: ["Categories"],
        summary: "Delete category",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { [HTTP_STATUS.OK]: { description: "Category deleted" } },
      },
    },
    "/api/cart": {
      get: {
        tags: ["Cart"],
        summary: "Get current user's cart",
        security: [{ bearerAuth: [] }],
        responses: { [HTTP_STATUS.OK]: { description: "Cart detail" } },
      },
      delete: {
        tags: ["Cart"],
        summary: "Clear cart",
        security: [{ bearerAuth: [] }],
        responses: { [HTTP_STATUS.OK]: { description: "Cart cleared" } },
      },
    },
    "/api/cart/items": {
      post: {
        tags: ["Cart"],
        summary: "Add item to cart",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["bookId"],
                properties: {
                  bookId: { type: "string" },
                  quantity: { type: "number", example: 1 },
                },
              },
            },
          },
        },
        responses: { [HTTP_STATUS.CREATED]: { description: "Item added" } },
      },
    },
    "/api/cart/items/{bookId}": {
      patch: {
        tags: ["Cart"],
        summary: "Update cart item quantity",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "bookId", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["quantity"],
                properties: { quantity: { type: "number", example: 2 } },
              },
            },
          },
        },
        responses: { [HTTP_STATUS.OK]: { description: "Item updated" } },
      },
      delete: {
        tags: ["Cart"],
        summary: "Remove item from cart",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "bookId", required: true, schema: { type: "string" } }],
        responses: { [HTTP_STATUS.OK]: { description: "Item removed" } },
      },
    },
    "/api/orders": {
      get: {
        tags: ["Orders"],
        summary: "List orders with pagination as admin",
        security: [{ bearerAuth: [] }],
        parameters: [
          { in: "query", name: "page", schema: { type: "number", default: 1 } },
          { in: "query", name: "limit", schema: { type: "number", default: 10 } },
        ],
        responses: { [HTTP_STATUS.OK]: { description: "Order list" } },
      },
      post: {
        tags: ["Orders"],
        summary: "Create order from cart",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["shippingAddress", "phone"],
                properties: {
                  shippingAddress: { type: "string", example: "123 Demo Street" },
                  phone: { type: "string", example: "0900000000" },
                  note: { type: "string", example: "Call before delivery" },
                },
              },
            },
          },
        },
        responses: { [HTTP_STATUS.CREATED]: { description: "Order created" } },
      },
    },
    "/api/orders/all": {
      get: {
        tags: ["Orders"],
        summary: "List all orders without pagination as admin",
        security: [{ bearerAuth: [] }],
        responses: { [HTTP_STATUS.OK]: { description: "All orders" } },
      },
    },
    "/api/orders/my-orders": {
      get: {
        tags: ["Orders"],
        summary: "List current user's orders with pagination",
        security: [{ bearerAuth: [] }],
        parameters: [
          { in: "query", name: "page", schema: { type: "number", default: 1 } },
          { in: "query", name: "limit", schema: { type: "number", default: 10 } },
        ],
        responses: { [HTTP_STATUS.OK]: { description: "Current user's orders" } },
      },
    },
    "/api/orders/my-orders/all": {
      get: {
        tags: ["Orders"],
        summary: "List all current user's orders without pagination",
        security: [{ bearerAuth: [] }],
        responses: { [HTTP_STATUS.OK]: { description: "All current user's orders" } },
      },
    },
    "/api/orders/{id}": {
      get: {
        tags: ["Orders"],
        summary: "Get order detail",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { [HTTP_STATUS.OK]: { description: "Order detail" } },
      },
    },
    "/api/orders/{id}/status": {
      patch: {
        tags: ["Orders"],
        summary: "Update order status as admin",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["status"],
                properties: {
                  status: { type: "string", enum: Object.values(ORDER_STATUS) },
                },
              },
            },
          },
        },
        responses: { [HTTP_STATUS.OK]: { description: "Order status updated" } },
      },
    },
    "/api/orders/{id}/cancel": {
      patch: {
        tags: ["Orders"],
        summary: "Cancel order",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { [HTTP_STATUS.OK]: { description: "Order cancelled" } },
      },
    },
    "/api/books/{bookId}/reviews": {
      get: {
        tags: ["Reviews"],
        summary: "List book reviews with pagination",
        parameters: [
          { in: "path", name: "bookId", required: true, schema: { type: "string" } },
          { in: "query", name: "page", schema: { type: "number", default: 1 } },
          { in: "query", name: "limit", schema: { type: "number", default: 10 } },
        ],
        responses: { [HTTP_STATUS.OK]: { description: "Review list" } },
      },
      post: {
        tags: ["Reviews"],
        summary: "Create book review",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "bookId", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["rating"],
                properties: {
                  rating: { type: "number", minimum: 1, maximum: 5, example: 5 },
                  comment: { type: "string", example: "Very useful book." },
                },
              },
            },
          },
        },
        responses: { [HTTP_STATUS.CREATED]: { description: "Review created" } },
      },
    },
    "/api/books/{bookId}/reviews/all": {
      get: {
        tags: ["Reviews"],
        summary: "List all book reviews without pagination",
        parameters: [{ in: "path", name: "bookId", required: true, schema: { type: "string" } }],
        responses: { [HTTP_STATUS.OK]: { description: "All book reviews" } },
      },
    },
    "/api/reviews/{id}": {
      patch: {
        tags: ["Reviews"],
        summary: "Update review",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { [HTTP_STATUS.OK]: { description: "Review updated" } },
      },
      delete: {
        tags: ["Reviews"],
        summary: "Delete review",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { [HTTP_STATUS.OK]: { description: "Review deleted" } },
      },
    },
    "/api/wishlist": {
      get: {
        tags: ["Wishlist"],
        summary: "Get wishlist",
        security: [{ bearerAuth: [] }],
        responses: { [HTTP_STATUS.OK]: { description: "Wishlist detail" } },
      },
    },
    "/api/wishlist/{bookId}": {
      post: {
        tags: ["Wishlist"],
        summary: "Add book to wishlist",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "bookId", required: true, schema: { type: "string" } }],
        responses: { [HTTP_STATUS.CREATED]: { description: "Book added to wishlist" } },
      },
      delete: {
        tags: ["Wishlist"],
        summary: "Remove book from wishlist",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "bookId", required: true, schema: { type: "string" } }],
        responses: { [HTTP_STATUS.OK]: { description: "Book removed from wishlist" } },
      },
    },
    "/api/users/me": {
      get: {
        tags: ["Users"],
        summary: "Get profile",
        security: [{ bearerAuth: [] }],
        responses: { [HTTP_STATUS.OK]: { description: "Profile detail" } },
      },
      patch: {
        tags: ["Users"],
        summary: "Update profile",
        security: [{ bearerAuth: [] }],
        responses: { [HTTP_STATUS.OK]: { description: "Profile updated" } },
      },
    },
    "/api/users": {
      get: {
        tags: ["Users"],
        summary: "List users with pagination as admin",
        security: [{ bearerAuth: [] }],
        parameters: [
          { in: "query", name: "page", schema: { type: "number", default: 1 } },
          { in: "query", name: "limit", schema: { type: "number", default: 10 } },
        ],
        responses: { [HTTP_STATUS.OK]: { description: "User list" } },
      },
    },
    "/api/users/all": {
      get: {
        tags: ["Users"],
        summary: "List all users without pagination as admin",
        security: [{ bearerAuth: [] }],
        responses: { [HTTP_STATUS.OK]: { description: "All users" } },
      },
    },
    "/api/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Get user detail as admin",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { [HTTP_STATUS.OK]: { description: "User detail" } },
      },
    },
    "/api/users/{id}/status": {
      patch: {
        tags: ["Users"],
        summary: "Update user status as admin",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["status"],
                properties: {
                  status: { type: "string", enum: Object.values(USER_STATUS) },
                },
              },
            },
          },
        },
        responses: { [HTTP_STATUS.OK]: { description: "User status updated" } },
      },
    },
    "/api/admin/dashboard": {
      get: {
        tags: ["Admin"],
        summary: "Get admin dashboard",
        security: [{ bearerAuth: [] }],
        responses: { [HTTP_STATUS.OK]: { description: "Dashboard statistics" } },
      },
    },
    "/api/admin/statistics/revenue": {
      get: {
        tags: ["Admin"],
        summary: "Get revenue statistics",
        security: [{ bearerAuth: [] }],
        responses: { [HTTP_STATUS.OK]: { description: "Revenue statistics" } },
      },
    },
    "/api/admin/statistics/books": {
      get: {
        tags: ["Admin"],
        summary: "Get book statistics",
        security: [{ bearerAuth: [] }],
        responses: { [HTTP_STATUS.OK]: { description: "Book statistics" } },
      },
    },
  },
};
