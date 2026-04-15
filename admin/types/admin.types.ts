// types/admin/admin.types.ts
export interface AdminType {
  _id?: string;
  name: string;
  email: string;
  role: "admin" | "nodal";
  permissions: string[];
}