// lib/loadEntity.ts
import { cookies } from "next/headers";
import { Entity } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

// Safe fetch wrapper for server components
async function safeFetch(path: string, token?: string) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Entity API error:", path, res.status, res.statusText);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("Entity API fetch failed:", err);
    return null;
  }
}

// Main loader
export async function loadEntity(slug: string): Promise<Entity | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const data = await safeFetch(`/entity/${slug}`, token);

  if (!data || !data.entity) return null;

  return data.entity as Entity;
}
