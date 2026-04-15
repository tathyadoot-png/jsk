// services/user.service.ts

import { fetchAPI } from "@/lib/api";

export const getUserFullProfile = (id: string) =>
    
  fetchAPI(`/user/profile/${id}`);