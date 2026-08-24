import type { Request } from "express";

export interface PaginationOptions {
  defaultLimit?: number;
  maxLimit?: number;
}

export function getPagination(req: Request, options: PaginationOptions = {}) {
  const defaultLimit = options.defaultLimit || 10;
  const maxLimit = options.maxLimit || 100;
  const page = Math.max(Number(req.query.page) || 1, 1);
  const requestedLimit = Math.max(Number(req.query.limit) || defaultLimit, 1);
  const limit = Math.min(requestedLimit, maxLimit);
  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
}

export function buildPagination(page: number, limit: number, total: number) {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}
