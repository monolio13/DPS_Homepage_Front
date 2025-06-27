/** @format */

import axios from "axios";

const baseURL = "https://api.metaselferral.com/api/user"; // change if in production

export const userRegister = async (
  email: string,
  password: string,
  name: string,
  phone: string
) => {
  const res = await axios.post(
    `${baseURL}/register`,
    {
      email,
      password,
      name,
      phone,
    },
    { withCredentials: true }
  );
  return res.data;
};

export const userLogin = async (email: string, password: string) => {
  const res = await axios.post(
    `${baseURL}/login`,
    { email, password },
    { withCredentials: true }
  );
  return res.data;
};
