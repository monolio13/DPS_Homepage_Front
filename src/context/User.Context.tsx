/** @format */

"use client";

import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

type User = {
  name: string;
  email: string;
  role: string;
};

const UserContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({ user: null, setUser: () => {} });

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get(
          "https://api.metaselferral.com/api/user/me",
          {
            withCredentials: true,
          }
        );
        setUser(res.data);
      } catch (err) {
        setUser(null); // Not logged in
      }
    };

    fetchMe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
