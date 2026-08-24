import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { HTTP_STATUS, TOKEN_TYPES, USER_ROLES, USER_STATUS } from "../constants";
import User from "../modules/users/user.model";
import Token from "../modules/tokens/token.model";

export async function authRequired(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Authentication token is required" });
  }

  try {
    const payload = verifyToken(token);
    const isLoggedOut = await Token.exists({ token, type: TOKEN_TYPES.LOGOUT });

    if (isLoggedOut) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Token has been logged out" });
    }

    const user = await User.findById(payload.id);

    if (!user || user.status === USER_STATUS.BLOCKED) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "User is not available" });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Invalid or expired token" });
  }
}

export function adminRequired(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role !== USER_ROLES.ADMIN) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({ message: "Admin permission is required" });
  }

  next();
}
