"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load token from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) {
      setToken(stored);
    }
  }, []);

  async function login(email: string, password: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ⭐ required for cookies
        body: JSON.stringify({ email, password }),
      }
    );

    if (!res.ok) throw new Error("Invalid credentials");

    const data = await res.json();

    // ⭐ Store token locally
    localStorage.setItem("token", data.token);
    setToken(data.token);

    // ⭐ Store user
    setUser(data.user);

    // ⭐ Redirect
    router.push("/dashboard");
  }

  async function logout() {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    localStorage.removeItem("token");
    setToken(null);
    setUser(null);

    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ login, logout, user, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
