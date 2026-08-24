import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../users/user.model";
import Token from "../tokens/token.model";
import { HTTP_STATUS, TOKEN_TYPES, USER_ROLES, USER_STATUS } from "../../constants";
import { signToken } from "../../utils/jwt";
import { publicUser } from "../../utils/sanitize";

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Name, email and password are required" });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existedUser = await User.findOne({ email: normalizedEmail });

  if (existedUser) {
    return res.status(HTTP_STATUS.CONFLICT).json({ message: "Email already exists" });
  }

  const userCount = await User.countDocuments();
  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password: await bcrypt.hash(password, 10),
    role: userCount === 0 ? USER_ROLES.ADMIN : USER_ROLES.USER,
    status: USER_STATUS.ACTIVE,
  });

  const token = signToken(user);

  res.status(HTTP_STATUS.CREATED).json({
    user: publicUser(user),
    token,
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Invalid email or password" });
  }

  if (user.status === USER_STATUS.BLOCKED) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({ message: "User is blocked" });
  }

  const token = signToken(user);

  res.json({
    user: publicUser(user),
    token,
  });
}

export async function logout(req: Request, res: Response) {
  await Token.create({
    token: req.token,
    type: TOKEN_TYPES.LOGOUT,
  });

  res.json({ message: "Logged out successfully" });
}

export function me(req: Request, res: Response) {
  res.json({ user: publicUser(req.user) });
}

export async function changePassword(req: Request, res: Response) {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Current password and new password are required" });
  }

  const user = await User.findById(req.user?._id);
  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "User not found" });
  }

  const isMatched = await bcrypt.compare(currentPassword, user.password);

  if (!isMatched) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Current password is incorrect" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: "Password changed successfully" });
}
