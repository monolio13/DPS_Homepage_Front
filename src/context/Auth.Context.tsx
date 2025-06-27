/** @format */

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import api from "@/lib/api";

interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
  loading: boolean;
  fetchMe: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
  fetchMe: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        pathname.startsWith("/admin") ? "/admin/me" : "/user/me"
      );
      console.log("✅ fetched user:", res.data);
      setUser(res.data);
    } catch (err) {
      console.error("❌ fetchMe error", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe(); // Always run
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, fetchMe }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
