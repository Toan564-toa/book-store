export function publicUser(user: any) {
  if (!user) return null;

  const plainUser = typeof user.toObject === "function" ? user.toObject() : user;
  const { password, __v, ...safeUser } = plainUser;
  return safeUser;
}
