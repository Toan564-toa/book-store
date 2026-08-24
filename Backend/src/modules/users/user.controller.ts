import type { Request, Response } from "express";
import User from "./user.model";
import { HTTP_STATUS, USER_STATUS } from "../../constants";
import { publicUser } from "../../utils/sanitize";
import { buildPagination, getPagination } from "../../utils/pagination";

export function getMyProfile(req: Request, res: Response) {
  res.json({ user: publicUser(req.user) });
}

export async function updateMyProfile(req: Request, res: Response) {
  const { name } = req.body;
  const user = await User.findById(req.user!._id);

  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "User not found" });
  }

  if (name) {
    user.name = name.trim();
  }

  await user.save();

  res.json({ user: publicUser(user) });
}

export async function listUsers(req: Request, res: Response) {
  const { page, limit, skip } = getPagination(req);
  const [users, total] = await Promise.all([
    User.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(),
  ]);

  res.json({
    users: users.map(publicUser),
    pagination: buildPagination(page, limit, total),
  });
}

export async function listAllUsers(req: Request, res: Response) {
  const users = await User.find().sort({ createdAt: -1 });
  res.json({ users: users.map(publicUser) });
}

export async function getUserById(req: Request, res: Response) {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "User not found" });
  }

  res.json({ user: publicUser(user) });
}

export async function updateUserStatus(req: Request, res: Response) {
  const { status } = req.body;
  const allowedStatuses = Object.values(USER_STATUS);

  if (!allowedStatuses.includes(status)) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({
        message: `Status must be one of: ${allowedStatuses.join(", ")}`,
      });
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "User not found" });
  }

  user.status = status;
  await user.save();

  res.json({ user: publicUser(user) });
}
