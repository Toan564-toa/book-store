import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import type { HydratedDocument, Types } from "mongoose";
import type { IUser } from "../modules/users/user.model";

export interface JwtPayload {
  id: string;
  role: string;
}

type TokenUser = HydratedDocument<IUser> | { _id?: Types.ObjectId | string; id?: string; role: string };

export function signToken(user: TokenUser) {
  const secret: Secret = process.env.JWT_SECRET || "dev-secret";
  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  } as SignOptions;

  return jwt.sign(
    {
      id: String(user._id || user.id),
      role: user.role,
    },
    secret,
    options
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET || "dev-secret") as JwtPayload;
}
