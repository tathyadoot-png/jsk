export const allowPermissions = (...allowed: string[]) => {
  return (req: any, res: any, next: any) => {
    const admin = req.admin;

    if (!admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Admin = full access
    if (admin.role === "admin") {
      return next();
    }

    const hasPermission = allowed.some((perm) =>
      admin.permissions.includes(perm)
    );

    if (!hasPermission) {
      return res.status(403).json({ message: "Permission denied" });
    }

    next();
  };
};