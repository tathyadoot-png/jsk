// hooks/admin/useAdmins.ts
import { useEffect, useState } from "react";
import { adminService } from "@/services/admin.service";

export const useAdmins = () => {
  const [admins, setAdmins] = useState([]);

  const fetchAdmins = async () => {
    const res = await adminService.getAll();
    setAdmins(res.admins);
  };

  const deleteAdmin = async (id: string) => {
    await adminService.delete(id);
    fetchAdmins();
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return { admins, fetchAdmins, deleteAdmin };
};