// services/auth.service.ts

import { fetchAPI } from "@/lib/api";

export const sendOtp = async (data: { mobile: string }) => {
  return await fetchAPI("/auth/send-otp", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const verifyOtp = async (data: {
  mobile: string;
  otp: string;
  name?: string;
  email?: string;
  whatsapp?: string;
  gender?: string;
}) => {
  return await fetchAPI("/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify(data),
  });
};