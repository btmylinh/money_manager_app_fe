import React, { createContext, useContext, useEffect, useState } from "react";
import { saveTokens, clearTokens, getAccessToken, getRefreshToken } from "../lib/storage";
import { login as apiLogin } from "../lib/api";

type User = { id: number; email: string; role?: number } | null;

type AuthCtx = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ need2FA: boolean; email: string }>;
  setUser: (u: User) => void;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>(null as any);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const t = await getAccessToken();
      const r = await getRefreshToken();
      if (t && r) setUser({ id: 0, email: "me@local" }); // tuỳ BE: có thể gọi /me để lấy profile
      setLoading(false);
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const { access, refresh, need2FA, user } = await apiLogin(email, password);
    if (!need2FA) {
      await saveTokens(access, refresh);
      setUser(user ?? { id: 0, email });
    }
    return { need2FA, email };
  };

  const logout = async () => {
    await clearTokens();
    setUser(null);
  };

  return (
    <Ctx.Provider value={{ user, loading, login, setUser, logout }}>
      {children}
    </Ctx.Provider>
  );
}
