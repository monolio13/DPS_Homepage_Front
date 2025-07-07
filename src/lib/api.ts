/** @format */

import axios from "axios";

const api = axios.create({
  baseURL: "https://api.metaselferral.com/api",
  // baseURL: "http://localhost:4000/api",
  withCredentials: true, // ✅ this is key!
});

export default api;
// process.env.NEXT_PUBLIC_API_BASE_URL ||
