import { NextResponse } from "next/server";
import db from "@/lib/db"; // adjust if needed

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // 1. Get entity ID
    const entityRes = await db.query(
      `SELECT id FROM entities WHERE slug = $1`,
      [slug]
    );

    if (entityRes.rows.length === 0) {
      return NextResponse.json({ ok: false, error: "Entity not found" }, { status: 404 });
    }

    const entityId = entityRes.rows[0].id;

    // 2. Fetch articles linked to this entity
    const articlesRes = await db.query(
      `
      SELECT 
        p.id,
        p.external_id,
        p.source,
        p.content,
        p.created_at,
        s.score AS sentiment,
        ARRAY(
          SELECT t.name
          FROM post_topics pt
          JOIN topics t ON t.id = pt.topic_id
          WHERE pt.post_id = p.id
        ) AS topics
      FROM posts p
      JOIN sentiment_scores s ON s.post_id = p.id
      WHERE p.entity_id = $1
      ORDER BY p.created_at DESC
      LIMIT 50
      `,
      [entityId]
    );

    return NextResponse.json({
      ok: true,
      count: articlesRes.rows.length,
      articles: articlesRes.rows
    });

  } catch (err: any) {
    console.error("Entity articles API error:", err);
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
