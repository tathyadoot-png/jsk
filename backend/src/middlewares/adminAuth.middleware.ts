import jwt from "jsonwebtoken";
import Admin from "../modules/adminAuth/admin.model";

export const protectAdmin = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.admin_token;

    if (!token) {
      return res.status(401).json({ message: "Admin not authorized" });
    }

    const decoded: any = jwt.verify(
      token,
      process.env.ADMIN_JWT_SECRET as string
    );

    if (decoded.type !== "admin") {
      return res.status(403).json({ message: "Invalid admin token" });
    }

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    req.admin = admin;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid admin token" });
  }
};
