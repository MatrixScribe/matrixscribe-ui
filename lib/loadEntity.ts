// lib/loadEntity.ts
import { Entity } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!; // your backend URL

export async function loadEntity(slug: string) {
  const res = await fetch(`${BASE_URL}/api/entity/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load entity");
  }

  const entity: Entity = await res.json();
  return { entity };
}
