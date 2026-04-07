// lib/loadEntity.ts
import { Entity } from "./types";

const BASE_URL = process.env.postgresql://sentiment_platform_db_u24w_user_main:39B4iggoVgur533SMR34gg3BPsPjsLGH@dpg-d6uh1dvdiees73dhi76g-a.oregon-postgres.render.com/sentiment_platform_db_u24w!; // your Render backend URL

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
