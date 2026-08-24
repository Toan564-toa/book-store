export const USER_ROLES = Object.freeze({
  USER: "user",
  ADMIN: "admin",
});

export const USER_STATUS = Object.freeze({
  ACTIVE: "active",
  BLOCKED: "blocked",
});

export const BOOK_STATUS = Object.freeze({
  ACTIVE: "active",
  INACTIVE: "inactive",
});

export const ORDER_STATUS = Object.freeze({
  PENDING: "pending",
  CONFIRMED: "confirmed",
  SHIPPING: "shipping",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
});

export const TOKEN_TYPES = Object.freeze({
  LOGOUT: "logout",
});

export const BOOK_SORT_OPTIONS = Object.freeze({
  NEWEST: "newest",
  PRICE_ASC: "price_asc",
  PRICE_DESC: "price_desc",
  BEST_SELLING: "best_selling",
});

export const HTTP_STATUS = Object.freeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
});
