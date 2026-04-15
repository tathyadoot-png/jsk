import jwt from "jsonwebtoken";

export const generateToken = (
  id: string,
  type: "user" | "admin"
) => {
  const secret =
    type === "admin"
      ? process.env.ADMIN_JWT_SECRET
      : process.env.USER_JWT_SECRET;

  return jwt.sign({ id, type }, secret as string, {
    expiresIn: "7d",
  });
};


export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.USER_JWT_SECRET as string
    );

    return decoded;
  } catch (err) {
    return null;
  }
};