/** @format */

import api from "@/lib/api";

export const adminLogin = async (email: string, password: string) => {
  const res = await api.post("/admin/login", { email, password });
  return res.data;
};

export const adminLogout = async () => {
  const res = await api.post("/admin/logout", {}, { withCredentials: true });
  return res.data;
};

export const adminRegister = async (data: {
  email: string;
  password: string;
  name: string;
  phone: string;
}) => {
  const res = await api.post("/admin/register", data);
  return res.data;
};
