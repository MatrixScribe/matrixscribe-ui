"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  // Load token from cookie via API route
  useEffect(() => {
    async function loadToken() {
      const res = await fetch("/api/get-token");
      if (res.ok) {
        const data = await res.json();
        if (data.token) setToken(data.token);
      }
    }
    loadToken();
  }, []);

  async function login(email: string, password: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!res.ok) throw new Error("Invalid credentials");

    const data = await res.json();

    // Store JWT in cookie
    await fetch("/api/set-token", {
      method: "POST",
      body: JSON.stringify({ token: data.token }),
    });

    setToken(data.token);
    setUser(data.user);

    router.push("/dashboard");
  }

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    setToken(null);
    setUser(null);
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
