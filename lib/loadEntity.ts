// lib/loadEntity.ts
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!; // your Render URL

export async function loadEntity(slug: string) {
  const res = await fetch(`${BASE_URL}/api/entity/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load entity");
  }

  const entity: EntityCore = await res.json();
  return { entity };
}
