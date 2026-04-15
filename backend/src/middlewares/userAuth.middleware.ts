import jwt from "jsonwebtoken";
import User from "../modules/user/user.model";

export const protectUser = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.user_token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded: any = jwt.verify(
      token,
      process.env.USER_JWT_SECRET as string
    );

    if (decoded.type !== "user") {
      return res.status(403).json({ message: "Invalid token type" });
    }

    const user = await User.findById(decoded.id);

    if (!user || !user.isVerified) {
      return res.status(401).json({ message: "User not valid" });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
