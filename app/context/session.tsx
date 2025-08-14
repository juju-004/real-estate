// SessionContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "session";

export interface Session {
  email: string;
  password: string; // demo only; don't store plaintext passwords in prod
}

interface SessionContextValue {
  session: Session | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const SessionContext = createContext<SessionContextValue | undefined>(
  undefined
);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);

  // load on mount
  useEffect(() => {
    try {
      const raw =
        typeof window !== "undefined"
          ? localStorage.getItem(STORAGE_KEY)
          : null;
      if (raw) setSession(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  // persist on change
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    else localStorage.removeItem(STORAGE_KEY);
  }, [session]);

  const login = (email: string, password: string) => {
    setSession({ email, password });
  };

  const logout = () => setSession(null);

  return (
    <SessionContext.Provider value={{ session, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextValue => {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within a SessionProvider");
  return ctx;
};
