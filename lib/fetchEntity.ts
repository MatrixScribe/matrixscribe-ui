import { Entity } from "./types";

export async function fetchEntity(id: string): Promise<Entity | null> {
  try {
    const res = await fetch(`/api/entity/${id}`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) return null;

    return (await res.json()) as Entity;
  } catch {
    return null;
  }
}
